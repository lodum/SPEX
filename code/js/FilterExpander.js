/*This class has methods which expand a query by variables which include all literal values for which SPEX has registered filter panes
*/
/**
* Expands a query by variables which catch (space,time,...) literals for which SPEX has registered filter panes
* @class
*  @property {object}  filterDataProperties  - holds the list of prefixes and property chains which link a filter literal to a resource
**/
function FilterExpander(){}
//FilterExpander.prototype.constructor = FilterExpander;

//These are predefined vocabularies for linking well-defined filter literals to instances of interest (by a property chain)
FilterExpander.prototype.filterDataProperties = [];
//Dealing with space
FilterExpander.prototype.filterDataProperties.push({"prefix" : "wgs84", "uri" : "http://www.w3.org/2003/01/geo/wgs84_pos#", "prop" : [ "wgs84:lat"]});
FilterExpander.prototype.filterDataProperties.push({"prefix" : "wgs84", "uri" : "http://www.w3.org/2003/01/geo/wgs84_pos#", "prop" : [ "wgs84:long"]});
FilterExpander.prototype.filterDataProperties.push({"prefix" : "geo", "uri" : "http://www.opengis.net/ont/geosparql#", "prop" : [ "geo:hasGeometry", "geo:asWKT|geo-1-0:asWKT"]});
FilterExpander.prototype.filterDataProperties.push({"prefix" : "geo", "uri" : "http://www.opengis.net/ont/geosparql#", "prop" : [ "geo:hasGeometry",  "geo:asGML|geo-1-0:asGML"]});
FilterExpander.prototype.filterDataProperties.push({"prefix" : "geo", "uri" : "http://www.opengis.net/ont/geosparql#", "prop" : [ "maps:mapsArea", "geo:asWKT|geo-1-0:asWKT"]});

//Dealing with time
FilterExpander.prototype.filterDataProperties.push({"prefix" : "time", "uri" : "http://www.w3.org/2006/time#", "prop" : [ "?timelink","time:hasBeginning", "time:inXSDDateTime"]}); 
FilterExpander.prototype.filterDataProperties.push({"prefix" : "time", "uri" : "http://www.w3.org/2006/time#", "prop" : [ "?timelink", "time:hasEnd",  "time:inXSDDateTime"]}); 
FilterExpander.prototype.filterDataProperties.push({"prefix" : "time", "uri" : "http://www.w3.org/2006/time#", "prop" : [ "?timelink", "xsd:gYear"]}); 


/**This method takes a query and adds for all user selected variables some optional statements which automatically load filter literals by one of the chains of properties defined above
* @function */
FilterExpander.prototype.expandFilterLiterals = function(spexquery){
	for (var i = 0; i < spexquery.SPEXvariables.length; i++) {
        var v = spexquery.SPEXvariables[i]; 
		for (var j = 0; j < this.filterDataProperties.length; j++) {
			var p = this.filterDataProperties[j];
			var opt = spexquery.optional();			
			for (var x = 0; x < p.prop.length; x++) {				
				if (x == 0) { 
					//if (p.prop.length == 2) {
					//add chain with a variable for the first property in the chain (in order to capture cases such as that geo:hasGeometry is not used but some unknown other property)
					//opt.where(v, "?prop", v+"_"+j+"_"+x); 
					//}else{
					opt.where(v, p.prop[x], v+"_"+j+"_"+x);
					 
				} else { 					
					var ll = x - 1;
					opt.where(v+"_"+j+"_"+ll, p.prop[x], v+"_"+j+"_"+x); //property chain									
				}
			}
			opt.end();
		}        
    }
	//return spexquery;
};

FilterExpander.prototype.subscripts = function(){
	var subscripts = {
		"WKT":{
			"lastLinks":["geo:asWKT|geo-1-0:asWKT"],
			"value":[],
			"type":"spatial"
		},
		"GML":{
			"lastLinks":["geo:asGML|geo-1-0:asGML"],
			"value":[],
			"type":"spatial"
		},
		"lat":{
			"lastLinks":["wgs84:lat"],
			"value":[],
			"type":"spatial"
		},
		"long":{
			"lastLinks": ["wgs84:long"],
			"value":[],
			"type":"spatial"
		},
		"timeBeg":{
			"lastLinks":["time:hasBeginning", "time:inXSDDateTime"],
			"value":[],
			"type":"temporal"
		},
		"timeEnd":{
			"lastLinks":["time:hasEnd", "time:inXSDDateTime"],
			"value":[],
			"type":"temporal"
		},
		"gYear":{
			"lastLinks":["xsd:gYear"],
			"value":[],
			"type":"temporal"
		}
	};
	//fill the values
	for(var j = 0; j < this.filterDataProperties.length; j++) {
		var propertyPath = this.filterDataProperties[j].prop;
		for(var k in subscripts){
			var breakNow = false;
			var lastLinks = subscripts[k].lastLinks;
			for(var i=0;i<lastLinks.length; i++){
				if(lastLinks[lastLinks.length - i - 1] != propertyPath[propertyPath.length - i - 1]){
					i=lastLinks.length;
				} else if(i == lastLinks.length -1){
					subscripts[k].value.push("_" + j + "_" + (propertyPath.length - 1));
					i=lastLinks.length;
					breakNow = true;
				}
			}
			if(breakNow) break;
		}
	}
	var logString="Space-Time subscripts:\n";
	for(var i in subscripts){
		logString += i + ":" + JSON.stringify(subscripts[i].value) + ", ";
	}
	logString = logString.substring(0,logString.length - 2);
	console.log(logString);
	return subscripts;
};


