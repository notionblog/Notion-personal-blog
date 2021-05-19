<template>
  <nav class="flex pt-10 py-32">
    <nuxt-link to="/"
      ><h1 class="text-5xl text-gray-900 dark:text-white">
        NotionBlog
      </h1></nuxt-link
    >
    <div class="flex-auto"></div>
    <ul class="py-3 text-gray-900 dark:text-white">
      <li class="inline-block mx-3">
        <nuxt-link to="/">Blog</nuxt-link>
      </li>
      <li class="inline-block mx-3">
        <nuxt-link to="/about">About</nuxt-link>
      </li>
      <li class="inline-block mx-3">
        <nuxt-link to="/search">
          <Icon class="w-5 h-6 block pt-1" icon="Search"
        /></nuxt-link>
      </li>
      <li class="inline-block ml-3">
        <button class="rounded-full" @click="switchMode" style="outline: none">
          <Icon
            class="w-5 h-6 block pt-1"
            :icon="darkMode == 'class' ? 'Night' : 'Day'"
          />
        </button>
      </li>
    </ul>
  </nav>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
import Icon from './Icon.vue'
export default {
  components: { Icon },
  methods: {
    switchMode() {
      this.$colorMode.preference = this.darkMode == 'dark' ? 'class' : 'dark'
      this.toggleMode()
    },
    ...mapMutations('blog', ['toggleMode']),
  },
  computed: {
    ...mapState('blog', ['darkMode']),
  },
}
</script>