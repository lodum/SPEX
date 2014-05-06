var slider = new function(){

	// Initialization
	this.init = function() {

		$( "#slider" ).dateRangeSlider({
			bounds: {min: new Date(2000,0,1).valueOf(), max: new Date(2011,0,1).valueOf()},
			defaultValues: {min: new Date(2006,11,11).valueOf(), max: new Date(2009,1,11).valueOf()}
		});
	};

};
