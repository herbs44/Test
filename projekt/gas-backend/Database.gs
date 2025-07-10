// Database.gs
// Database handling for Kanye West College Trilogy Game

var SHEET_ID = 'YOUR_SHEET_ID_HERE'; // TODO: Replace with actual Sheet ID
var USER_SHEET = 'Users';
var PROGRESS_SHEET = 'Progress';
var ACHIEVEMENTS_SHEET = 'Achievements';

function getUserData(userId) {
  var sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(USER_SHEET);
  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    if (data[i][0] == userId) {
      return data[i];
    }
  }
  return null;
}

function saveUserProgress(userId, progress) {
  var sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(PROGRESS_SHEET);
  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    if (data[i][0] == userId) {
      sheet.getRange(i+1, 2, 1, 1).setValue(progress);
      return true;
    }
  }
  sheet.appendRow([userId, progress]);
  return true;
}

function getUserAchievements(userId) {
  var sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(ACHIEVEMENTS_SHEET);
  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    if (data[i][0] == userId) {
      return data[i].slice(1);
    }
  }
  return [];
}