<template>
  <section>
    <h1
      class="text-4xl font-bold capitalize w-full mb-3 text-gray-800 dark:text-gray-100"
    >
      About
    </h1>
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
      <h3 class="text-3xl mt-3 text-gray-900 dark:text-gray-100">
        {{ profile.FullName ? profile.FullName : 'Anonyme' }}
      </h3>
      <p class="text-lg text-gray-800" v-if="profile.Bio">{{ profile.Bio }}</p>

      <ul class="text-sm text-gray-700">
        <li class="inline-block" v-if="profile.Email">
          <a target="_blank" :href="`mailto: ${profile.Email}`">Email</a> |
        </li>
        <li class="inline-block" v-if="profile.Twitter">
          <a target="_blank" :href="profile.Twitter">Twitter</a> |
        </li>
        <li class="inline-block" v-if="profile.Facebook">
          <a target="_blank" :href="profile.Facebook">Facebook</a> |
        </li>
        <li class="inline-block" v-if="profile.Instagram">
          <a target="_blank" :href="profile.Instagram">Instagram</a> |
        </li>
        <li class="inline-block" v-if="profile.Github">
          <a target="_blank" :href="profile.Github">Github</a> |
        </li>
        <li class="inline-block" v-if="profile.StackOverflow">
          <a target="_blank" :href="profile.StackOverflow">StackOverflow</a> |
        </li>
        <li class="inline-block" v-if="profile.LinkedIn">
          <a target="_blank" :href="profile.LinkedIn">LinkedIn</a>
        </li>
      </ul>
    </div>
    <Blocks
      class="mt-10 text-gray-600 dark:text-gray-200 border-2 text-center p-5 border-gray-900"
      v-if="postBlocks && postBlocks.length"
      :blocks="postBlocks"
    />
  </section>
</template>

<script>
import Blocks from '@/components/Blocks.vue'
export default {
  components: { Blocks },
  async asyncData({ $axios, $config }) {
    let profile = {}
    try {
      $axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${$config.apiSecret}`
      const res = await $axios.post(
        `${$config.baseURL}databases/${$config.databaseId}/query`,
        {
          filter: {
            property: 'Name',
            text: {
              equals: 'About',
            },
          },
        }
      )

      if (res.data.results && res.data.results[0]) {
        let {
          Twitter,
          Facebook,
          Email,
          FullName,
          Github,
          Instagram,
          StackOverflow,
          LinkedIn,
          Avatar,
          Bio,
        } = res.data.results[0].properties
        profile.FullName =
          FullName && FullName.text.length ? FullName.text[0].plain_text : null
        profile.Avatar =
          Avatar && Avatar.text.length ? Avatar.text[0].href : null
        profile.Bio = Bio && Bio.text.length ? Bio.text[0].plain_text : null
        profile.Email =
          Email && Email.text.length ? Email.text[0].plain_text : null
        profile.Twitter =
          Twitter && Twitter.text.length ? Twitter.text[0].plain_text : null
        profile.Facebook =
          Facebook && Facebook.text.length ? Facebook.text[0].plain_text : null
        profile.Github =
          Github && Github.text.length ? Github.text[0].plain_text : null
        profile.Instagram =
          Instagram && Instagram.text.length
            ? Instagram.text[0].plain_text
            : null
        profile.StackOverflow =
          StackOverflow && StackOverflow.text.length
            ? StackOverflow.text[0].plain_text
            : null
        profile.LinkedIn =
          LinkedIn && LinkedIn.text.length ? LinkedIn.text[0].plain_text : null
      }
      let postBlocks = (
        await $axios.get(
          `${$config.baseURL}blocks/${res.data.results[0].id}/children`
        )
      ).data.results
      return { profile, postBlocks }
    } catch (err) {
      console.log(err)
      return { profile }
    }
  },
}
</script>

<style scoped>
li:hover {
  color: blue;
  text-decoration: underline;
}
</style>