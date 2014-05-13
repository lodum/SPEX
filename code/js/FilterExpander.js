/*This class has methods which expand a query by variables which include all literal values for which SPEX has registered filter panes
*/
function FilterExpander(){}
FilterExpander.prototype.constructor = FilterExpander;

//These are predefined vocabularies for linking well defined filter literals to instances of interest (by a property chain)
FilterExpander.prototype.filterDataProperties = [];
//Dealing with space
FilterExpander.prototype.filterDataProperties.push({"prefix" : "wgs84", "uri" : "http://www.w3.org/2003/01/geo/wgs84_pos#", "prop" : [ "wgs84:lat"]});
FilterExpander.prototype.filterDataProperties.push({"prefix" : "wgs84", "uri" : "http://www.w3.org/2003/01/geo/wgs84_pos#", "prop" : [ "wgs84:long"]});
FilterExpander.prototype.filterDataProperties.push({"prefix" : "geo", "uri" : "http://www.opengis.net/ont/geosparql#", "prop" : [ "geo:hasGeometry", "geo:asWKT"]});
FilterExpander.prototype.filterDataProperties.push({"prefix" : "geo", "uri" : "http://www.opengis.net/ont/geosparql#", "prop" : [ "geo:hasGeometry",  "geo:asGML"]});
//Dealing with time
FilterExpander.prototype.filterDataProperties.push({"prefix" : "time", "uri" : "http://www.w3.org/2006/time#", "prop" : [ "time:hasBeginning", "time:inXSDDateTime"]}); 
FilterExpander.prototype.filterDataProperties.push({"prefix" : "time", "uri" : "http://www.w3.org/2006/time#", "prop" : [ "time:hasEnd",  "time:inXSDDateTime"]}); 



FilterExpander.prototype.expandFilterLiterals = function(spexquery){
	
	//console.log("variables:"+spexquery.SPEXvariables + " length:"+spexquery.SPEXvariables.length);
	for (var i = 0; i < spexquery.SPEXvariables.length; i++) {
        var v = spexquery.SPEXvariables[i]; 
		//console.log("how many property chains: "+this.filterDataProperties.length);
		for (var j = 0; j < this.filterDataProperties.length; j++) {
			var p = this.filterDataProperties[j];
			//console.log("properties:"+p.prop + " length:"+p.prop.length);
			//spexquery.prefix(p.prefix, p.uri);	
			var opt = spexquery.optional();			
				for (var x = 0; x < p.prop.length; x++) {	
					//console.log("property: "+x);				
					if (x == 0) { 
					opt.where(v, p.prop[x], v+j+x); 
					}
					else { //console.log("property: "+x);
						var ll = x - 1;
						opt.where(v+j+ll, p.prop[x], v+j+x); 
					}
				}
			opt.end();
		}        
    }
	
		
	//return spexquery;
}

