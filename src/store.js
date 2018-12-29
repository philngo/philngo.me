import Vue from 'vue'
import Vuex from 'vuex'

import { callApiArticles } from '@/api'
import moment from 'moment'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    articles: {}
  },
  getters: {
    articleList (state) {
      return Object.keys(state.articles).map(id => state.articles[id])
    }
  },
  mutations: {
    addArticle (state, payload) {
      const article = {
        id: payload.id,
        title: payload.title,
        slug: payload.slug,
        source: payload.source,
        published: moment(payload.published),
        updated: moment(payload.updated),
        synopsis: payload.synopsis
      }
      Vue.set(state.articles, article.id, article)
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
