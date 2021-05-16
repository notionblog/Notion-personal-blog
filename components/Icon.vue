<template>
  <component v-bind:is="icon"></component>
</template>
<script>
import ArrowRight from '@/assets/icons/ArrowRight.vue'
import Refresh from '@/assets/icons/Refresh.vue'
import Write from '@/assets/icons/Write.vue'
import Day from '@/assets/icons/Day.vue'
import Night from '@/assets/icons/Night.vue'
import Tag from '@/assets/icons/Tag.vue'
import User from '@/assets/icons/User.vue'
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
  },
}
</script>