function SPEXResultSet(json) {
	this.allResults = json;
	//this.displayResults = this.prepareresultstodisplay(json);
}

//Generates a second json object for display containing only user selected variables of the query (spex.q.SPEXvariables)
//SPEXResultSet.prototype.prepareresultstodisplay = function(json) {
//var displayjson = JSON.parse(JSON.stringify(json));
//	$.each(displayjson.head.vars, function(index2, value2) { 
//		if( 
//		spex.q.SPEXvariables.indexOf('?'+value2)==-1 && value2!=undefined 
//		){ 						
//					delete displayjson.head.vars[index2];
//		}else{};						
//	});			
//return  displayjson;
//}


//SPEXResultSet.prototype.constructor = SPEXResultSet;

/* Function to return the SPARQL JSON as it was returned from the endpoint. */
SPEXResultSet.prototype.getAllResults = function() {
	return this.allResults;
};

/*Function to add new solution into result set. */
SPEXResultSet.prototype.addNewResult = function(resultObject) { //is this what it's meant to do?
	this.allResults.results.bindings.push(resultObject);
	//If a new solution has been added, we have to reformat the labeledResults attribute.
	this.prepareForDisplay();
}; 

SPEXResultSet.prototype.getUserSelectedVariables = function() {	
	/* Since only variables originally selected by the user got a corresponding 'child' variable with a "__label" ending 
	(while processed by LiteralExpander),
	we can trace back the original variables by looking for their children. */
		var allVariables = this.allResults.head.vars;
		var userSelection = [];
		for(i = 0; i < allVariables.length; i++) {
			var v = allVariables[i];
			if(v.substring(v.length - 7, v.length) === "__label") {
				var parent = v.substring(0, v.length - 7);
				var parentIndex = allVariables.indexOf(parent);
				userSelection.push(allVariables[parentIndex]);
			}
		}
		return userSelection;
};


/*This function relates spatio-temporal variables created by FilterExpander to their 'parent' variables.
The result is an object whose keys are the parents (= user-selected variables from the original query). 
The value for each key is an array of spatio-temporal variables 
related through property chains to the key variable.*/
SPEXResultSet.prototype.relateSpaceTime = function() {
	var userVars = this.getUserSelectedVariables();
	//debug(JSON.stringify(userVars));
	var allVars = this.allResults.head.vars
	var spaceTimeMatches = {};
	for(var i = 0; i < userVars.length; i++) {
		var userVariable = userVars[i];
		var pattern = "^" + userVariable + "_[0-9]+_[0-9]+$";
		var re = new RegExp(pattern);
		for(var j = 0; j < allVars.length; j++) {
			var aVar = allVars[j];
			if(re.test(aVar)) {
				 if(!spaceTimeMatches[userVariable]){
				 	spaceTimeMatches[userVariable] = [aVar];
				 	//debug(JSON.stringify(spaceTimeMatches[userVariable]));
				 } else {
				 	spaceTimeMatches[userVariable].push(aVar);
				 	//debug(JSON.stringify(spaceTimeMatches[userVariable]));
				 }
			}
		}
	}
	return spaceTimeMatches;
};

/*This function prepares results for display on the map by relating each result with its geometry (if available).*/
SPEXResultSet.prototype.getWKT = function() {
	var relatedVars = this.relateSpaceTime();
	var solutions = this.allResults.results.bindings;
	var labelWKTpairs = [];
	
/*
	//Find the indices of "geo:asWKT", "wgs84:lat" and "wgs84:long" in FilterExpander.prototype.filterDataProperties array:
	var WKTindex, latIndex, longIndex;
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
*/
	
	for(userVar in relatedVars) {
		for(var i = 0; i < solutions.length; i++) {
			var sol = solutions[i];
			if(sol[userVar]) {
				if(sol[userVar + "_2_1"]) {//_2_1 refers to property "geo:asWKT"
					labelWKTpairs.push([sol[userVar + "__label"].value, sol[userVar + "_2_1"].value]);
				} else if(sol[userVar + "_0_0"] && sol[userVar + "_1_0"]) {//if geo:asWKT is not there, construct WKT point literal
					labelWKTpairs.push(	
						[sol[userVar + "__label"].value, 
						"POINT(" + sol[userVar + "_1_0"].value + " " + sol[userVar + "_0_0"].value + ")"] 
					);
				}
			}
		}
	}
	
/*
	for(userVar in relatedVars) {
		for(var i = 0; i < solutions.length; i++) {
			var sol = solutions[i];
			if(sol[userVar]) {
				if(sol[userVar + WKTindex]) {//_2_1 refers to property "geo:asWKT"
					labelWKTpairs.push([sol[userVar + "__label"].value, sol[userVar + WKTindex].value]);
				} else if(sol[userVar + latIndex] && sol[userVar + longIndex]) {//if geo:asWKT is not there, construct WKT point literal
					labelWKTpairs.push(	
						[sol[userVar + "__label"].value, 
						"POINT(" + sol[userVar + longIndex].value + " " + sol[userVar + latIndex].value + ")"] 
					);
				}
			}
		}
	}
*/
	
	return labelWKTpairs;
};
