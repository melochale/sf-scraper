/**
 * Created by Melo on 2014/12/24.
 */


var async = require('async');
var nodegrass = require('nodegrass');
var Promise = require("bluebird");
var then = require('thenjs');
var logger = require('./log');
var SFServicePointManager = require('./sfServicePointManager');
var XlsxGenarator = require('./xlsxGenerator');
var SFSvervicePoint = require('./sfServicePoint');

var regionUrl = 'http://www.sf-express.com/sf-service-web/service/region/A000086000/subRegions?lang=sc&region=cn&translate=';
var rangeUrl = 'http://www.sf-express.com/sf-service-web/service/region/A000086000/range?lang=sc&region=cn&translate=';
function SFClient() {

  this.spm = new SFServicePointManager();
  this.rootNode = new SFSvervicePoint('A000086000');
}


function handleServicePoint(array, spm, parent, rootNode) {

  async.forEachSeries(array, function (item, callbackProvince) { //省
    var sp = spm.createServicePoint(item.code);
    sp.parent = parent;
    sp.updateServicePointProperty(item);
    if (parent) {
      parent.addSubServicePoint(sp);
    }
    sp.subRegionUrl = regionUrl.replace('A000086000', item.code);
    sp.rangeUrl = rangeUrl.replace('A000086000', item.code);
    sp.originSubRegionsObject = item;
    nodegrass.get(sp.subRegionUrl, function (dataRegion, status, headers) {
      nodegrass.get(sp.rangeUrl, function (data, status, headers) {
        var spRegion = eval('(' + data + ')');
        sp.type = spRegion.type;
        //logger.info('the region %s type: %s', sp.name, sp.type);
        sp.originRangeObject = spRegion;
        async.forEachSeries(spRegion.normalRegions, function (subItem, callbackSubItem) {
          sp.normalRegions.push(subItem.name);
          callbackSubItem();
        });
        async.forEachSeries(spRegion.abnormalRegions, function (subItem, callbackSubItem) {
          sp.abnormalRegions.push(subItem.name);
          callbackSubItem();
        });
        async.forEachSeries(spRegion.unavailableRegions, function (subItem, callbackSubItem) {
          sp.unavailableRegions.push(subItem.name);
          callbackSubItem();
        });
        //logger.info('获得一个区域： %s', sp.name);
        var regions = eval('(' + dataRegion + ')');
        async.forEachSeries(regions, function (item, callbackCity) { //市级
          var sps = spm.createServicePoint(item.code);
          sps.parent = sp;
          sps.updateServicePointProperty(item);
          if (sp) {
            sp.addSubServicePoint(sps);
          }
          sps.subRegionUrl = regionUrl.replace('A000086000', item.code);
          sps.rangeUrl = rangeUrl.replace('A000086000', item.code);
          sps.originSubRegionsObject = item;
          nodegrass.get(sps.subRegionUrl, function (dataRegion, status, headers) {
            nodegrass.get(sps.rangeUrl, function (data, status, headers) {
              var spRegion = eval('(' + data + ')');
              sps.type = spRegion.type;
              //logger.info('the region %s type: %s', sp.name, sp.type);
              sps.originRangeObject = spRegion;
              async.forEachSeries(spRegion.normalRegions, function (subItem, callbackSubItem) {
                sps.normalRegions.push(subItem.name);
                callbackSubItem();
              });
              async.forEachSeries(spRegion.abnormalRegions, function (subItem, callbackSubItem) {
                sps.abnormalRegions.push(subItem.name);
                callbackSubItem();
              });
              async.forEachSeries(spRegion.unavailableRegions, function (subItem, callbackSubItem) {
                sps.unavailableRegions.push(subItem.name);
                callbackSubItem();
              });
              //logger.info('获得一个区域： %s', sp.name);
              var regions = eval('(' + dataRegion + ')');
              async.forEachSeries(regions, function (item, callbackCountry) { //县级

                var spss = spm.createServicePoint(item.code);
                spss.parent = sps;
                spss.updateServicePointProperty(item);
                if (sps) {
                  sps.addSubServicePoint(spss);
                }
                spss.subRegionUrl = regionUrl.replace('A000086000', item.code);
                spss.rangeUrl = rangeUrl.replace('A000086000', item.code);
                spss.originSubRegionsObject = item;
                logger.info(spss.name);
                nodegrass.get(spss.subRegionUrl, function (dataRegion, status, headers) {
                  nodegrass.get(spss.rangeUrl, function (data, status, headers) {
                    var spRegion = eval('(' + data + ')');
                    spss.type = spRegion.type;
                    //logger.info('the region %s type: %s', sp.name, sp.type);
                    spss.originRangeObject = spRegion;
                    async.forEachSeries(spRegion.normalRegions, function (subItem, callbackSubItem) {
                      spss.normalRegions.push(subItem.name);
                      callbackSubItem();
                    });
                    async.forEachSeries(spRegion.abnormalRegions, function (subItem, callbackSubItem) {
                      spss.abnormalRegions.push(subItem.name);
                      callbackSubItem();
                    });
                    async.forEachSeries(spRegion.unavailableRegions, function (subItem, callbackSubItem) {
                      spss.unavailableRegions.push(subItem.name);
                      callbackSubItem();
                    });

                  });
                });
                callbackCountry();
              }, function () {
                callbackCity();
              });
            });
          });
        }, function () {
          callbackProvince();
        });
      });
    });
  }, function() {
    async.forEachSeries(rootNode.subServicePoints, function(item, callback) {
      var generator = new XlsxGenarator();
      generator.handleFile(item);
      callback();
    })
  });


}

SFClient.prototype.init = function() {
};

SFClient.prototype.handle = function(array) {
  var self = this;
  nodegrass.get(regionUrl, function(data, status, headers) {
    var array = eval('(' + data + ')');
    handleServicePoint(array, self.spm, self.rootNode, self.rootNode);
  });
};


module.exports = SFClient;