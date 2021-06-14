<template>
  <section
    v-if="pageclipLink"
    class="w-full text-center bg-gray-200 dark:bg-gray-900 rounded p-10"
  >
    <h3 class="mb-1">✉️ Subscribe to the newsletter</h3>
    <p class="mb-5">Subscribe for updates, tutorials, and customer stories.</p>
    <form
      v-if="!isSubscribed"
      :action="pageclipLink"
      class="pageclip-form"
      method="post"
    >
      <input
        class="block w-full md:w-7/12 px-5 py-4 rounded mx-auto"
        type="email"
        name="email"
        placeholder="Email"
      />

      <button
        class="
          block
          w-full
          bg-gray-600
          mt-2
          text-white
          md:w-7/12
          font-bold
          px-5
          py-4
          rounded
          mx-auto
        "
        @click="isSubscribed = true"
        type="submit"
      >
        Subscribe
      </button>
    </form>
    <h3 v-else class="text-green-600 font-bold">🙌 Thank You!</h3>
  </section>
</template>

<script>
import blogConfig from '@/blog.config.js'
export default {
  data() {
    return {
      isSubscribed: false,
      pageclipLink: blogConfig.pageclip_link,
    }
  },
}
</script>

<style></style>
