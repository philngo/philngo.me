<template>
  <div class="home">
    <h2>Featured Article</h2>
    <article-preview
      :key="featuredArticle.id"
      :id="featuredArticle.id"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'

import ArticlePreview from '@/components/ArticlePreview'

export default {
  name: 'Home',
  components: {
    ArticlePreview
  },
  computed: {
    ...mapState({
      featuredArticle (state) {
        const articleId = 2
        return state.articles[articleId] || {}
      }
    })
  }
}
</script>

<style scoped>
.home {
}
</style>
