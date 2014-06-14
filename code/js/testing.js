var testing = new function(){

	// Initialization
	this.init = function() {

		$("#showquery").click(this.showquery);
		$("#addspace").click(this.addSpace);
		$("#addTime").click(this.addTime);
		$("#showresults").click(this.showresults);
	};

	this.showresults = function() {	
		spex.ex.executeQuery(spex.q,document.getElementById("endpoint").value);  				
	};

	this.showquery = function() {		 
		  document.getElementById("query").innerHTML = spex.q.getSPARQL();		 
	};
		 		 
	this.addSpace = function() {
		var bbox = new Window();
		
		bbox.upperRightLatitude = map.LMap.getBounds().getNorth();
		bbox.upperRightLongitude = map.LMap.getBounds().getEast();
		bbox.lowerLeftLatitude = map.LMap.getBounds().getSouth();
		bbox.lowerLeftLongitude = map.LMap.getBounds().getWest();
		
		spex.q.setSpatialConstraint("v1", bbox);
		//show();
	};
		 

	this.addTime = function() {

		stuff = $( "#slider" ).dateRangeSlider( "values" );
			
		var t = new Time();

		t.timeBeginning =  (stuff.min.getFullYear()+"-"+stuff.min.getUTCMonth()+"-"+stuff.min.getDate()+"T00:00:00Z");
		t.timeEnd = (stuff.max.getFullYear()+"-"+stuff.max.getUTCMonth()+"-"+stuff.max.getDate()+"T00:00:00Z");
		spex.q.setTemporalConstraint("?v1", t);
		//show();
	};

};