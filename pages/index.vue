<template>
  <div>
    <Articles :postes="posts" />
  </div>
</template>

<script>
import Articles from '../components/Articles.vue'
export default {
  components: { Articles },
  async asyncData({ $axios, $config }) {
    let posts = []

    try {
      $axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${$config.apiSecret}`
      const res = await $axios.post(
        `${$config.baseURL}databases/${$config.databaseId}/query`
      )

      if (res.data.results) {
        res.data.results.forEach((post) => {
          const postData = {
            id: post.id,
            last_edited_time: post.last_edited_time,
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
          }
          posts.push(postData)
        })
      }
      return { posts }
    } catch (err) {
      return { posts }
    }
  },
}
</script>
