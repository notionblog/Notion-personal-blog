<template>
  <div>
    <article v-for="post in postes" :key="post.id" class="w-full mb-10">
      <h1
        class="text-3xl font-bold capitalize underline w-full text-gray-800 dark:text-gray-100"
      >
        {{ post.title }}
      </h1>
      <p class="mt-5 text-gray-600 dark:text-gray-400 text-xl">
        {{ post.description }}
      </p>
      <div class="flex">
        <ul class="text-sm text-gray-500 mt-5 dark:text-gray-400 w-9/12">
          <li class="inline-block mb-3 mr-5">
            <Icon icon="Write" class="w-5 mb-1 h-5 inline-block mr-2" />Created
            at: {{ post.created_time }}
          </li>
          <li class="inline-block">
            <Icon
              icon="Refresh"
              class="w-5 mb-1 h-5 inline-block mr-2"
            />Updated at: {{ post.created_time }}
          </li>
        </ul>
        <div class="flex-auto"></div>
        <button
          class="py-1 px-3 text-gray-600 dark:text-gray-400 my-4 w-4/12 text-right border-none"
          style="outline: none"
        >
          Read More <Icon icon="ArrowRight" class="w-6 h-6 inline-block" />
        </button>
      </div>
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