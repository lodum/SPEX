function SPEXResultSet(json) {
	this.allResults = json;
	this.labeledResults = [];
}


//SPEXResultSet.prototype = new ResultSet();
//SPEXResultSet.prototype.constructor = SPEXResultSet;

/* Function to return JSON as returned from endpoint. */
SPEXResultSet.prototype.getAllResults = function() {
	return this.allResults;
};

/*Function to add new solution into result set. */
SPEXResultSet.prototype.addNewResult = function(resultObject) { //is this what it's meant to do?
	this.allResults.results.bindings.push(resultObject);
}; 

/* Function to extract instance-label pairs from JSON result and store them as array of objects, for use in displaying results. */
SPEXResultSet.prototype.storeLabeledResults = function() {
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
