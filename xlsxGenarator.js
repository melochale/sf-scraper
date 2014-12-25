/**
 * Created by Melo on 2014/12/23.
 */
var fs = require('fs');
var xlsx = require('node-xlsx');

var header = ['城市', '服务地区', '加时地区', '不送地区'];
function XlsxGenarator(fileName) {
  this.fileName = fileName;
  this.root = [header];
}
XlsxGenarator.prototype.addServicePoint = function(servicePoint) {
  var row = [];
  row.push(servicePoint.name);
  row.push(servicePoint.serviceArea.toString());
  row.push(servicePoint.workAddDaysArea.toString());
  row.push(servicePoint.noServiceArea.toString());
  this.root.push(row);
  //console.log(this.root);
};
XlsxGenarator.prototype.writeFile = function() {
  var buffer = xlsx.build([{name: this.fileName, data: this.root}]); // returns a buffer
  fs.writeFileSync(this.fileName + '.xlsx', buffer, 'binary');
};

module.exports = XlsxGenarator;