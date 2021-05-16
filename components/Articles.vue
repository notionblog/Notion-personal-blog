<template>
  <div>
    <article v-for="post in postes" :key="post.id" class="w-full mb-10">
      <nuxt-link :to="postLink(post.slug)">
        <h1
          class="text-3xl font-bold capitalize w-full text-gray-800 dark:text-gray-100"
        >
          {{ post.title }}
        </h1>
        <p class="mt-5 text-gray-600 dark:text-gray-400 text-xl">
          {{ post.description }}
        </p>
        <div class="flex mt-5">
          <PostProperties :post="post" class="w-6/14" />
          <div class="flex-auto"></div>
          <button
            class="px-3 text-gray-600 dark:text-gray-400 w-6/12 text-right border-none"
            style="outline: none"
          >
            Read More <Icon icon="ArrowRight" class="w-6 h-6 inline-block" />
          </button>
        </div>
      </nuxt-link>
    </article>
  </div>
</template>
<script>
import Icon from '@/components/Icon.vue'
import PostProperties from './PostProperties.vue'
export default {
  props: {
    postes: Array,
  },
  components: {
    Icon,
    PostProperties,
  },
  methods: {
    postLink(slug) {
      return '/post/' + slug
    },
  },
}
</script>