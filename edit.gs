function onEdit(e) {
  console.log("event" , e)
  const sheet = SpreadsheetApp.getActiveSpreadsheet();
  const main = SpreadsheetApp.setActiveSheet(sheet.getSheetByName('main'));

  // Initial positions
  const LAST_ROW = sheet.getLastRow();
  const LAST_COLUMN = sheet.getLastColumn();

  const headers = main.getRange(4,1,1, LAST_COLUMN).getValues()[0];
  const [createdAt , editedAt, select , ...editables] = headers;
  const editablesIndex = editables.map((col) => headers.indexOf(col))
  
  // //Checks that if on "main" or not
  const s = SpreadsheetApp.getActiveSheet();
  if( s.getName() == "main" ) { 
    // Checks that the cell being edited is editable
    if(e && editablesIndex.includes(e.range.getColumn()) && [2,LAST_ROW].includes(e.range.getRow())) { 
      Logger.log("edited")
      // If yes, tick "edited" cell
      const editedCheckbox = main.getRange(e.range.getRow(), 3, 1,1)
      editedCheckbox.check();
      console.log("edited" , editedCheckbox)

      // Set edited timestamp
      const lastEditedCell = main.getRange(e.range.getRow(), 2, 1,1)
      lastEditedCell.setValue(new Date);
      console.log("last" , lastEditedCell)

      // var nextCell = r.offset(0, 1);
      // if( nextCell.getValue() === '' ) //checks if the adjacent cell is empty or not?
      // nextCell.setValue(new Date());
    }
  }
}
