<template>
  <div class="article">
    <div class="back">
      <router-link class="red" :to="{ name: 'writing' }">&lt;&lt; all articles</router-link>
    </div>
    <template v-if="articleHtml !== null">
      <div class="article-info">
        <router-link :to="articleLink">{{ published.format('MMM D, YYYY') }}</router-link>
        <i> by </i>
        <router-link :to="authorLink" class="author">PHIL NGO</router-link>
      </div>
      <h1 class="title">
        <router-link class="black" :to="articleLink">{{ title }}</router-link>
      </h1>
      <div class="content" v-html="articleHtml"></div>
    </template>
    <template v-else>
      <div>
        Loading...
      </div>
    </template>
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
      markdown: null,
      loadingTimerId: null
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
      return { name: 'professional' }
    },
    articleHtml () {
      return this.markdown
        ? marked(this.markdown)
        : null
    }
  },
  methods: {
    redirect () {
      this.$router.push({ name: 'writing' })
    },
    loadArticleMarkdown () {
      if (this.markdown === null) {

        if (this.loadingTimerId === null) {
          this.loadingTimerId = setTimeout(this.redirect, 2000)
        }

        if (this.source !== undefined) {
          callApiArticleMarkdown(this.source).then(markdown => {
            this.markdown = markdown
            clearTimeout(this.loadingTimerId)
            this.loadingTimerId = null
          })
        }
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
.back {
  padding-bottom: 10px;
}

.article {
  padding-bottom: 70px;
  max-width: 500px;
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
@media screen and (max-width: 900px) {
  h1.title {
    margin: 10px 0;
    font-size: 24px;
  }
}

.content >>> h1, h2, h3 {
  margin: 0;
  font-weight: 300;
}

.content >>> a {
  color: #aa0505;
}

.content >>> blockquote {
  margin: 0;
  border-left: .25rem solid #dcdedf;
  padding: 10px 20px 10px 40px;
  background-color: #f7f8f9;
}

.content >>> pre {
  background-color: #e7e8e9;
  padding: 30px;
  border-radius: 2px;
  overflow-x: auto;
}

.content >>> code {
  font-family: Consolas, monaco, monospace;
  font-size: 14px;
  background-color: #e7e8e9;
  padding: 2px 4px;
  border-radius: 2px;
}

</style>
