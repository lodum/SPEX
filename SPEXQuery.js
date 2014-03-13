
function SPEXQuery(){ }
SPEXQuery.prototype = $.sparql("http://www.example.com/sparql/");
SPEXQuery.prototype.constructor = SPEXQuery;
SPEXQuery.prototype.spatialConstraints = [];
SPEXQuery.prototype.temporalConstraints = [];
SPEXQuery.prototype.prefix("geo", "http://www.w3.org/2003/01/geo/wgs84_pos#");
SPEXQuery.prototype.prefix("time", "http://www.w3.org/2006/time#");
SPEXQuery.prototype.prefix("xsd", "http://www.w3.org/2001/XMLSchema#");


SPEXQuery.prototype.thematicConstraints = [];

SPEXQuery.prototype.getSPARQL= function (){ 
	this.expandSpaceFilter();
	this.expandTimeFilter();
	return this.serialiseQuery();
}

SPEXQuery.prototype.setSpatialConstraint = function(va, window){
	this.spatialConstraints.push({ "v" : va, "w" : window });

}
SPEXQuery.prototype.setTemporalConstraint = function(va, time){
	this.temporalConstraints.push({ "v" : va, "t" : time});
}


SPEXQuery.prototype.expandTimeFilter = function(){

 	for (i=0;i<this.temporalConstraints.length;i++)  {
		
		this.where(this.temporalConstraints[i].v, "time:hasBeginning", "?INSTANT_BEGINNING");
		this.where("?INSTANT_BEGINNING", "a", "time:Instant"); 
		this.where("?INSTANT_BEGINNING", "time:inXSDDateTime", "?timeBeginning");

		this.where(this.temporalConstraints[i].v, "time:hasEnd", "?INSTANT_END");
		this.where("?INSTANT_END", "a", "time:Instant"); 
		this.where("?INSTANT_END", "time:inXSDDateTime", "?timeEnd");

		this.filter("?timeBeginning  >= '" + this.temporalConstraints[i].t.timeBeginning + "'^^xsd:dateTime && ?timeEnd <= '"  + this.temporalConstraints[i].t.timeEnd + "'^^xsd:dateTime");  		

 	}
	
}

SPEXQuery.prototype.expandSpaceFilter = function(){

 	
 	for (i=0;i<this.spatialConstraints.length;i++)  {
		
		this.where(this.spatialConstraints[i].v, "geo:lat", "?lat")
		.where("geo:long", "?long");

		this.filter("?lat  > " + this.spatialConstraints[i].w.upperLeftLatitude + " && ?lat < "  + this.spatialConstraints[i].w.lowerRightLatitude + 
			             " && ?long > " + this.spatialConstraints[i].w.upperLeftLongitude +" && ?long < " + this.spatialConstraints[i].w.lowerRightLongitude);  		

 	}

}
