async function update() {
  // reMap
  Object.defineProperty(Array.prototype, 'remap',{
    value:function(){ return [].concat(this).map((val) => val[0])}
  })


  // Get data from sheets
  // TODO : remove header value , empty value, non-change value
  const sheet = SpreadsheetApp.getActiveSpreadsheet();
  const main = SpreadsheetApp.setActiveSheet(sheet.getSheetByName('main'));
  const LAST_ROW = main.getLastRow();
  const LAST_COLUMN = main.getLastColumn();
  const HEADER_ROW = main.getFrozenRows() // 3, start after headers;
  const START_ROW = HEADER_ROW + 1
  const NUM_ROW = LAST_ROW - START_ROW  // all non-empty rows except headers
  const headers = main.getRange(HEADER_ROW, 1, 1, LAST_COLUMN).getValues()[0];
  const [createdAt , editedAt, select , key,...languages] = headers;
  const keys = main.getRange(START_ROW, headers.indexOf(key) + 1, NUM_ROW ).getValues().remap();


  // Run for every language
  for (const language of languages){
    // Get language values
    const col = headers.indexOf(language) + 1;
    const values = main.getRange(START_ROW, col, NUM_ROW ).getValues().remap();
    
    // Create translation object
    const obj = {}; let i = 0;
    while(i < values.length){
      obj[keys[i]] = values[i]
      i++
    }
    
    // Push to github
    const response = await push(language , obj);

    // Create log
    const log = response.commit.html_url
    createLog(log)
  }

  
}

