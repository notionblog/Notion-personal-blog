export const state = () => ({
    darkMode:null
  });
  
export const getters = {

};

export const mutations = {
    setDarkMode:(state) => {
      let darkMode = localStorage.getItem('darkMode')
      if (!darkMode) {
        localStorage.setItem('darkMode', 'class')
        darkMode = 'class'
      }
      let htmlClasses = document.querySelector('html').classList
      htmlClasses.add(darkMode)
      state.darkMode = darkMode
    },
    toggleMode: (state) => {
        let darkMode = localStorage.getItem('darkMode')
        let htmlClasses = document.querySelector('html').classList;
        htmlClasses.remove('dark')
        htmlClasses.remove('class')
        darkMode == 'class' ? localStorage.setItem('darkMode','dark') : localStorage.setItem('darkMode','class')
        darkMode == 'class' ? htmlClasses.add('dark') : htmlClasses.remove('dark')
        state.darkMode = darkMode == 'class' ? 'dark' : 'class'
    }
};
  
  export const actions = {};