import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    articles: {}
  },
  mutations: {
    addArticle (state, payload) {
      Vue.set(state.articles, payload.id, payload)
    }
  },
  actions: {
    loadArticles ({ commit }) {
      fetch('/api/articles').then(response => {
        response.json().then(data => {
          data.articles.forEach(article => {
            commit('addArticle', article)
          })
        })
      })
    }
  }
})
