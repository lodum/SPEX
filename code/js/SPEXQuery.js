
function SPEXQuery(){ 
this.limit(50); 
this.timeout = 50000;
this.fe = new FilterExpander();
this.le = new LiteralExpander();
this.SPEXvariables = [];
this.variablelabels = [];

// redeclare patterns
    this.queryType = "SELECT";
    this.prefixes = SPEXPrefixes;
    this.defaultGraphs = [];
    this.namedGraphs = [];
    this.variables = [];
    this.patterns = [];
    this.filters = [];
    this.combiner = "";
    this.orders = [];
    this.limitCount = -1;
    this.offsetCount = 0;
    this._prevSubj = null;
    this._prevProp = null;
    this._storedQuery = "";

}


SPEXQuery.prototype = $.sparql("http://www.example.com/sparql/");
SPEXQuery.prototype.constructor = SPEXQuery;
SPEXQuery.prototype.spatialConstraints = {};
SPEXQuery.prototype.temporalConstraints = {};
SPEXQuery.prototype.thematicConstraints = [];

//This is the array which holds those variables requested by the user plus their labels as displayed in the query pane
SPEXQuery.prototype.SPEXvariable = function(variable, label) {
    this.SPEXvariables.push(variable);
	this.variablelabels.push(label);
    return this;
  };


SPEXQuery.prototype.getSPARQL = function (){ 	
	this.expandSpaceFilter();
	this.expandTimeFilter();	
	this.fe.expandFilterLiterals(this);
	this.le.expandLabels(this);
	return this.serialiseQuery();
}

SPEXQuery.prototype.setSpatialConstraint = function(va, myWindow){
	//this.spatialConstraints.push({ "v" : va, "w" : myWindow });
	this.spatialConstraints[va] = myWindow;
}
SPEXQuery.prototype.setTemporalConstraint = function(va, time){
	//this.temporalConstraints.push({ "v" : va, "t" : time});
	this.temporalConstraints[va] = time;
}


SPEXQuery.prototype.detectWKTvars = function() {
	
	var WKTvars = [];
	/* Find the index of "geo:asWKT". */
	var latIndex, longIndex, WKTindex = null;
	for(var j = 0; j < FilterExpander.prototype.filterDataProperties.length; j++) {
		var property = FilterExpander.prototype.filterDataProperties[j];
		if(property.prop[property.prop.length - 1] === "geo:asWKT") {
			WKTindex = "_" + j + "_" + (property.prop.length - 1);
		} else if(property.prop[property.prop.length - 1] === "wgs84:lat") {
			latIndex = "_" + j + "_" + (property.prop.length - 1);
		} else if(property.prop[property.prop.length - 1] === "wgs84:long") {
			longIndex = "_" + j + "_" + (property.prop.length - 1);
		}
	}

	/* For a variable to qualify as a WKT variable it should be conected to a WKT literal and
	not be connected to both wgs84:lat and wgs84:long literals. */
	/*
	if(this.spatiallyEnabledVars) {
		for(variable in this.spatiallyEnabledVars) {
			if((this.spatiallyEnabledVars[variable].indexOf(variable + latIndex) === -1 ||
			   this.spatiallyEnabledVars[variable].indexOf(variable + longIndex) === -1) && 
			   this.spatiallyEnabledVars[variable].indexOf(variable + WKTIndex) !== -1) {
					WKTvars.push(variable);
			}
		}
	}
	*/
	console.log("SPEXQuery.prototype.detectWKTvars(): spatally enabled vars from previous query: " + JSON.stringify(spex.ex.spatiallyEnabledVars));
	if(spex.ex.spatiallyEnabledVars) {
		for(variable in spex.ex.spatiallyEnabledVars) {
			if((spex.ex.spatiallyEnabledVars[variable].indexOf(variable + latIndex) === -1 ||
			   spex.ex.spatiallyEnabledVars[variable].indexOf(variable + longIndex) === -1) && 
			   spex.ex.spatiallyEnabledVars[variable].indexOf(variable + WKTindex) !== -1) {
					WKTvars.push(variable);
			}
		}
	}
	console.log("SPEXQuery.prototype.detectWKTvars(): detected WKT vars: " + JSON.stringify(WKTvars));
	return WKTvars;
};

SPEXQuery.prototype.expandSpaceFilter = function(){
 	var WKTvars = this.detectWKTvars();

 	for (variable in this.spatialConstraints)  {

        // Check if there is really a Window object
        if (this.spatialConstraints[variable] != null && this.spatialConstraints[variable] != undefined) {
    		//if the variable is not a WKT variable
    		console.log("SPEXQuery.prototype.expandSpaceFilter(): spatial variable w/o '?': " + variable.substr(1));
    		if(WKTvars.indexOf(variable.substr(1)) === -1) { 
    			this.where(variable, "wgs84:lat", variable + "__lat")
    			.where("wgs84:long", variable + "__long");

    			this.filter("(" + variable + "__lat  < " + this.spatialConstraints[variable].upperRightLatitude + 
    				        " && " + variable + "__lat > "  + this.spatialConstraints[variable].lowerLeftLatitude + 
    			            " && " + variable + "__long < " + this.spatialConstraints[variable].upperRightLongitude + 
    			            " && " + variable + "__long > " + this.spatialConstraints[variable].lowerLeftLongitude +
                            ") || (" + variable + "__lat  < '" + this.spatialConstraints[variable].upperRightLatitude + 
                            "' && " + variable + "__lat > '"  + this.spatialConstraints[variable].lowerLeftLatitude + 
                            "' && " + variable + "__long < '" + this.spatialConstraints[variable].upperRightLongitude + 
                            "' && " + variable + "__long > '" + this.spatialConstraints[variable].lowerLeftLongitude + "')");  		
    		} else {//if it is a WKT variable
    			this.where(variable, "geo:hasGeometry", variable + "__geom")
    			.where(variable + "__geom", "geo:asWKT", variable + "__wkt");
    		}
        }
 	}
 	
 	/*
 	for (i = 0 ; i < this.spatialConstraints.length; i++)  {
		if(WKTvars.indexOf(this.spatialConstraints[i].v) === -1) { 
			this.where(this.spatialConstraints[i].v, "wgs84:lat", this.spatialConstraints[i].v + "__lat")
			.where("wgs84:long", this.spatialConstraints[i].v + "__long");

			this.filter("?lat  < " + this.spatialConstraints[i].w.upperRightLatitude + 
				        " && ?lat > "  + this.spatialConstraints[i].w.lowerLeftLatitude + 
			            " && ?long < " + this.spatialConstraints[i].w.upperRightLongitude + 
			            " && ?long > " + this.spatialConstraints[i].w.lowerLeftLongitude);  		
		} else {//if it is a WKT variable
			this.where(this.spatialConstraints[i].v, "geo:hasGeometry", this.spatialConstraints[i].v + "__geom")
			.where(this.spatialConstraints[i].v + "__geom", "geo:asWKT", this.spatialConstraints[i].v + "__wkt");
		}
 	}
 	*/

}


SPEXQuery.prototype.expandTimeFilter = function(){
 	for (variable in this.temporalConstraints)  {
		
        // Check if there is really a Time object
        if (this.temporalConstraints[variable] != null && this.temporalConstraints[variable] != undefined) {
    		this.where(variable, "time:hasBeginning", "?INSTANT_BEGINNING");
    		this.where("?INSTANT_BEGINNING", "a", "time:Instant"); 
    		this.where("?INSTANT_BEGINNING", "time:inXSDDateTime", "?timeBeginning");

    		this.where(variable, "time:hasEnd", "?INSTANT_END");
    		this.where("?INSTANT_END", "a", "time:Instant"); 
    		this.where("?INSTANT_END", "time:inXSDDateTime", "?timeEnd");

    		this.filter("?timeBeginning  >= '" + this.temporalConstraints[variable].timeBeginning + "'^^xsd:dateTime && ?timeEnd <= '"  + this.temporalConstraints[variable].timeEnd + "'^^xsd:dateTime");  		
        }
 	}
 	/*
 	for (i=0;i<this.temporalConstraints.length;i++)  {
		
		this.where(this.temporalConstraints[i].v, "time:hasBeginning", "?INSTANT_BEGINNING");
		this.where("?INSTANT_BEGINNING", "a", "time:Instant"); 
		this.where("?INSTANT_BEGINNING", "time:inXSDDateTime", "?timeBeginning");

		this.where(this.temporalConstraints[i].v, "time:hasEnd", "?INSTANT_END");
		this.where("?INSTANT_END", "a", "time:Instant"); 
		this.where("?INSTANT_END", "time:inXSDDateTime", "?timeEnd");

		this.filter("?timeBeginning  >= '" + this.temporalConstraints[i].t.timeBeginning + "'^^xsd:dateTime && ?timeEnd <= '"  + this.temporalConstraints[i].t.timeEnd + "'^^xsd:dateTime");  		

 	}
 	*/
	
}
