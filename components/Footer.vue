<template>
  <footer
    class="
      flex
      border-t border-gray-200
      dark:border-gray-400
      py-5
      text-sm text-gray-500
      dark:text-gray-400
    "
  >
    <div class="inline-block">
      &copy; {{ blogName }} {{ new Date().getFullYear() }}
    </div>
    <div class="flex-auto"></div>
    <div class="inline-block">
      Made with ❤️ by <a href="https://github.com/yudax42">yudax42</a>
    </div>
  </footer>
</template>

<script>
import SiteConfig from '@/blog.config.js'
export default {
  data() {
    return {
      blogName: SiteConfig.blog_name,
    }
  },
}
</script>
