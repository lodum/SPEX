
function SPEXQuery(){ }
SPEXQuery.prototype = $.sparql("http://www.example.com/sparql/");
SPEXQuery.prototype.constructor = SPEXQuery;
SPEXQuery.prototype.spatialConstraints = [];
SPEXQuery.prototype.temporalConstraints = [];
SPEXQuery.prototype.prefix("geo", "http://www.w3.org/2003/01/geo/wgs84_pos#");
SPEXQuery.prototype.thematicConstraints = [];
SPEXQuery.prototype.getSPARQL= function (){ 
	this.expandSpaceFilter();
	return this.serialiseQuery();}

SPEXQuery.prototype.setSpatialConstraint = function(va, window){
this.spatialConstraints.push({ "v" : va, "w" : window });

}
SPEXQuery.prototype.setTemporalConstraint = function(va, constr){
this.spatialConstraints.push({ "v" : va, "t" : constr});
}

SPEXQuery.prototype.expandSpaceFilter = function(){

	//selectArray.push("?lat");
	//selectArray.push("?long");
 	
 	for (i=0;i<this.spatialConstraints.length;i++)  {
		
		this.where(this.spatialConstraints[i].v, "geo:lat", "?lat")
		.where("geo:long", "?long");

		this.filter("?lat  > " + this.spatialConstraints[i].w.upperLeftLatitude + " && ?lat < "  + this.spatialConstraints[i].w.lowerRightLatitude + 
			             " && ?long > " + this.spatialConstraints[i].w.upperLeftLongitude +" && ?long < " + this.spatialConstraints[i].w.lowerRightLongitude);  		

 	}

}