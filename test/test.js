/**
 * Created by Administrator on 2014/12/23.
 */
{"type":"PART_REGION","unavailableRegions":[],"normalRegions":[{"selfSend":false,"selfPickup":false,"name":"南京","code":"A320100000","availableAsOrigin":true,"availableAsDestination":true},{"selfSend":false,"selfPickup":false,"name":"无锡","code":"A320200000","availableAsOrigin":true,"availableAsDestination":true},{"selfSend":false,"selfPickup":false,"name":"徐州","code":"A320300000","availableAsOrigin":true,"availableAsDestination":true},{"selfSend":false,"selfPickup":false,"name":"常州","code":"A320400000","availableAsOrigin":true,"availableAsDestination":true},{"selfSend":false,"selfPickup":false,"name":"苏州","code":"A320500000","availableAsOrigin":true,"availableAsDestination":true},{"selfSend":false,"selfPickup":false,"name":"南通","code":"A320600000","availableAsOrigin":true,"availableAsDestination":true},{"selfSend":false,"selfPickup":false,"name":"连云港","code":"A320700000","availableAsOrigin":true,"availableAsDestination":true},{"selfSend":false,"selfPickup":false,"name":"淮安","code":"A320800000","availableAsOrigin":true,"availableAsDestination":true},{"selfSend":false,"selfPickup":false,"name":"盐城","code":"A320900000","availableAsOrigin":true,"availableAsDestination":true},{"selfSend":false,"selfPickup":false,"name":"扬州","code":"A321000000","availableAsOrigin":true,"availableAsDestination":true},{"selfSend":false,"selfPickup":false,"name":"镇江","code":"A321100000","availableAsOrigin":true,"availableAsDestination":true},{"selfSend":false,"selfPickup":false,"name":"泰州","code":"A321200000","availableAsOrigin":true,"availableAsDestination":true},{"selfSend":false,"selfPickup":false,"name":"宿迁","code":"A321300000","availableAsOrigin":true,"availableAsDestination":true}],"abnormalRegions":[]}


async.forEachSeries(counties, function(country, callbackCountry) {
  if (country.availableAsDestination) {
    var villageUrl = urlLevel.replace('A000086000', country.code);
    var subAvailableServicePointString = '(正常收送：';
    var subUnavailableServicePointString = ')(不送地区：';
    nodegrass.get(villageUrl, function(data, status, headers){
      var villages = eval('(' + data + ')');  //乡下
      //console.log(villages);
      async.forEachSeries(villages.normalRegions, function(village, callbackVillage) {
        //console.log(village);
        if(village.availableAsDestination) {
          subAvailableServicePointString += village.name +' ';
        } else {
          subUnavailableServicePointString += village.name + ' ';
        }
        callbackVillage();
      }, function() {