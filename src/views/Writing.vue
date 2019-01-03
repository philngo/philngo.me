<template>
  <div class="writing">
    <div class="articles">
      <template v-for="article in articleList">
        <article-preview
          :key="article.id"
          :id="article.id"
        />
      </template>
    </div>
  </div>
</template>

<script>
import {
  mapGetters
} from 'vuex'

import ArticlePreview from '@/components/ArticlePreview'
export default {
  name: 'Writing',
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

.articles {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  grid-gap: 40px 20px;
}
@media screen and (max-width: 900px) {
  .articles {
    grid-template-columns: 1fr;
    grid-gap: 40px;
  }
}
</style>
