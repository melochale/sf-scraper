/**
 * Created by Melo on 2014/12/23.
 */

var async = require('async');
var a1 = [1,2,3,4,5,6,7,8];
async.forEachSeries(a1, function(n1, callback_s1) {
  console.log(n1);
  var a2 = [10,11,12,13,14];
  async.forEachSeries(a2, function(n2, callback_s2) {
    console.log(n1 + " " + n2);
    var a3 = ['a', 'b', 'c', 'd', 'e'];
    async.forEachSeries(a3, function(n3, callback_s3) {
      console.log(n1 + " " + n2 + ' ' + n3);
      callback_s3()
    }, function() {
      callback_s2();
    });
  }, function () {
    console.log('execute once');
    /* Finished the second series, now we mark the iteration of first series done */
    callback_s1();
  });
  console.log('execute more than once at last');
  //callback_s1();
}, function() {
  console.log('execute more than once at last');
});