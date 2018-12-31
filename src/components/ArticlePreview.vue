<template>
  <div class="article-preview">
    <div class="article-info">
      <router-link :to="articleLink">{{ published.format('MMM D, YYYY') }}</router-link>
      <i> by </i>
      <router-link :to="authorLink" class="author">PHIL NGO</router-link>
    </div>
    <h1><router-link :to="articleLink">{{ title }}</router-link></h1>
    <p>{{ synopsis }}</p>
    <router-link class="red" :to="articleLink">Read more</router-link>
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'

export default {
  name: 'ArticlePreview',
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  computed: {
    ...mapState({
      article (state) {
        return state.articles[this.id] || {}
      }
    }),
    articleLink () {
      const params = {
        year: this.published.year(),
        month: this.published.month() + 1,
        day: this.published.date(),
        slug: this.slug
      }
      return { name: 'article', params }
    },
    authorLink () {
      return { name: 'professional' }
    },
    slug () {
      return this.article.slug
    },
    title () {
      return this.article.title
    },
    published () {
      return this.article.published
    },
    synopsis () {
      return this.article.synopsis
    }
  }
}
</script>

<style scoped>
.article-preview {
}
.article-info {
  font-size: 0.9em;
}

.author {
  font-weight: 100;
}

p {
  margin: 10px 0;
}

h1 {
  margin: 10px 0;
  font-size: 24px;
  font-weight: 100;
}
</style>
