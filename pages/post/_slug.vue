<template>
  <section>
    {{ postHeaders }}
  </section>
</template>
<script>
export default {
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
      return { postHeaders }
    } catch (err) {
      return { postHeaders }
      console.log(err.response.data)
    }
  },
}
</script>