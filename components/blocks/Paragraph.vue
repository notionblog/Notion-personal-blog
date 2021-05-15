<template>
  <p>
    <!-- {{ p }} -->
    <span
      v-for="(item, i) in p"
      :key="i"
      :class="{
        'font-bold': item.annotations.bold,
        italic: item.annotations.italic,
        'line-through': item.annotations.strikethrough,
        underline: item.annotations.underline,
      }"
    >
      {{ item.plain_text }}</span
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