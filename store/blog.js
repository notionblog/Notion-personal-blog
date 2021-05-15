export const state = () => ({
    darkMode:'class'
  });
  
export const getters = {

};

export const mutations = {
    toggleMode: (state) => {
        let htmlClasses = document.querySelector('html').classList;
        state.darkMode = state.darkMode == 'class' ? 'dark' : 'class';
        state.darkMode == 'class' ? htmlClasses.add('dark') : htmlClasses.remove('dark')
    }
};
  
  export const actions = {};