<template>
  <main>
    <h1>About</h1>
    <div v-if="profile" class="w-6/12 mx-auto text-center">
      <img
        class="w-24 h-24 rounded-full block mx-auto"
        :src="
          profile.Avatar
            ? profile.Avatar
            : `https://ui-avatars.com/api/?name=${
                profile.FullName ? profile.FullName : 'Anonyme'
              }`
        "
        alt="Avatar"
      />
      <h3 class="mt-3">
        {{ profile.FullName ? profile.FullName : 'Anonyme' }}
      </h3>
      <p v-if="profile.Bio">
        {{ profile.Bio }}
      </p>
      <address v-if="profile.social">
        <ul class="text-xs text-gray-700 dark:text-gray-400">
          <li
            v-for="(key, i) in Object.keys(profile.social)"
            :key="i"
            class="inline-block"
          >
            <a
              target="_blank"
              :href="`${key == 'Email' ? 'mailto:' : ''}${profile.social[key]}`"
              >{{ key }}</a
            >
            |
          </li>
        </ul>
      </address>
    </div>
    <Blocks
      class="
        mt-10
        text-gray-600
        dark:text-gray-200 dark:text-gray-200
        border-2
        text-center
        p-5
        border-gray-400
        dark:border-gray-500
      "
      v-if="postBlocks && postBlocks.length"
      :blocks="postBlocks"
    />
  </main>
</template>

<script>
import Blocks from '@/components/Blocks.vue'
export default {
  components: { Blocks },
  async asyncData({ store }) {
    const { profile, postBlocks } = await store.dispatch('blog/getProfile')
    console.log(profile, postBlocks)
    return { profile, postBlocks }
  },
}
</script>

<style scoped>
li:hover {
  color: blue;
  text-decoration: underline;
}
</style>
