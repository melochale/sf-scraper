/**
 * Created by Melo on 2014/12/23.
 */

var logger = require('./log');

var events = require('events');
var util = require('util');

function SFServicePoint(code) {
  this.code = code;
  this.name = null;
  this.subRegionUrl = null;
  this.rangeUrl = null;
  this.level = null;
  this.parent = null;
  this.isRangeAvailable = false;
  this.regionType = null; // NONE/PART_REGION
  this.availableAsDestination = false;
  this.availableAsOrigin = false;
  this.workAddDays = null;
  this.subServicePoints = [];
  this.normalRegions = [];
  this.unavailableRegions = [];
  this.abnormalRegions = [];
  this.originRangeObject = null;
  this.originSubRegionsObject = null;
  this.province = null;
  this.mainCity = null;
}

SFServicePoint.prototype.addSubServicePoint = function(servicePoint) {
  this.subServicePoints.push(servicePoint);
};

SFServicePoint.prototype.updateServicePointProperty = function(origin) {
  var self = this;
  self.name = origin.name;
  self.availableAsDestination = origin.availableAsDestination;
  self.availableAsOrigin = origin.availableAsOrigin;
  self.level = origin.level;
  self.workAddDays = origin.workAddDays;
};
module.exports = SFServicePoint;