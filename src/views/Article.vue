<template>
  <div class="article">
    <div class="article-info">
      <router-link :to="articleLink">{{ published.format('MMM D, YYYY') }}</router-link>
      <i> by </i>
      <router-link :to="authorLink" class="author">PHIL NGO</router-link>
    </div>
    <h1 class="title">
      <router-link class="black" :to="articleLink">{{ title }}</router-link>
    </h1>
    <div class="content" v-html="articleHtml"></div>
  </div>
</template>

<script>
import {
  mapState,
  mapGetters
} from 'vuex'

import {
  callApiArticleMarkdown
} from '@/api'

import moment from 'moment'
import marked from 'marked'

export default {
  name: 'Article',
  data () {
    return {
      markdown: null
    }
  },
  computed: {
    ...mapGetters([
      'articleIdBySlug'
    ]),
    ...mapState({
      article (state) {
        const articleId = this.articleIdBySlug[this.slug]
        return state.articles[articleId] || {}
      }
    }),
    slug () {
      return this.$route.params.slug
    },
    published () {
      return this.article.published || moment(null)
    },
    title () {
      return this.article.title
    },
    source () {
      return this.article.source
    },
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
      return { name: 'personal' }
    },
    articleHtml () {
      return this.markdown
        ? marked(this.markdown)
        : null
    }
  },
  methods: {
    loadArticleMarkdown () {
      if (this.markdown === null && this.source !== undefined) {
        callApiArticleMarkdown(this.source).then(markdown => {
          this.markdown = markdown
        })
      }
    }
  },
  mounted () {
    this.loadArticleMarkdown()
  },
  watch: {
    source () {
      this.loadArticleMarkdown()
    }
  }
}
</script>

<style scoped>
.article {
  padding-bottom: 70px;
}

.article-info {
  font-size: 0.9em;
}

.author {
  font-weight: 100;
}

h1.title {
  margin: 10px 0 60px;
  font-size: 52px;
  font-weight: 100;
}

.content >>> h1, h2, h3 {
  margin: 0;
  font-weight: 300;
}

</style>
