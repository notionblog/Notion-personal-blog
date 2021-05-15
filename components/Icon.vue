<template>
  <component v-bind:is="icon"></component>
</template>
<script>
import ArrowRight from '@/assets/icons/ArrowRight.vue'
import Refresh from '@/assets/icons/Refresh.vue'
import Write from '@/assets/icons/Write.vue'

export default {
  props: {
    icon: String,
  },
  components: {
    ArrowRight,
    Write,
    Refresh,
  },
}
</script>