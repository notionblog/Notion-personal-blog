<template>
  <div class="dark:bg-gray-800 bg-gray-50 min-h-screen">
    <div class="container mx-auto pt-10 px-5 md:px-24 xl:px-56">
      <NavBar />
      <Nuxt />
      <NewsLetter class="mt-10" />
      <Footer class="mt-10" />
    </div>
  </div>
</template>
<script>
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'
import NewsLetter from '@/components/NewsLetter.vue'
import { mapMutations } from 'vuex'

export default {
  components: {
    NavBar,
    Footer,
    NewsLetter,
  },
  methods: {
    ...mapMutations('blog', ['setDarkMode']),
  },
  mounted() {
    this.setDarkMode()
  },
}
</script>
