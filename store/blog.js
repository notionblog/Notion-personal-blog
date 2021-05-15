export const state = () => ({
    darkMode:'class'
  });
  
export const getters = {

};

export const mutations = {
    toggleMode: (state) => {
        let darkMode = localStorage.getItem('darkMode')

        let htmlClasses = document.querySelector('html').classList;
        htmlClasses.remove('dark')
        htmlClasses.remove('class')
        darkMode == 'class' ? localStorage.setItem('darkMode','dark') : localStorage.setItem('darkMode','class')
        darkMode == 'class' ? htmlClasses.add('dark') : htmlClasses.remove('dark')
    }
};
  
  export const actions = {};