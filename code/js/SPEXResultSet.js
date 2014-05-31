function SPEXResultSet(json) {
	this.allResults = json;
	this.labeledResults = [];
	this.userSelectedVariables = (function(){
		var variables = [];
		for(i = 0; i < this.allResults.head.vars.length; i++) {
			if(allResults.head.vars[i].substring(variables[i].length - 7, variables[i].length) !== "__label") {
				variables.push(allResults.head.vars[i]);
			}
		}
		return variables;
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
	this.prepareResultsForDisplay();
}; 

/* Function to extract instance-label pairs from JSON result that has been worked on by LabelGenerator,
   and store the pairs as array of objects, for use in displaying results. */
SPEXResultSet.prototype.prepareResultsForDisplay = function() {
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
