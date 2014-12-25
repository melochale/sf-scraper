/**
 * Created by Melo on 2014/12/23.
 */
var fs = require('fs');
var xlsx = require('node-xlsx');
var async = require('async');
var nodegrass = require('nodegrass');

var logger = require('./log');

var header = ['城市', '服务地区', '不送地区'];

function XlsxFileView(name) {
  this.name = name;
  this.cellListView = [header];
}

function XlsxGenerator() {
  this.xlsxfiles = [];
}

XlsxGenerator.prototype.handleFile = function(item) {
  var self = this;
  if (item.level == 2) {  //level2 省级
    var xlsxFile = new XlsxFileView(item.name);
    logger.info('正在生成%s的文件...', item.name);
    async.forEachSeries(item.subServicePoints, function(itemLevel3, callback3) {  // level3 市级
      var row = [];
      var nameString = '', serviceString = '', workAddDayString = '', noServiceString = '';
      row[0] = nameString = itemLevel3.name;  // 第一项
      if (itemLevel3.type == 'PART_REGION'){
        if(itemLevel3.unavailableRegions.length > 0 ) {
          noServiceString += itemLevel3.name + '（' + itemLevel3.unavailableRegions.toString() + '）'+ ' ';
        }
      } else if (itemLevel3.type == 'NONE'){
        noServiceString += itemLevel3.name + '（全区不配送）'+ ' ';
      }
      async.forEachSeries(itemLevel3.subServicePoints, function(itemLevel4, callback4) { // level4 县级
        logger.info('level 4 level type: %s this level: %s, last level: %s', itemLevel4.type, itemLevel4.name, itemLevel3.name);
        if (itemLevel4.type == 'ALL_REGION') {
          serviceString += itemLevel4.name + '配送地区（' + itemLevel4.normalRegions.toString() +'正常配送' + '）' + ' ';
        } else if (itemLevel4.type == 'PART_REGION'){
          if(itemLevel4.normalRegions.length > 0) {
            serviceString += itemLevel4.name + '部分地区提供配送服务（' + itemLevel4.normalRegions.toString() +'正常配送' + '）' + ' ';
          }
          if(itemLevel4.unavailableRegions.length > 0 ) {
            noServiceString += itemLevel4.name + '（' + itemLevel4.unavailableRegions.toString() + '）'+ ' ';
          }
        } else if (itemLevel4.type == 'NONE'){
          noServiceString += itemLevel4.name + '（全区不配送）'+ ' ';
        }
        callback4();
      }, function() {
        row[1] = serviceString;
        row[2] = noServiceString;
        xlsxFile.cellListView.push(row);
        //console.log(row);
        var buffer = xlsx.build([{name: xlsxFile.name, data: xlsxFile.cellListView}]);
        fs.writeFileSync(xlsxFile.name + '.xlsx', buffer, 'binary');
      });
      callback3();
    });
  }


}

module.exports = XlsxGenerator;