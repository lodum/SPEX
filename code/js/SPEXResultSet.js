function SPEXResultSet(json) {
	this.allResults = json;
	this.displayResults = this.prepareresultstodisplay(json);
}

//Generates a second json object for display containing only user selected variables of the query (spex.q.SPEXvariables)
SPEXResultSet.prototype.prepareresultstodisplay = function(json) {
var displayjson = JSON.parse(JSON.stringify(json));
	$.each(displayjson.head.vars, function(index2, value2) { 
		if( 
		spex.q.SPEXvariables.indexOf('?'+value2)==-1 && value2!=undefined 
		){ 						
					delete displayjson.head.vars[index2];
		}else{};						
	});			
return  displayjson;
}


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
