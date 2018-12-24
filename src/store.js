import Vue from 'vue'
import Vuex from 'vuex'

import { callApiArticles } from '@/api'

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
      callApiArticles().then(data => {
        data.forEach(article => {
          commit('addArticle', article)
        })
      })
    }
  }
})
