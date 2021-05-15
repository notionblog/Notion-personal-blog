<template>
  <nav class="flex pt-10 py-32">
    <nuxt-link to="/"
      ><h1 class="text-5xl text-gray-900 dark:text-white">
        NotionBlog
      </h1></nuxt-link
    >
    <div class="flex-auto"></div>
    <ul>
      <button
        class="rounded-full bg-gray-100 p-2"
        @click="switchMode"
        style="outline: none"
      >
        <Icon
          class="w-6 h-6 text-gray-500"
          :icon="darkMode == 'class' ? 'Night' : 'Day'"
        />
      </button>
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