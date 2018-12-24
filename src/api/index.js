export function callApiArticles () {
  return fetch(`/api/articles`).then(response => {
    return response.json()
  })
}

