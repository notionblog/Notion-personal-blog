<template>
  <ul class="text-sm text-gray-500 dark:text-gray-400 w-full">
    <li class="inline-block mr-2">
      <Icon icon="Write" class="w-5 mb-1 h-5 inline-block mr-2" />Created at:
      {{ formateDate(post.last_edited_time) }}
    </li>
    <li class="inline-block mt-2" v-if="post.author.length">
      <Icon icon="Write" class="w-5 mb-1 h-5 inline-block mr-1" />
      <span class="mr-1 inline-block">{{
        post.author.length > 1 ? 'Authors: ' : 'Author: '
      }}</span>
      <ul class="inline-block">
        <li
          v-for="author in post.author"
          :key="author.id"
          class="inline-block md:mr-3 lg:mr-3 cursor-pointer"
        >
          <img
            :src="author.avatar_url"
            :key="author.name"
            class="inline-block mr-0.5 md:mr-1 lg:mr-1 w-6 h-6 rounded-full"
          />
          <span class="hidden lg:inline-block xl:inline-block">{{
            author.name
          }}</span>
        </li>
      </ul>
    </li>
  </ul>
</template>
<script>
export default {
  props: {
    post: Object,
  },
  methods: {
    formateDate(date) {
      let date_format = new Date(date)
      return `${date_format.toLocaleString('default', {
        month: 'short',
      })} ${date_format.getDay()}, ${date_format.getFullYear()}`
    },
  },
}
</script>