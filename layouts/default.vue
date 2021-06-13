<template>
  <div class="dark:bg-gray-800 bg-gray-50 min-h-screen">
    <div class="container mx-auto pt-10 px-5 md:px-24 xl:px-56">
      <NavBar />
      <Nuxt />
      <Footer class="mt-32" />
    </div>
  </div>
</template>
<script>
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'
import { mapMutations } from 'vuex'
export default {
  components: {
    NavBar,
    Footer,
  },
  methods: {
    ...mapMutations('blog', ['setDarkMode']),
  },
  mounted() {
    this.setDarkMode()
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
