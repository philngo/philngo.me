<template>
  <div class="article-preview">
    <div class="article-info">
      <router-link :to="articleLink">{{ published.format('MMM D, YYYY') }}</router-link>
      <i> by </i>
      <router-link :to="authorLink" class="author">PHIL NGO</router-link>
    </div>
    <h2><router-link :to="articleLink">{{ title }}</router-link></h2>
    <p>{{ synopsis }}</p>
    <router-link class="call-to-action" :to="articleLink">Read more</router-link>
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
    slug: {
      type: String,
      required: true
    },
    published: {
      type: Object,
      required: true
    },
    synopsis: {
      type: String,
      required: true
    }
  },
  computed: {
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

p {
  margin: 10px 0;
}

.call-to-action {
  color: #aa0505;
}

h2 {
  margin: 0;
  font-weight: 600;
}
</style>
