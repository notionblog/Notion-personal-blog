export const state = () => ({
    darkMode:null
  });
  
export const getters = {

};

export const mutations = {
    setDarkMode:(state) => {
      let darkMode = localStorage.getItem('nuxt-color-mode')
      if (!darkMode) {
        localStorage.setItem('nuxt-color-mode', 'class')
        darkMode = 'class'
      }
      let htmlClasses = document.querySelector('html').classList
      htmlClasses.add(darkMode)
      state.darkMode = darkMode
    },
    toggleMode: (state,) => {
        let darkMode = localStorage.getItem('nuxt-color-mode')
        let htmlClasses = document.querySelector('html').classList;
        htmlClasses.remove('dark')
        htmlClasses.remove('class')
        darkMode == 'class' ? localStorage.setItem('nuxt-color-mode','dark') : localStorage.setItem('nuxt-color-mode','class')
        darkMode == 'class' ? htmlClasses.add('dark') : htmlClasses.remove('dark')
        state.darkMode = darkMode == 'class' ? 'dark' : 'class'
    }
};
  
export const actions = {
  async getPosts({},type){
    let headers= {}
    if(type && type.name){
      switch(type.name)
      {
        case "pagination":
          headers = {
            start_cursor: type.start_cursor,
            page_size: 7,
            filter: {
              property: 'Status',
              select: {
                equals: 'publish',
              },
            },
          }
          break;
        case "tag":
          headers = {
            filter: {
              property: 'Tags',
              multi_select: {
                contains: type.tag,
              },
            },
          }
        case "tags":
          headers = {
            filter: {
              property: 'Tags',
              multi_select: {
                is_not_empty: true,
              },
            },
          }
      }
    }
    else{
      headers = {
        page_size: 7,
        filter: {
          property: 'Status',
          select: {
            equals: 'publish',
          },
        },
      }
    }

    let posts = []
    let next = null
    try {
      const res = await this.$axios.post(`databases/${this.$config.databaseId}/query`, {
        ...headers,
      })
     
      if (res.data) {
        next = res.data.next_cursor
        if (res.data.results) {
          res.data.results.forEach((post) => {
            const {id,last_edited_time, created_time, properties} = post;
            const {Name, Description, Author,slug,Tags}= properties;
            posts.push({id, last_edited_time, created_time,
              title:
               Name.title.length > 0 &&
                Name.title[0].text
                  ? Name.title[0].text.content
                  : '',
              description:
                Description.text.length > 0
                  ? Description.text[0].plain_text
                  : '',
              author: Author.people,
              slug: slug.formula.string,
              tags: Tags.multi_select,
            })
          })
        }
      }
      return { posts, next }
    }catch(err){
      console.log(err)
      return {posts, next}
    }
  },
  async getPost({}, pageSlug) {
    let postHeaders = {}
    let postBlocks = []
    try {
      const pageQuery = await this.$axios.post(
        `databases/${this.$config.databaseId}/query`,
        {
          filter: {
            property: 'slug',
            text: {
              equals: pageSlug,
            },
          },
        }
      )
      const page_id = pageQuery.data.results[0].id
      const post = (await this.$axios.get(`pages/${page_id}`)).data
      const {last_edited_time, created_time, properties} = post;
      const {Name,Author,slug,Tags} = properties;

      postHeaders = {
        last_edited_time,
        created_time,
        title: Name.title.length > 0 &&
          Name.title[0].text
            ? Name.title[0].text.content
            : '',
        author: Author.people,
        slug: slug.formula.string,
        tags: Tags.multi_select,
      }

      postBlocks = (
        await this.$axios.get(`blocks/${page_id}/children`)
      ).data.results

      return { postHeaders, postBlocks }
    } catch (err) {
      return { postHeaders, postBlocks }
    }
  },
  async getProfile(){
    let profile = {}
    let postBlocks =[]
    try {
      const res = await this.$axios.post(`databases/${this.$config.databaseId}/query`, {
        filter: {
          property: 'Name',
          text: {
            equals: 'About',
          },
        },
      })
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
        profile.social = {}

        profile.social['Email'] =
          Email && Email.text.length ? Email.text[0].plain_text : null
        profile.social['Twitter'] =
          Twitter && Twitter.text.length ? Twitter.text[0].plain_text : null
        profile.social['Facebook'] =
          Facebook && Facebook.text.length ? Facebook.text[0].plain_text : null
        profile.social['Github'] =
          Github && Github.text.length ? Github.text[0].plain_text : null
        profile.social['Instagram'] =
          Instagram && Instagram.text.length
            ? Instagram.text[0].plain_text
            : null
        profile.social['StackOverflow'] =
          StackOverflow && StackOverflow.text.length
            ? StackOverflow.text[0].plain_text
            : null
        profile.social['LInkedIn'] =
          LinkedIn && LinkedIn.text.length ? LinkedIn.text[0].plain_text : null
      }
      let postBlocks = (
        await this.$axios.get(
          `blocks/${res.data.results[0].id}/children`
        )
      ).data.results
      return { profile, postBlocks }
    }catch(err){
      return {profile, postBlocks}
    }


  }

}
