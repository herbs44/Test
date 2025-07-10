// Code.gs
// Main API Handler for Kanye West College Trilogy Game

function doGet(e) {
  return handleRequest(e, 'GET');
}

function doPost(e) {
  return handleRequest(e, 'POST');
}

function handleRequest(e, method) {
  var path = e.parameter.path || '';
  switch (path) {
    case 'getUser':
      return getUser(e);
    case 'saveProgress':
      return saveProgress(e);
    case 'getAchievements':
      return getAchievements(e);
    default:
      return ContentService.createTextOutput(JSON.stringify({ error: 'Invalid endpoint' })).setMimeType(ContentService.MimeType.JSON);
  }
}

function getUser(e) {
  var userId = e.parameter.userId;
  if (!userId) return jsonResponse({ error: 'Missing userId' });
  var user = getUserData(userId);
  if (!user) return jsonResponse({ error: 'User not found' });
  return jsonResponse({ user: user });
}

function saveProgress(e) {
  var body = parseRequestBody(e);
  var userId = body.userId;
  var progress = body.progress;
  if (!userId || !progress) return jsonResponse({ error: 'Missing userId or progress' });
  var success = saveUserProgress(userId, progress);
  return jsonResponse({ success: success });
}

function getAchievements(e) {
  var userId = e.parameter.userId;
  if (!userId) return jsonResponse({ error: 'Missing userId' });
  var achievements = getUserAchievements(userId);
  return jsonResponse({ achievements: achievements });
}