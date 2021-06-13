<template>
  <div v-if="postes && postes.length">
    <article v-for="post in postes" :key="post.id" class="w-full mb-10">
      <nuxt-link :to="postLink(post.slug)">
        <h2>
          {{ post.title }}
        </h2>
        <p class="mt-2 text-base text-gray-500 dark:text-gray-400">
          {{ post.description }}
        </p>
        <div class="flex mt-2">
          <PostProperties :post="post" class="w-6/14" />
          <div class="flex-auto"></div>
          <button class="navButton text-right" style="outline: none">
            Read More <Icon icon="ArrowRight" class="icon_sm inline-block" />
          </button>
        </div>
      </nuxt-link>
    </article>
    <div class="flex">
      <div
        class="
          text-gray-600
          dark:text-gray-400
          dark:bg-gray-900
          bg-gray-200
          px-2
          py-0.5
          rounded
          cursor-pointer
        "
        v-if="prev !== 'home'"
        @click="$router.back()"
      >
        <Icon icon="ArrowLeft" class="icon_sm inline-block" /> Prev
      </div>
      <div class="flex-auto"></div>
      <div
        class="
          text-gray-600
          dark:text-gray-400
          dark:bg-gray-900
          bg-gray-200
          px-2
          py-0.5
          rounded
        "
        v-if="next"
      >
        <nuxt-link :to="`/page/${next}`"
          >Next<Icon icon="ArrowRight" class="icon_sm inline-block" />
        </nuxt-link>
      </div>
    </div>
  </div>
  <p v-else>No post found.</p>
</template>

<script>
import Icon from '@/components/Icon.vue'
import PostProperties from './PostProperties.vue'
export default {
  props: {
    postes: Array,
    prev: String,
    next: String,
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
