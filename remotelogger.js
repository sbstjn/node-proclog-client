var request = require('request');
var remoteloggerConfig = {
  server: '127.0.0.1:7111'
, application: '0x3'
, user: null
};

func_setServer = function(str) {
  remoteloggerConfig.server = str;
  
  return this;
};

func_setApplication = function(str) {
  remoteloggerConfig.application = str;
  
  return this;
};

func_fireEvent = function() {
  category = action = key = value = procID = url = null;
  if (arguments[0].id) {
    procID = arguments[0].id; 
    offset = 1; } 
  else {
    procID = null;
    offset = 0; }
  category = arguments[0 + offset];
  action = arguments[1 + offset];
  
  if (arguments[2 + offset]) {
    key = arguments[2 + offset]; }
  if (arguments[3 + offset]) {
    value = arguments[3 + offset]; }
    
  url = '/fire/' + remoteloggerConfig.application + '/' + remoteloggerConfig.user + '/' + procID + '/' + category + '/' + action;
  if (key) {
    url += '/' + key; }
  if (value) {
    url += '/' + value; }
  request('http://' + remoteloggerConfig.server + url);
};

func_startEvent = function() {
  category = action = key = value = url = callback = null;
  category = arguments[0];
  action = arguments[1];
  
  if (typeof arguments[2] == 'function' || typeof arguments[2] == 'object') {
    callback = arguments[2]; } 
  else {
    key = arguments[2]; }
  
  if (typeof arguments[3] == 'function' || typeof arguments[3] == 'object') {
    callback = arguments[3]; } 
  else {
    key = arguments[3]; }
  
  if (typeof arguments[4] == 'function' || typeof arguments[4] == 'object') {
    callback = arguments[4]; }
  
  url = '/start/' + remoteloggerConfig.application + '/' + remoteloggerConfig.user + '/' + category + '/' + action;
  if (key) {
    url += '/' + key; }
  if (value) {
    url += '/' + value; }
  request('http://' + remoteloggerConfig.server + url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      callback(null, {id: body}); }
  });
};

func_stopEvent = function(procID) {
  if (procID.id) {
    procID = procID.id; }
  request('http://' + remoteloggerConfig.server + '/stop/' + procID, null);
};

func_setUser = function(str, events) {
  remoteloggerConfig.user = str;
  remoteloggerConfig.userRemain = events*1;
  
  return this;
};

func_unsetUser = function() {
  remoteloggerConfig.user = null;
};

exports.setServer = func_setServer;
exports.andApplication = func_setApplication;
exports.start = func_startEvent;
exports.stop = func_stopEvent;
exports.fire = func_fireEvent;
exports.setUser = func_setUser;
exports.unsetUser = func_unsetUser;