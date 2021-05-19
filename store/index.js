export const actions = {
    nuxtServerInit ( {},{ app, }) {
        app.$axios.setToken(app.$config.apiSecret, 'Bearer')
    }
  };