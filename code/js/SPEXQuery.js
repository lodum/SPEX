/**
* A SPEX query object, which represents a SPARQL query (inherited from the jQuery SPARQL class, see https://github.com/jgeldart/jquery-sparql), saves user selected (bound) variables and has additionally space and time expander methods (which add corresponding optional statements).
* @class
* @property {object}  SPEXvariables  - holds the variables that the user has generated in the queryPane
* @property {object}  spatialConstraints  - holds the spatial constraints on a node in focus.
* @property {object}  temporalConstraints  - holds the temporal constraints on a node in focus.
* @property {object}  patterns  - holds SPARQL patterns (triples, subgraphs, optionals).
* @property {object}  filters  - holds SPARQL filters .
 * @property {number}  timeout  - number of seconds before timeout is thrown.
 * @property {number}  limit - maximum number of result items displayed
**/
function SPEXQuery(){ 
this.limit(100); 
this.timeout = 100000;
this.fe = new FilterExpander();
this.le = new LiteralExpander();
this.SPEXvariables = [];
this.variablelabels = [];

// redeclare patterns
    this.queryType = "SELECT";
    this.defaultGraphs = [];
    this.namedGraphs = [];
    this.variables = [];
    this.patterns = [];
    this.filters = [];
    this.combiner = "DISTINCT";
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

/**Holds an array of variables generated by the user plus their labels as displayed in the query pane
* @function */
SPEXQuery.prototype.SPEXvariable = function(variable, label) {
    this.SPEXvariables.push(variable);
	this.variablelabels.push(label);
    return this;
  };

/** 
* gets SPARQL query expanded by optional statements for spatial, temporal and labelling literals 
@function */
SPEXQuery.prototype.getSPARQL = function (){ 	
	this.expandSpaceFilter();
	this.expandTimeFilter();	
	this.fe.expandFilterLiterals(this);
	this.le.expandLabels(this);
	return this.getPrefixedQueryString();
}
/** 
* sets a space window on some variable as a spatial constraint
* @function */
SPEXQuery.prototype.setSpatialConstraint = function(va, myWindow){
	//this.spatialConstraints.push({ "v" : va, "w" : myWindow });
	this.spatialConstraints[va] = myWindow;
}
/** 
* sets a time window on some variable as a temporal constraint
* @function */
SPEXQuery.prototype.setTemporalConstraint = function(va, time){
	//this.temporalConstraints.push({ "v" : va, "t" : time});
	this.temporalConstraints[va] = time;
}


SPEXQuery.prototype.detectWKTvars = function() {
	
	var WKTvars = [];
	var s = FilterExpander.prototype.subscripts();
	/* Find the index of "geo:asWKT". */
	var latIndex=s.lat.value, longIndex=s.long.value, WKTindex = s.WKT.value;
	
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
	console.log("SPEXQuery.prototype.detectWKTvars(): spatially enabled vars from previous query: " + JSON.stringify(spex.ex.spatiallyEnabledVars));
	if(spex.ex.spatiallyEnabledVars) {
		for(variable in spex.ex.spatiallyEnabledVars) {
			console.log("variable: " +  variable);
			function checkSpatialEnabledVarsFor(indexArray){
				console.log(JSON.stringify(indexArray));
				var indexThere = false;
				for(var i=0; i<indexArray.length;i++){
					console.log("var with index: " + variable + indexArray[i]);
					if(spex.ex.spatiallyEnabledVars[variable].indexOf(variable + indexArray[i]) !== -1){
						indexThere = true;
						i=indexArray.length;
					}
				}
				return indexThere;
			}
			var latIndexThere = checkSpatialEnabledVarsFor(latIndex);
			var longIndexThere = checkSpatialEnabledVarsFor(longIndex);
			var WKTindexThere = checkSpatialEnabledVarsFor(WKTindex);
			console.log("lat: "+ latIndexThere +", long: " + longIndexThere + ", WKT: " + WKTindexThere +"!!!!!");
			if(!(latIndexThere && longIndexThere) && WKTindexThere) {
					WKTvars.push(variable);
			}
		}
	}
	console.log("SPEXQuery.prototype.detectWKTvars(): detected WKT vars: " + JSON.stringify(WKTvars));
	return WKTvars;
};
/** 
* Expands the query by filter statements for spatial geometries
*@function */
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
    			this.where(variable, "geo:hasGeometry|maps:mapsArea", variable + "__geom")
    			.where(variable + "__geom", "geo:asWKT|geo-1-0:asWKT", variable + "__wkt");
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

/** 
* Expands the query by filters for temporal information
*@function */
SPEXQuery.prototype.expandTimeFilter = function(){
 	for (variable in this.temporalConstraints)  {
		
        // Check if there is really a Time object
        if (this.temporalConstraints[variable] != null && this.temporalConstraints[variable] != undefined) {
    		var timeQuery = this.union();
    		
    		timeQuery[0].where(variable, "time:hasBeginning", variable + "INSTANT_BEGINNING")
    		.where(variable + "INSTANT_BEGINNING", "a", "time:Instant")
    		.where(variable + "INSTANT_BEGINNING", "time:inXSDDateTime", variable + "timeBeginning")
    		.where(variable, "time:hasEnd", variable + "INSTANT_END")
    		.where(variable + "INSTANT_END", "a", "time:Instant")
    		.where(variable + "INSTANT_END", "time:inXSDDateTime", variable + "timeEnd")
    		.filter(variable + "timeBeginning  >= '" + this.temporalConstraints[variable].timeBeginning + "'^^xsd:dateTime && " + variable + "timeEnd <= '"  + this.temporalConstraints[variable].timeEnd + "'^^xsd:dateTime");
    		
    		timeQuery[1].where(variable, variable + "timelink", variable + "link")
    		.where(variable + "link", "xsd:gYear", variable + "year")
    		.filter(variable + "year >= '" + this.temporalConstraints[variable].timeBeginning.slice(0,4) + "' && " + variable + "year <= '"  + this.temporalConstraints[variable].timeEnd.slice(0,4) + "'");
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

/**
* Returns the query as a string with prefixes
*@function */
SPEXQuery.prototype.getPrefixedQueryString = function(){
	var prefixList = [];
	var string = this.serialiseQuery();
	
	//Find prefixes in the querystring
	var newString = string;	
	var j = newString.indexOf(":");
	while(j != -1){
		for (var i=j-1; i>=0; i--){
			var char=newString.charAt(i);
			if(char == '<') i = -1;
			else if([' ','|','{','\n','}','.','>','^','/','!','(','\t'].indexOf(char) != -1){
				var pfx = newString.substring(i+1,j);
				//Add prefix to prefixes of query
				prefixList.push(pfx);				
				i = -1;
			}
		}
		newString = newString.substring(j+1);
		j = newString.indexOf(":");
	}
	
	//Replace uri's enclosed in '<' and '>' with the corresponding prefix
	newString = string;
	var stringChanged = false;
	do{
		stringChanged = false;
		//Find the string enclosed in '<' and '>'
		var i = string.indexOf("<");
		if(i != -1){
			var j = string.substring(i).indexOf(">") + i;
			if(j != -1){
				var theUri = string.substring(i+1,j);
				//Replace this string with the correct prefix from the prefixlist, and add to query prefixes
				if(theUri.indexOf(" ") == -1){
					for(var k=0; k<prefixes.length; k++){
						if(theUri.indexOf(prefixes[k].uri) != -1){
							newString = string.substring(0,i) + theUri.replace(prefixes[k].uri, prefixes[k].prefix + ':') + string.substring(j+1);
							prefixList.push(prefixes[k].prefix);
							k = prefixes.length;
							stringChanged = true;
						}
						else if(k == prefixes.length -1){
							console.log(".getPrefixedQueryString(): The uri <" + theUri +"> could not be matched with the prefix list!");
						}
					}
				}
			}
		}
		string = newString;
	} while (stringChanged == true);
	
	//store the query in 'string'
	string = newString;
	
	//remove duplicates from prefixList
	prefixList.sort();
	for(var i=0; i< prefixList.length;i++){
		if(prefixList[i]==prefixList[i+1]){
			prefixList.splice(i+1,1);
			i--;
		}
	}
	
	var queryString = "";
	
	//Add prefixes to 'queryString', using 'prefixList' and master prefix list 'prefixes' 
	for(var i=0;i<prefixList.length;i++){
		for(var j=0;j<prefixes.length;j++){
			var pfx=prefixes[j];
			if(prefixList[i] == pfx.prefix){
				queryString += "PREFIX " + pfx.prefix + ": <" + pfx.uri + ">\n";
				j=prefixes.length;
			} else if(j==prefixes.length - 1){
				console.log(".getPrefixedQueryString(): The prefix '" + prefixList[i] +"' could not be matched with the prefix list!");
			}
		}
	}
	
	//Add the actual query 'string' to 'queryString'
	
	queryString+=string;
	
	return queryString;
	//This code is buggy: suggester queries do not work anymore and results seem to be filtered out that shouldnt.
	//Check for variables which are there in filters but not in the non-optional query pattern
	/*var filterVars =[];
	for(var i=0; i<this.filters.length; i++){
		var fString = this.filters[i];
		while(fString.indexOf('?') != -1){
			var p=fString.indexOf('?'),q=p+1;
			while(['=',' ','<','>','/','|',')','(','?','$'].indexOf(fString.charAt(q)) == -1) q++;
			filterVars.push(fString.substring(p,q));
			fString = fString.substring(q);
		}
	}
	
	//remove duplicates from filterVars
	filterVars.sort();
	for(var i=0; i< filterVars.length;i++){
		if(filterVars[i]==filterVars[i+1]){
			filterVars.splice(i+1,1);
			i--;
		}
	}
	
	//Look at the triples outside all optional patterns and filters and make a string
	var dummy = new SPEXQuery;
	for(var i = 0; i < this.patterns.length; i++) {
      var pat = this.patterns[i];  	  
      // remove only optionals
      if(pat._sort != "optional") {
		dummy.patterns.push(pat);
	  }
	}
	var unOptional=dummy.serialiseQuery();
	
	//Check for each of the Elements of filterVars, if it is in the unOptional string, and if yes, add a triple pattern to a string 'extraTriples'
	var extraTriples = "\n";
	for(var i=0; i<filterVars.length;i++){
		var myVar =filterVars[i];
		var myVarName = myVar.substring(1);
		if(unOptional.indexOf(myVar)) extraTriples += "{"+myVar+"?x_"+myVarName+"?y_"+myVarName+".}union{?x_"+myVarName+"?y_"+myVarName+myVar+".}\n";
	}
	
	//Insert extratriples after "Where"-satement, and set LIMIT to 1 (Because "Distinct creates more results because of the ?x_ and ?y_ variables)
	var index=queryString.indexOf("WHERE {")+7, limitStr = "";
	if (extraTriples.length > 1) limitStr = "\nLimit 1";
	var newQueryString = queryString.substring(0,index) + extraTriples + queryString.substring(index)+limitStr;
	
	return newQueryString;*/
};

