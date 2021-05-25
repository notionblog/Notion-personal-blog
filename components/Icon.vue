<template>
  <component v-bind:is="icon"></component>
</template>
<script>
import ArrowRight from '@/assets/icons/ArrowRight.vue'
import ArrowLeft from '@/assets/icons/ArrowLeft.vue'
import Refresh from '@/assets/icons/Refresh.vue'
import Write from '@/assets/icons/Write.vue'
import Day from '@/assets/icons/Day.vue'
import Night from '@/assets/icons/Night.vue'
import Tag from '@/assets/icons/Tag.vue'
import User from '@/assets/icons/User.vue'
import Search from '@/assets/icons/Search.vue'
import Menu from '@/assets/icons/Menu.vue'
export default {
  props: {
    icon: String,
  },
  components: {
    ArrowRight,
    Write,
    Refresh,
    Night,
    Day,
    Tag,
    User,
    Search,
    Menu,
    ArrowLeft,
  },
}
</script>
