<template>
  <main>
    <div class="grid grid-cols-1 md:grid-cols-2">
      <div>
        <button class="inline-block" @click="$router.back()">
          <Icon icon="ArrowLeft" class="icon_normal" />
        </button>
        <h1 class="inline-block">#{{ $route.params.name }}</h1>
      </div>

      <div>
        <input
          type="text"
          class="
            px-3
            float-right
            py-2
            rounded-lg
            w-full
            md:w-10/12
            block
            border border-gray-300
            dark:bg-gray-800
            dark:text-gray-300
            dark:border-gray-200
          "
          :placeholder="`Search in #${$route.params.name}`"
          v-model="search"
        />
      </div>
    </div>
    <Articles class="mt-10" :postes="postsFilter(posts)" />
  </main>
</template>

<script>
import Articles from '@/components/Articles.vue'
import Icon from '../../components/Icon.vue'
export default {
  components: { Articles, Icon },
  data() {
    return {
      search: '',
    }
  },
  async asyncData({ store, params }) {
    const { posts } = await store.dispatch('blog/getPosts', {
      name: 'tag',
      tag: params.name,
    })
    return { posts }
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
