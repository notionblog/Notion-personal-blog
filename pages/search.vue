<template>
  <div>
    <div class="grid grid-cols-1 md:grid-cols-2">
      <h1
        class="
          text-4xl
          font-bold
          capitalize
          w-full
          mb-5
          text-gray-800
          dark:text-gray-100
        "
      >
        Search
      </h1>
      <div>
        <input
          type="text"
          class="px-3 float-right py-1 w-10/12 block border border-gray-300"
          placeholder="Search in #all"
          v-model="search"
        />
      </div>
    </div>

    <ul v-if="tags && tags.length">
      <li
        v-for="tag in tags"
        class="
          px-4
          py-1
          rounded
          bg-gray-100
          text-center
          inline-block
          text-gray-500
          dark:bg-gray-700
          dark:text-gray-400
          mr-1
        "
        :key="tag.id"
      >
        <nuxt-link :to="`/tag/${tag.name}`">#{{ tag.name }}</nuxt-link>
      </li>
    </ul>
    <p v-else>No tag found.</p>
    <Articles class="mt-10" prev="home" :postes="postsFilter(posts)" />
  </div>
</template>
<script>
import Articles from '../components/Articles.vue'
export default {
  components: { Articles },
  data() {
    return {
      search: '',
    }
  },
  async asyncData({ store }) {
    let tags = []
    const { posts } = await store.dispatch('blog/getPosts', {
      name: 'tags',
    })

    if (posts && posts.length) {
      let allTags = []
      posts.forEach((item) => {
        item.tags.forEach((tag) => {
          allTags.push({ id: tag.id, name: tag.name })
        })
      })
      tags = allTags.filter((tag, index) => {
        return allTags.map((el) => el.id).indexOf(tag.id) === index
      })
    }
    return { tags, posts }
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
