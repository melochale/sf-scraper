/**
 * Created by Melo on 2014/12/23.
 */
function SFServicePoint(code) {
  this.code = code;
  this.name = null;
  this.url = null;
  this.level = null;
  this.availableAsDestination = null;
  this.workAddDays = null;
  this.workAddDaysArea = [];
  this.serviceArea = [];
  this.noServiceArea = [];
}

module.exports = SFServicePoint;