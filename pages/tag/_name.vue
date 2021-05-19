<template>
  <div>
    <div class="grid grid-cols-1 md:grid-cols-2">
      <h1
        class="text-4xl font-bold capitalize w-full mb-5 text-gray-800 dark:text-gray-100"
      >
        #{{ $route.params.name }}
      </h1>
      <div>
        <input
          type="text"
          class="px-3 float-right py-1 w-10/12 block border border-gray-300"
          :placeholder="`Search in #${$route.params.name}`"
          v-model="search"
        />
      </div>
    </div>
    <Articles class="mt-10" :postes="postsFilter(posts)" />
  </div>
</template>

<script>
import Articles from '@/components/Articles.vue'
export default {
  components: { Articles },
  data() {
    return {
      search: '',
    }
  },
  async asyncData({ $axios, $config, params }) {
    console.log('here')

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
              contains: params.name,
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
      }

      return { posts }
    } catch (err) {
      console.log(err)
      return { posts }
    }
  },
  methods: {
    postsFilter(posts) {
      if (this.search)
        return posts.filter((el) => {
          let title = el.title.toLowerCase()
          return title.includes(this.search.toLowerCase())
        })
      return posts
    },
  },
}
</script>