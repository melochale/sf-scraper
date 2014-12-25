/**
 * Created by Melo on 2014/12/24.
 */
var rbTree = require('redblack');

var SFSvervicePoint = require('./sfServicePoint');
var logger = require('./log');

function SFServicePointManager() {
  this.servicePointTree = rbTree.tree();
}

SFServicePointManager.prototype.createServicePoint = function(code) {
  if (!code) {
    logger.error('null service point code.');
    return null;
  }
  var point = new SFSvervicePoint(code);
  this.servicePointTree.insert(code, point);
  return point;
};

SFServicePointManager.prototype.searchServicePoint = function(code) {
  if(!code || typeof code !== "string") {
    logger.error('wrong service point code.');
    return null;
  }
  return this.servicePointTree.get(code);
};

SFServicePointManager.prototype.forEach = function(callback) {
  return this.servicePointTree.forEach(callback);
};

module.exports = SFServicePointManager;