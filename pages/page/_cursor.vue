<template>
  <div>
    <Articles :postes="posts" :next="next" />
  </div>
</template>

<script>
import Articles from '@/components/Articles.vue'
export default {
  components: { Articles },
  async asyncData({ $axios, $config, params }) {
    let posts = []
    let next = null

    try {
      $axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${$config.apiSecret}`
      const res = await $axios.post(
        `${$config.baseURL}databases/${$config.databaseId}/query`,
        {
          page_size: 5,
          start_cursor: params.cursor,
          filter: {
            property: 'Status',
            select: {
              equals: 'publish',
            },
          },
        }
      )
      if (res.data) {
        next = res.data.next_cursor
        if (res.data.results) {
          console.log(res.data.results)
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
        }
      }

      return { posts, next }
    } catch (err) {
      console.log(err)
      return { posts, next }
    }
  },
}
</script>
