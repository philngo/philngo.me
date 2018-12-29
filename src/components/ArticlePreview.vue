<template>
  <div class="article-preview">
    <div class="article-info">
      <router-link :to="articleLink">{{ published.format('MMM D, YYYY') }}</router-link>
      <i> by </i>
      <router-link :to="authorLink" class="author">PHIL NGO</router-link>
    </div>
    <h2><router-link :to="articleLink">{{ title }}</router-link></h2>
  </div>
</template>

<script>
export default {
  name: 'ArticlePreview',
  props: {
    title: {
      type: String,
      required: true
    },
    published: {
      type: Object,
      required: true
    }
  },
  computed: {
    articleLink () {
      const params = {
        year: this.published.year
      }
      return { name: 'article', params }
    },
    authorLink () {
      return { name: 'personal' }
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

a {
  color: black;
  text-decoration: none;
}
a:hover {
  color: #aa0505;
}

h2 {
  margin-top: 0;
  font-weight: 600;
}
</style>
