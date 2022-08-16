async function push(language, data) {

  // https://docs.github.com/en/rest/repos/contents#create-or-update-file-contents
  const OWNER = "farhan-ibrahim";
  const REPO = "gsheet-github-translation";
  const URLS = {
    en:`https://api.github.com/repos/${OWNER}/${REPO}/contents/en.json?ref=translation`,
    my:`https://api.github.com/repos/${OWNER}/${REPO}/contents/my.json?ref=translation`
  }
  const TIMEZONE = Session.getScriptTimeZone();
  const DATE = Utilities.formatDate(new Date(), TIMEZONE, "MM-dd-yyyy | HH:mm:ss");
  const scriptProperties = PropertiesService.getScriptProperties();
  const token = scriptProperties.getProperty('GITHUB_TOKEN')
  const url = URLS[language];


  // Get existing file's sha
  const sha = get(url, token);

  // Update content
  const options = {
    'method':'put',
    'headers': {
        'Accept':'application/vnd.github+json',
        'Authorization': `token ${token}`,
    },
    'payload':JSON.stringify({
      sha,
      branch:"translation",
      message:`update ${DATE} `,
      committer:{name:"Farhan Ibrahim",email:"farhan5543@gmail.com"},
      content:Utilities.base64Encode(JSON.stringify(data))
    })
  }

  const response =  UrlFetchApp.fetch(url, options);
  return JSON.parse(response.getContentText())
}
