<template>
  <section>
    <h1
      class="text-4xl font-bold text-center capitalize w-full mb-3 text-gray-800 dark:text-gray-100"
    >
      About
    </h1>
    <div v-if="profile">
      <img
        :src="
          profile.Avatar
            ? profile.Avatar
            : `https://ui-avatars.com/api/?name=${
                profile.FullName ? profile.FullName : 'Anonyme'
              }`
        "
        alt="Avatar"
      />
      <h3>{{ profile.FullName ? profile.FullName : 'Anonyme' }}</h3>

      {{ profile }}
    </div>
  </section>
</template>

<script>
export default {
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
        profile.Twitter =
          Twitter && Twitter.text.length ? Twitter.text[0].href : null
        profile.Facebook =
          Facebook && Facebook.text.length ? Facebook.text[0].href : null
        profile.Email = Email && Email.text.length ? Email.text[0].href : null
        profile.Github =
          Github && Github.text.length ? Github.text[0].href : null
        profile.FullName =
          FullName && FullName.text.length ? FullName.text[0].plain_text : null
        profile.Instagram =
          Instagram && Instagram.text.length ? Instagram.text[0].href : null
        profile.StackOverflow =
          StackOverflow && StackOverflow.text.length
            ? StackOverflow.text[0].href
            : null
        profile.LinkedIn =
          LinkedIn && LinkedIn.text.length ? LinkedIn.text[0].href : null
        profile.Avatar =
          Avatar && Avatar.text.length ? Avatar.text[0].href : null

        profile.Bio = Bio && Bio.text.length ? Bio.text[0].plain_text : null
      }

      return { profile }
    } catch (err) {
      console.log(err)
      return { profile }
    }
  },
}
</script>