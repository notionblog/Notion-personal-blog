<template>
  <div>
    <div v-for="block in blocks" :key="block.id">
      <p
        class="text-xl"
        v-if="block.type == 'paragraph' && block.paragraph.text"
      >
        <Txt class="leading-relaxed" :p="block.paragraph.text" />
      </p>

      <h1
        class="text-4xl font-bold"
        v-if="block.type == 'heading_1' && block.heading_1.text"
      >
        <Txt class="leading-relaxed" :p="block.heading_1.text" />
      </h1>
      <h2
        class="text-3xl font-bold"
        v-if="block.type == 'heading_2' && block.heading_2.text"
      >
        <Txt class="leading-relaxed" :p="block.heading_2.text" />
      </h2>
      <h3
        class="text-2xl font-bold"
        v-if="block.type == 'heading_3' && block.heading_3.text"
      >
        <Txt class="leading-relaxed" :p="block.heading_3.text" />
      </h3>

      <div class="mb-3"></div>
    </div>
  </div>
</template>
<script>
import Txt from '@/components/blocks/Text.vue'

export default {
  props: {
    blocks: Array,
  },
  components: {
    Txt,
  },
}
</script>