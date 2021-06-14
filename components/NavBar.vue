<template>
  <header
    class="
      flex flex-wrap flex-row
      justify-between
      items-center
      md:space-x-4
      py-6
      mb-32
    "
  >
    <nuxt-link to="/">
      <div v-if="logoDark || logoLight">
        <img
          class="w-40 h-12 object-contain"
          :src="
            darkMode == 'class'
              ? require(`~/assets/${logoLight}`)
              : require(`~/assets/${logoDark}`)
          "
          alt=""
        />
      </div>
      <h1 v-else>{{ blogName || 'Blog' }}</h1></nuxt-link
    >
    <button
      class="
        inline-block
        outline-none
        md:hidden
        border border-gray-300
        w-8
        h-8
        p-1
      "
      @click="menu = !menu"
    >
      <Icon icon="Menu" class="icon_normal" />
    </button>
    <!-- Web Menu -->
    <nav
      class="
        md:flex
        flex-col
        hidden
        md:flex-row
        md:space-x-6
        w-full
        md:w-auto
        py-6
        md:p-0
      "
    >
      <nuxt-link to="/">Blog</nuxt-link>
      <nuxt-link to="/about">About</nuxt-link>
      <nuxt-link to="/search" class="mt-0.5 icon_normal">
        <Icon icon="Search"
      /></nuxt-link>
      <button @click="switchMode" style="outline: none">
        <Icon
          class="icon_normal"
          :icon="darkMode == 'class' ? 'Night' : 'Day'"
        />
      </button>
    </nav>
    <!-- mobile Menu -->
    <nav
      class="
        flex flex-col
        block
        md:hidden
        border
        px-5
        space-y-3
        border-gray-200
        mt-4
        md:flex-row
        md:space-x-6
        w-full
        md:w-auto
        py-6
        md:p-0
      "
      v-show="menu"
    >
      <nuxt-link to="/">Blog</nuxt-link>
      <nuxt-link to="/about">About</nuxt-link>
      <nuxt-link to="/search" class="w-5 mt-0.5 h-5"> Search</nuxt-link>
      <button @click="switchMode" style="outline: none">
        <Icon
          class="icon_normal"
          :icon="darkMode == 'class' ? 'Night' : 'Day'"
        />
      </button>
    </nav>
  </header>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
import Icon from './Icon.vue'
import SiteConfig from '@/blog.config.js'

export default {
  components: { Icon },
  data() {
    return {
      logoDark: SiteConfig.logo_dark_name,
      logoLight: SiteConfig.logo_light_name,
      blogName: SiteConfig.blog_name,
      menu: 0,
    }
  },
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

<style lang="postcss">
@import url('@/assets/main.css');
</style>
