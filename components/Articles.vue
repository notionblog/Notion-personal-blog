<template>
  <div v-if="postes && postes.length">
    <article v-for="post in postes" :key="post.id" class="w-full mb-10">
      <nuxt-link :to="postLink(post.slug)">
        <h2>
          {{ post.title }}
        </h2>
        <p>
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
      <div v-if="prev && prev != 'home'" @click="$router.back()">- Prev</div>
      <div class="flex-auto"></div>
      <div v-if="next">
        <nuxt-link :to="`/page/${next}`">- Next</nuxt-link>
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