export function callApiArticles () {
  const serverApi = process.env.VUE_APP_API_SERVER || '/'
  return fetch(`${serverApi}api/articles`).then(response => {
    return response.json()
  })
}

