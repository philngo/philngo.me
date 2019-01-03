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
      return Object.keys(state.articles).map(id => state.articles[id]).sort((a, b) => {
        return b.updated.diff(a.updated)  // by reverse date
      })
    },
    articleIdBySlug (state) {
      return Object.keys(state.articles).reduce((obj, id) => {
        const article = state.articles[id]
        return {
          ...obj,
          [article.slug]: article.id
        }
      }, {})
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
