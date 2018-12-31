const serverApi = process.env.VUE_APP_API_SERVER || ''

export function callApiArticles () {
  return fetch(`${serverApi}/api/article-index/`).then(response => {
    return response.json()
  })
}

export function callApiArticleMarkdown (source) {
  return fetch(`${serverApi}${source}`).then(response => {
    return response.text()
  })
}
