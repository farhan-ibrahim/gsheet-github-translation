function createLog(data) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet();
  const log = SpreadsheetApp.setActiveSheet(sheet.getSheetByName('logs'));
  const LAST_ROW = log.getLastRow();

  log.appendRow([new Date, data ])


}
