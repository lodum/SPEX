function SPEXResultSet(json) {
	this.allResults = json;
	this.labeledResults = [];
	
	/*Since only variables originally selected by the user got a "__label" ending by LiteralExpander and LabelGenerator,
	we can identify and retrieve them by cutting off the ending. */
	this.userSelectedVariables = (function(){
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
	})();
}


//SPEXResultSet.prototype = new ResultSet();
//SPEXResultSet.prototype.constructor = SPEXResultSet;

/* Function to return JSON as returned from endpoint. */
SPEXResultSet.prototype.getAllResults = function() {
	return this.allResults;
};

/* Function to return properly labeled results ready for display. */
SPEXResultSet.prototype.getResultsForDisplay = function() {
	return this.labeledResults;
};


/*Function to add new solution into result set. */
SPEXResultSet.prototype.addNewResult = function(resultObject) { //is this what it's meant to do?
	this.allResults.results.bindings.push(resultObject);
	//If a new solution has been added, we have to reformat the labeledResults attribute.
	this.prepareForDisplay();
}; 

/* Function to extract instance-label pairs from JSON result that has been worked on by LabelGenerator,
   and store the pairs as array of objects, for use in displaying results. */
SPEXResultSet.prototype.prepareForDisplay = function() {
	var solutions = this.allResults.results.bindings;
	for(var i = 0; i < solutions.length; i++) {
		for(variableName in solutions[i]) {
			if(variableName.substring(variableName.length - 7, variableName.length) === "__label") {
				this.labeledResults.push({ 
					"instance": solutions[i][variableName.substring(0, variableName.length - 7)].value, 
					"label": solutions[i][variableName].value
				}); 
			}
		}
	}
};
