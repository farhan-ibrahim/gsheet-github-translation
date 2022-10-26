function get(url , token) {
  // Return sha of the file
  // https://docs.github.com/en/rest/repos/contents#get-repository-content

  const response = UrlFetchApp.fetch(url, {
    'method':'get',
    'headers': {
        'Accept':'application/vnd.github+json',
        'Authorization': `token ${token}`,
    },
  })

  return JSON.parse(response.getContentText()).sha
}
