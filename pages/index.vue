<template>
  <main>
    <Articles :postes="posts" :next="next" prev="home" />
  </main>
</template>

<script>
import Articles from '@/components/Articles.vue'
export default {
  async asyncData({ store }) {
    const { posts, next } = await store.dispatch('blog/getPosts')
    return { posts, next }
  },
  components: { Articles },
}
</script>
