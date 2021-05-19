<template>
  <div>
    <h1
      class="text-4xl font-bold capitalize w-full mb-3 text-gray-800 dark:text-gray-100"
    >
      Search
    </h1>
    <ul v-if="tags && tags.length">
      <li
        v-for="tag in tags"
        class="px-4 py-1 rounded bg-gray-100 text-center inline-block text-gray-500 dark:bg-gray-700 dark:text-gray-400 mr-1"
        :key="tag.id"
      >
        <nuxt-link :to="`/tag/${tag.name}`">#{{ tag.name }}</nuxt-link>
      </li>
    </ul>
    <p v-else>No tag found.</p>
    <Articles class="mt-10" :postes="posts" />
  </div>
</template>
<script>
import Articles from '../components/Articles.vue'
export default {
  components: { Articles },
  async asyncData({ $axios, $config }) {
    console.log('here')
    let tags = []
    let posts = []
    try {
      $axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${$config.apiSecret}`
      const res = await $axios.post(
        `${$config.baseURL}databases/${$config.databaseId}/query`,
        {
          filter: {
            property: 'Tags',
            multi_select: {
              is_not_empty: true,
            },
          },
        }
      )
      if (res.data.results) {
        let allTags = []
        res.data.results.forEach((post) => {
          const postData = {
            id: post.id,
            last_edited_time: post.last_edited_time,
            created_time: post.created_time,
            title:
              post.properties.Name.title.length > 0 &&
              post.properties.Name.title[0].text
                ? post.properties.Name.title[0].text.content
                : '',
            description:
              post.properties.Description.text.length > 0
                ? post.properties.Description.text[0].plain_text
                : '',
            author: post.properties.Author.people,
            slug: post.properties.slug.formula.string,
            tags: post.properties.Tags.multi_select,
          }
          posts.push(postData)
        })
        res.data.results.forEach((item) => {
          item.properties.Tags.multi_select.forEach((tag) => {
            allTags.push({ id: tag.id, name: tag.name })
          })
        })
        console.log(allTags)
        tags = allTags.filter((tag, index) => {
          return allTags.map((el) => el.id).indexOf(tag.id) === index
        })
      }
      console.log('>>>tags: ', tags)
      return { tags, posts }
    } catch (err) {
      console.log(err)
      return { tags, posts }
    }
  },
}
</script>