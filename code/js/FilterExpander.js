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
	var opt = spexquery.optional();
	for (var i = 0; i < spexquery.variables.length; i++) {
        var v = spexquery.variables[i]; 
		for (var j = 0; j < this.filterDataProperties.length;j++) {
			var p = this.filterDataProperties[j];
			//spexquery.prefix(p.prefix, p.uri);					
				for (var l = 0;l < p.prop.length; l++) {		
					if (l = 0) { opt.where(v, p.prop[l], v+j+l); }
					else { 
						var ll = l - 1;
						opt.where(v+j+ll, p.prop[l], v+j+l); 
					}
				}	
		}        
    }
	console.log("variables:"+spexquery.variables + " length:"+spexquery.variables.length);	
	//return spexquery;
}

