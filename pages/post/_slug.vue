<template>
  <section>
    <h1
      class="text-4xl font-bold capitalize underline w-full mb-3 text-gray-800 dark:text-gray-100"
    >
      {{ postHeaders.title }}
    </h1>
    <PostProperties :post="postHeaders" />
    <Blocks
      class="mt-10 text-gray-600 dark:text-gray-200"
      v-if="postBlocks.length"
      :blocks="postBlocks"
    />
  </section>
</template>
<script>
import Blocks from '../../components/Blocks.vue'
import PostProperties from '../../components/PostProperties.vue'
export default {
  components: { PostProperties, Blocks },
  async asyncData({ params, $axios, $config }) {
    let postHeaders = {}
    let postBlocks = []
    try {
      $axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${$config.apiSecret}`
      const pageQuery = await $axios.post(
        `${$config.baseURL}databases/${$config.databaseId}/query`,
        {
          filter: {
            property: 'slug',
            text: {
              equals: params.slug,
            },
          },
        }
      )
      const page_id = pageQuery.data.results[0].id
      const post = (await $axios.get(`${$config.baseURL}pages/${page_id}`)).data
      const postHeaders = {
        last_edited_time: post.last_edited_time,
        title:
          post.properties.Name.title.length > 0 &&
          post.properties.Name.title[0].text
            ? post.properties.Name.title[0].text.content
            : '',
        author: post.properties.Author.people,
        slug: post.properties.slug.formula.string,
      }

      postBlocks = (
        await $axios.get(`${$config.baseURL}blocks/${page_id}/children`)
      ).data.results

      return { postHeaders, postBlocks }
    } catch (err) {
      return { postHeaders, postBlocks }
      console.log(err.response.data)
    }
  },
}
</script>