<template>
  <main>
    <h1
      class="text-4xl font-bold capitalize w-full mb-3 text-gray-800 dark:text-gray-100"
    >
      {{ postHeaders.title }}
    </h1>
    <PostProperties :post="postHeaders" />
    <Blocks
      class="mt-10 text-gray-600 dark:text-gray-200"
      v-if="postBlocks && postBlocks.length"
      :blocks="postBlocks"
    />
  </main>
</template>
<script>
import Blocks from '@/components/Blocks.vue'
import PostProperties from '@/components/PostProperties.vue'
export default {
  components: { PostProperties, Blocks },
  async asyncData({ store, params }) {
    let { postHeaders, postBlocks } = await store.dispatch(
      'blog/getPost',
      params.slug
    )
    return { postHeaders, postBlocks }
  },
}
</script>