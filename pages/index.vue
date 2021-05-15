<template>
  <div>
    <article v-for="post in posts" :key="post.id" class="w-full bg-white mb-10">
      <h1 class="text-3xl font-bold capitalize underline w-full text-gray-800">
        {{ post.title }}
      </h1>
      <p class="mt-2 text-gray-600 text-xl">{{ post.description }}</p>
    </article>
  </div>
</template>

<script>
export default {
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
            created_time: post.created_time,
            last_edit_time: post.last_edit_time,
            title:
              post.properties.Name.title.length > 0 &&
              post.properties.Name.title[0].text
                ? post.properties.Name.title[0].text.content
                : '',
            description:
              post.properties.Description.text.length > 0
                ? post.properties.Description.text[0].plain_text
                : '',
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
