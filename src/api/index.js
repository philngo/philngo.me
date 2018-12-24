export function callApiArticles () {
  if (process.env.NODE_ENV === 'development') {
    return new Promise((resolve) => {
      resolve([
        {
          id: 1,
          title: 'First post',
          slug: 'first-post',
          source: '/api/articles/a1.md',
          published: '2018-12-24',
          updated: '2018-12-24'
        }
      ])
    })
  } else {
    return fetch(`/api/articles`).then(response => {
      return response.json()
    })
  }
}

