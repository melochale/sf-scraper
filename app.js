/**
 * Created by Melo on 2014/12/23.
 */
var http = require('http');
var fs = require('fs');
var async = require('async');
var nodegrass = require('nodegrass');

var SFSvervicePoint = require('./sfServicePoint');
var XlsxGenarator = require('./xlsxGenarator');
var urlLevel2 = 'http://www.sf-express.com/sf-service-web/service/region/A000086000/subRegions?level=2&lang=sc&region=cn&translate=';
var urlLevel3 = 'http://www.sf-express.com/sf-service-web/service/region/A000086000/subRegions?level=3&lang=sc&region=cn&translate=';
var urlLevel = 'http://www.sf-express.com/sf-service-web/service/region/A000086000/range?lang=sc&region=cn&translate=';
var cityMap = [{"id":"30-SC","code":"A110000000","rateCode":"010","level":2,"parentCode":"A000086000","name":"北京","lang":"SC","countryCode":"A000086000","opening":false,"availableAsDestination":true,"availableAsOrigin":true,"workAddDays":null,"remark":null},{"id":"31-SC","code":"A120000000","rateCode":"022","level":2,"parentCode":"A000086000","name":"天津","lang":"SC","countryCode":"A000086000","opening":false,"availableAsDestination":true,"availableAsOrigin":true,"workAddDays":null,"remark":null},{"id":"32-SC","code":"A130000000","rateCode":"130","level":2,"parentCode":"A000086000","name":"河北","lang":"SC","countryCode":"A000086000","opening":false,"availableAsDestination":true,"availableAsOrigin":true,"workAddDays":null,"remark":null},{"id":"33-SC","code":"A140000000","rateCode":"140","level":2,"parentCode":"A000086000","name":"山西","lang":"SC","countryCode":"A000086000","opening":false,"availableAsDestination":true,"availableAsOrigin":true,"workAddDays":null,"remark":null},{"id":"34-SC","code":"A150000000","rateCode":"150","level":2,"parentCode":"A000086000","name":"内蒙古","lang":"SC","countryCode":"A000086000","opening":false,"availableAsDestination":true,"availableAsOrigin":true,"workAddDays":null,"remark":null},{"id":"35-SC","code":"A210000000","rateCode":"210","level":2,"parentCode":"A000086000","name":"辽宁","lang":"SC","countryCode":"A000086000","opening":false,"availableAsDestination":true,"availableAsOrigin":true,"workAddDays":null,"remark":null},{"id":"36-SC","code":"A220000000","rateCode":"220","level":2,"parentCode":"A000086000","name":"吉林","lang":"SC","countryCode":"A000086000","opening":false,"availableAsDestination":true,"availableAsOrigin":true,"workAddDays":null,"remark":null},{"id":"37-SC","code":"A230000000","rateCode":"230","level":2,"parentCode":"A000086000","name":"黑龙江","lang":"SC","countryCode":"A000086000","opening":false,"availableAsDestination":true,"availableAsOrigin":true,"workAddDays":0.5,"remark":null},{"id":"38-SC","code":"A310000000","rateCode":"021","level":2,"parentCode":"A000086000","name":"上海","lang":"SC","countryCode":"A000086000","opening":false,"availableAsDestination":true,"availableAsOrigin":true,"workAddDays":null,"remark":null},{"id":"39-SC","code":"A320000000","rateCode":"320","level":2,"parentCode":"A000086000","name":"江苏","lang":"SC","countryCode":"A000086000","opening":false,"availableAsDestination":true,"availableAsOrigin":true,"workAddDays":null,"remark":null},{"id":"40-SC","code":"A330000000","rateCode":"330","level":2,"parentCode":"A000086000","name":"浙江","lang":"SC","countryCode":"A000086000","opening":false,"availableAsDestination":true,"availableAsOrigin":true,"workAddDays":null,"remark":null},{"id":"41-SC","code":"A340000000","rateCode":"340","level":2,"parentCode":"A000086000","name":"安徽","lang":"SC","countryCode":"A000086000","opening":false,"availableAsDestination":true,"availableAsOrigin":true,"workAddDays":null,"remark":null},{"id":"42-SC","code":"A350000000","rateCode":"350","level":2,"parentCode":"A000086000","name":"福建","lang":"SC","countryCode":"A000086000","opening":false,"availableAsDestination":true,"availableAsOrigin":true,"workAddDays":null,"remark":null},{"id":"43-SC","code":"A360000000","rateCode":"360","level":2,"parentCode":"A000086000","name":"江西","lang":"SC","countryCode":"A000086000","opening":false,"availableAsDestination":true,"availableAsOrigin":true,"workAddDays":null,"remark":null},{"id":"44-SC","code":"A370000000","rateCode":"370","level":2,"parentCode":"A000086000","name":"山东","lang":"SC","countryCode":"A000086000","opening":false,"availableAsDestination":true,"availableAsOrigin":true,"workAddDays":null,"remark":null},{"id":"45-SC","code":"A410000000","rateCode":"410","level":2,"parentCode":"A000086000","name":"河南","lang":"SC","countryCode":"A000086000","opening":false,"availableAsDestination":true,"availableAsOrigin":true,"workAddDays":null,"remark":null},{"id":"46-SC","code":"A420000000","rateCode":"420","level":2,"parentCode":"A000086000","name":"湖北","lang":"SC","countryCode":"A000086000","opening":false,"availableAsDestination":true,"availableAsOrigin":true,"workAddDays":null,"remark":null},{"id":"47-SC","code":"A430000000","rateCode":"430","level":2,"parentCode":"A000086000","name":"湖南","lang":"SC","countryCode":"A000086000","opening":false,"availableAsDestination":true,"availableAsOrigin":true,"workAddDays":null,"remark":null},{"id":"48-SC","code":"A440000000","rateCode":"440","level":2,"parentCode":"A000086000","name":"广东","lang":"SC","countryCode":"A000086000","opening":false,"availableAsDestination":true,"availableAsOrigin":true,"workAddDays":null,"remark":null},{"id":"49-SC","code":"A450000000","rateCode":"450","level":2,"parentCode":"A000086000","name":"广西","lang":"SC","countryCode":"A000086000","opening":false,"availableAsDestination":true,"availableAsOrigin":true,"workAddDays":null,"remark":null},{"id":"50-SC","code":"A460000000","rateCode":"460","level":2,"parentCode":"A000086000","name":"海南","lang":"SC","countryCode":"A000086000","opening":false,"availableAsDestination":true,"availableAsOrigin":true,"workAddDays":null,"remark":null},{"id":"51-SC","code":"A500000000","rateCode":"023","level":2,"parentCode":"A000086000","name":"重庆","lang":"SC","countryCode":"A000086000","opening":false,"availableAsDestination":true,"availableAsOrigin":true,"workAddDays":null,"remark":null},{"id":"52-SC","code":"A510000000","rateCode":"510","level":2,"parentCode":"A000086000","name":"四川","lang":"SC","countryCode":"A000086000","opening":false,"availableAsDestination":true,"availableAsOrigin":true,"workAddDays":null,"remark":null},{"id":"53-SC","code":"A520000000","rateCode":"520","level":2,"parentCode":"A000086000","name":"贵州","lang":"SC","countryCode":"A000086000","opening":false,"availableAsDestination":true,"availableAsOrigin":true,"workAddDays":null,"remark":null},{"id":"54-SC","code":"A530000000","rateCode":"530","level":2,"parentCode":"A000086000","name":"云南","lang":"SC","countryCode":"A000086000","opening":false,"availableAsDestination":true,"availableAsOrigin":true,"workAddDays":null,"remark":null},{"id":"55-SC","code":"A540000000","rateCode":"540","level":2,"parentCode":"A000086000","name":"西藏","lang":"SC","countryCode":"A000086000","opening":false,"availableAsDestination":true,"availableAsOrigin":true,"workAddDays":null,"remark":null},{"id":"56-SC","code":"A610000000","rateCode":"610","level":2,"parentCode":"A000086000","name":"陕西","lang":"SC","countryCode":"A000086000","opening":false,"availableAsDestination":true,"availableAsOrigin":true,"workAddDays":null,"remark":null},{"id":"57-SC","code":"A620000000","rateCode":"620","level":2,"parentCode":"A000086000","name":"甘肃","lang":"SC","countryCode":"A000086000","opening":false,"availableAsDestination":true,"availableAsOrigin":true,"workAddDays":null,"remark":null},{"id":"58-SC","code":"A630000000","rateCode":"630","level":2,"parentCode":"A000086000","name":"青海","lang":"SC","countryCode":"A000086000","opening":false,"availableAsDestination":true,"availableAsOrigin":true,"workAddDays":null,"remark":null},{"id":"59-SC","code":"A640000000","rateCode":"640","level":2,"parentCode":"A000086000","name":"宁夏","lang":"SC","countryCode":"A000086000","opening":false,"availableAsDestination":true,"availableAsOrigin":true,"workAddDays":null,"remark":null},{"id":"60-SC","code":"A650000000","rateCode":"650","level":2,"parentCode":"A000086000","name":"新疆","lang":"SC","countryCode":"A000086000","opening":false,"availableAsDestination":true,"availableAsOrigin":true,"workAddDays":null,"remark":null}];
var urlArrayLevel2 = [];
var urlArrayLevel3 = [];
var citySupport = [];
var cityNotSupport = [];
var cities = [];


async.forEachSeries(cityMap, function(province, callback){
    var sfProvince = new SFSvervicePoint(province.code);    //省份
    sfProvince.name = province.name;
    sfProvince.url = urlLevel2.replace('A000086000', province.code);
    sfProvince.availableAsDestination = province.availableAsDestination;
    sfProvince.level = province.level;
    sfProvince.workAddDays = province.workAddDays;
    nodegrass.get(sfProvince.url, function(data, status, headers){
        var arr = eval('(' + data + ')');
        console.log('省份或直辖市: %s', province.name); //打印省份
        var provinceGen = new XlsxGenarator(province.name);
        async.forEachSeries(arr, function(city, callbackCity) {
            var sfCity = new SFSvervicePoint(city.code);    //城市
            sfCity.name = city.name;
            sfCity.url = urlLevel3.replace('A000086000', city.code);
            sfCity.availableAsDestination = city.availableAsDestination;
            sfCity.level = city.level;
            sfCity.workAddDays = city.workAddDays;
            nodegrass.get(sfCity.url, function(data, status, headers){
                var counties = eval('(' + data + ')');  //县级城市
                //console.log(counties);
                async.forEachSeries(counties, function(country, callbackCountry) {
                    if (country.availableAsDestination) {
                        var villageUrl = urlLevel.replace('A000086000', country.code);
                        var subAvailableServicePointString = '(正常收送：';
                        var subUnavailableServicePointString = ')(不送地区：';

                            sfCity.serviceArea.push(country.name);
                            if (country.workAddDays > 0) {
                                sfCity.workAddDaysArea.push(country.name + '(' + '+' + country.workAddDays + '天' + ')');
                            }


                    } else {
                        sfCity.noServiceArea.push(country.name);
                    }
                    callbackCountry();
                }, function() {
                    console.log(sfCity.workAddDaysArea.toString());
                    provinceGen.addServicePoint(sfCity);
                    provinceGen.writeFile();
                    callbackCity();
                });

            });

        }, function() {
            callback();
        });
    },null,'utf8').on('error', function(e) {
        console.log("error: " + e.message);
    });
});



