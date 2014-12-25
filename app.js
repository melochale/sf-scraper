/**
 * Created by Melo on 2014/12/23.
 */

var SFClient = require('./src/sfClient');

var client = new SFClient();

client.init();
client.handle();
