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
  async getPosts(){
    let posts = []
    let next = null
    try {
      const res = await this.$axios.post(`databases/${this.$config.databaseId}/query`, {
        page_size: 7,
        filter: {
          property: 'Status',
          select: {
            equals: 'publish',
          },
        },
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
      return {posts, next}
    }
  }
}
