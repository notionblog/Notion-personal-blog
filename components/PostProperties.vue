<template>
  <ul class="text-base text-gray-500 dark:text-gray-400 w-full">
    <li class="inline-block mb-1 mr-2 text-base">
      <Icon icon="Write" class="icon_sm mb-0.5 inline-block mr-1" />Posted:
      {{ formateDate(post.created_time) }}
    </li>
    <li
      class="inline-block mb-1 text-base"
      v-if="post.author && post.author.length"
    >
      <Icon icon="User" class="icon_sm mb-1 inline-block mr-0.5" />
      {{ post.author.length > 1 ? 'Authors: ' : 'Author: ' }}
      <ul class="inline-block text-base">
        <li
          v-for="author in post.author"
          :key="author.id"
          class="inline-block md:mr-3 lg:mr-3 cursor-pointer text-base"
        >
          <img
            :src="author.avatar_url"
            :key="author.name"
            class="
              inline-block
              mb-1
              mr-0.5
              md:mr-0.5
              lg:mr-0.5
              w-5
              h-5
              rounded-full
            "
          />
          <div class="hidden lg:inline-block xl:inline-block">
            {{ author.name }}
          </div>
        </li>
      </ul>
    </li>
    <li class="inline-block text-base" v-if="post.tags && post.tags.length">
      <Icon icon="Tag" class="icon_sm mb-1 inline-block mr-0.5" />
      <div class="mr-1 inline-block">
        {{ post.tags.length > 1 ? 'Tags: ' : 'Tag: ' }}
      </div>
      <ul class="inline-block">
        <li
          v-for="tag in post.tags"
          :key="tag.id"
          class="
            text-base
            px-2
            py-0.5
            rounded
            bg-gray-100
            text-gray-500
            dark:bg-gray-700
            dark:text-gray-400
            inline-block
            mr-1
          "
        >
          <nuxt-link :to="`/tag/${tag.name}`">#{{ tag.name }}</nuxt-link>
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
      })} ${date_format.getDate()}, ${date_format.getFullYear()}`
    },
  },
}
</script>
