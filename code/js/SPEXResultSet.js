function SPEXResultSet(json) {
	this.allResults = json;
	this.labeledResults = [];
}


//SPEXResultSet.prototype = new ResultSet();
SPEXResultSet.prototype.constructor = SPEXResultSet;
SPEXResultSet.prototype.getAllResults = function() {
	return this.allResults;
};
SPEXResultSet.prototype.addNewResult = function(resultObject) { //is this what it's meant to do?
	this.allResults.results.bindings.push(resultObject);
}; 
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
