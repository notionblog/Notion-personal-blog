<template>
  <div>
    <Articles :postes="posts" :next="next" prev="home" />
  </div>
</template>

<script>
import Articles from '@/components/Articles.vue'
export default {
  async asyncData({ store }) {
    return await store.dispatch('blog/getPosts')
  },
  components: { Articles },
}
</script>
