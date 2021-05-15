<template>
  <div :class="darkMode">
    <div class="dark:bg-gray-800 bg-gray-50 min-h-screen">
      <div class="container mx-auto px-5 md:px-24 xl:px-64">
        <NavBar />
        <Nuxt />
        <Footer class="mt-32" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'
export default {
  components: {
    NavBar,
    Footer,
  },
  computed: {
    ...mapState('blog', ['darkMode']),
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
