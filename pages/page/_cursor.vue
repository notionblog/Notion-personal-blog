<template>
  <div>
    <Articles :postes="posts" :next="next" prev="home" />
  </div>
</template>

<script>
import Articles from '@/components/Articles.vue'
export default {
  async asyncData({ store, params }) {
    const { posts, next } = await store.dispatch('blog/getPosts', {
      name: 'pagination',
      start_cursor: params.cursor,
    })
    return { posts, next }
  },
  components: { Articles },
}
</script>