<template>
  <div :class="darkMode">
    <div class="dark:bg-gray-800 bg-gray-50 min-h-screen pb-32">
      <div class="container mx-auto px-5 md:px-24 xl:px-64">
        <nav class="flex py-32">
          <h1 class="text-5xl text-gray-900 dark:text-white">
            Notion
            <span class="text-xl px-3 py-1 bg-gray-100 dark:bg-gray-700"
              >blog</span
            >
          </h1>
          <div class="flex-auto"></div>
          <ul>
            <button @click="switchMode">switch</button>
          </ul>
        </nav>

        <Nuxt />
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState('blog', ['darkMode']),
  },

  methods: {
    switchMode() {
      this.toggleMode()
    },
    ...mapMutations('blog', ['toggleMode']),
  },
}
</script>
<style>
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: 'Playfair Display', Georgia, Times, serif;
}
p {
  font-family: 'Fira Sans', Helvetica, Arial, sans-serif;
}
</style>
