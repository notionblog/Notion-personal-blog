<template>
  <div>
    <article
      v-for="post in postes"
      :key="post.id"
      class="w-full bg-white mb-10"
    >
      <h1 class="text-3xl font-bold capitalize underline w-full text-gray-800">
        {{ post.title }}
      </h1>
      <p class="mt-2 text-gray-600 text-xl">{{ post.description }}</p>
      <button
        class="border border-gray-600 py-1 px-3 text-gray-600 text-center my-4"
      >
        Read More <Icon icon="ArrowRight" class="w-6 h-6 inline-block" />
      </button>
      <ul class="text-sm text-gray-500">
        <li class="inline-block">
          <Icon icon="Write" class="w-5 mb-1 h-5 inline-block mr-2" />Created
          at: {{ post.created_time }}
        </li>
        <li class="inline-block mr-3">
          <Icon icon="Refresh" class="w-5 mb-1 h-5 inline-block mr-2" />Updated
          at: {{ post.created_time }}
        </li>
      </ul>
    </article>
  </div>
</template>
<script>
import Icon from '@/components/Icon.vue'
export default {
  props: {
    postes: Array,
  },
  components: {
    Icon,
  },
}
</script>