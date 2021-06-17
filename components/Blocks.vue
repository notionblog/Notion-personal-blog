<template>
  <div>
    <div
      class="block overflow-hidden"
      v-for="(block, i) in blocks"
      :key="block.id"
    >

      <p v-if="block.type == 'paragraph' && block.paragraph.text">
        <Txt
          class="leading-relaxed"
          @imgLink="(imgLink) => handleImg(imgLink, i)"
          :p="block.paragraph.text"
        />
      </p>
      <!-- Temporary Solution for using images until it's supported by the official API
          * Check if the past element content is #img# and output the image link
        -->

      <nuxt-img
        provider="static"
        class="mx-auto block max-w-full my-10 block rounded shadow-sm"
        v-if="
          i > 0 &&
          blocks[--i].type == 'unsupported' &&
          imgs.length &&
          isAvailable(i)
        "
        height="169"
        :src="findImg(i)"
      />

      <h1 v-if="block.type == 'heading_1' && block.heading_1.text">
        <Txt class="leading-relaxed" :p="block.heading_1.text" />
      </h1>
      <h2 v-if="block.type == 'heading_2' && block.heading_2.text">
        <Txt class="leading-relaxed" :p="block.heading_2.text" />
      </h2>
      <h3 v-if="block.type == 'heading_3' && block.heading_3.text">
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
  data() {
    return {
      imgs: [],
    }
  },
  methods: {
    handleImg(img, i) {
      this.imgs.push({ id: i, src: img })
    },
    isAvailable(i) {
      console.log(this.imgs, i)
      let isfound = false
      this.imgs.map((img) => {
        if (img.id == i) isfound = true
      })
      return isfound 
      // return false

    },
    findImg(i) {
      return this.imgs.find((img) => img.id == i).src
      // console.log(this.imgs, i)
      // // const img = this.imgs.find((img) => {
      // //   console.log(img)
      // //   img.id == i
      // // })
      // // console.log(img)
      // return this.imgs[0].src
    },
  },
}
</script>
