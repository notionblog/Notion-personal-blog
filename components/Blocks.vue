<template>
  <div>
    <div v-for="block in blocks" :key="block.id">
      <Paragraph
        v-if="block.type == 'paragraph' && block.paragraph.text"
        :p="block.paragraph.text"
      />
      <div class="mb-1"></div>
    </div>
  </div>
</template>
<script>
import Paragraph from '@/components/blocks/Paragraph.vue'

export default {
  props: {
    blocks: Array,
  },
  components: {
    Paragraph,
  },
}
</script>