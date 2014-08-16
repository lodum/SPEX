

function Time(){ }

Time.prototype.timeBeginning = 0.0;
Time.prototype.timeEnd = 0.0;
Time.prototype.variable = "";

Date.prototype.xsdDateTime = function() {
		var yyyy = this.getFullYear().toString();
		var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
		var dd = this.getDate().toString();
		var hh = this.getHours().toString();
		var min = this.getMinutes().toString();
		var sec = this.getSeconds().toString();
		return yyyy + '-' + (mm[1]?mm:"0"+mm[0]) + '-' + (dd[1]?dd:"0"+dd[0]) + 'T' + (hh[1]?hh:"0"+hh[0]) + ':' + (min[1]?min:"0"+min[0]) + ':' + (sec[1]?sec:"0"+sec[0]); // padding
	};