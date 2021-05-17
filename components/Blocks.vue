<template>
  <div>
    <div v-for="(block, i) in blocks" :key="block.id">
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

      <li
        class="list-dic"
        v-if="
          block.type == 'bulleted_list_item' && block.bulleted_list_item.text
        "
      >
        <Txt :p="block.bulleted_list_item.text" />
      </li>

      <li
        class="list-none"
        v-if="
          block.type == 'numbered_list_item' && block.numbered_list_item.text
        "
      >
        <span v-if="blocks[--i].type != 'numbered_list_item'"
          >{{ (listCount = 1) }}.
        </span>
        <span v-else> {{ ++listCount }}. </span>

        <Txt :p="block.numbered_list_item.text" />
      </li>
      <div v-if="block.type == 'to_do' && block.to_do.text">
        <input
          type="checkbox"
          :id="block.id"
          :value="block.to_do.plain_text"
          :checked="block.to_do.checked"
          disabled="disabled"
        />
        <label><Txt :p="block.to_do.text" /></label>
      </div>

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