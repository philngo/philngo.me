<template>
  <div class="writing">
    <h1>Writing</h1>
    <template v-for="article in articleList">
      <article-preview
        :key="article.id"
        :title="article.title"
        :published="article.published"
      />
    </template>
  </div>
</template>

<script>
import {
  mapGetters
} from 'vuex'

import ArticlePreview from '@/components/ArticlePreview'
export default {
  name: 'writing',
  components: {
    ArticlePreview
  },
  computed: {
    ...mapGetters([
      'articleList'
    ])
  }
}
</script>

<style scoped>
.writing {
}

h1 {
  font-weight: 300;
}
</style>
