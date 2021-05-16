<template>
  <p>
    <span
      v-for="(item, i) in p"
      :key="i"
      :class="{
        'font-bold': item.annotations.bold,
        italic: item.annotations.italic,
        'line-through': item.annotations.strikethrough,
        underline: item.annotations.underline,
        'text-red-400': item.annotations.code,
        'p-1': item.annotations.code,
        'bg-gray-800': item.annotations.code,
        'font-serif': item.type == 'equation',
      }"
      class="rounded"
    >
      <a
        v-if="item.href"
        :href="item.href"
        target="_blank"
        class="text-blue-600 underline"
        >{{ item.plain_text }}</a
      ><span v-else>{{ item.plain_text }}</span></span
    >
  </p>
</template>
<script>
export default {
  props: {
    p: Array,
  },
}
</script>