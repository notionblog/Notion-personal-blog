export const state = () => ({
    darkMode:'class'
  });
  
export const getters = {

};

export const mutations = {
    toggleMode: (state) => {
        console.log('her')
        console.log("before",state.darkMode)
        state.darkMode = state.darkMode == 'class' ? 'dark' : 'class';
        console.log("after",state.darkMode)
    }
};
  
  export const actions = {};