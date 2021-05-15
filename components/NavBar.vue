<template>
  <nav class="flex pt-10 py-32">
    <h1 class="text-5xl text-gray-900 dark:text-white">
      Notion
      <span class="text-xl px-3 py-1 bg-gray-100 dark:bg-gray-700">blog</span>
    </h1>
    <div class="flex-auto"></div>
    <ul>
      <button class="rounded-full bg-gray-100 p-2" @click="switchMode">
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
      this.toggleMode()
    },
    ...mapMutations('blog', ['toggleMode']),
  },
  computed: {
    ...mapState('blog', ['darkMode']),
  },
}
</script>