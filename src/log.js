/**
 * Created by Melo on 2014/12/24.
 */
var fs = require('fs');
var tracer =  require('tracer');

var logType = 'debug';

var consoleLog = {
  level: logType,
  format : "<{{title}}>{{timestamp}}(in {{method}} {{file}}:{{line}}): {{message}}",
  dateformat : "yyyy-mm-dd'T'HH:MM:ss.l'Z'"
};


module.exports = tracer.console(consoleLog);