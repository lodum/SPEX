/* Constructor function for LiteralExpander objects. */
function LiteralExpander() {
	this.listOfFilterLiteralTypes  = "";
	this.listOfLabelProperties = [];	
}

/* Function to add triples to retrieve labels for SELECT statement variables. */
LiteralExpander.prototype.expandLabels = function(query) {  
	//See if preliminary query has any variables in SELECT statement; if not, parse serialized query for all variables.
	if(query.variables.length !== 0) {
		return labelExpander(query);
	} else {	
		var queryAsString = query.serialiseQuery();
		var pattern = /(?:\?|\$)[^ |^.|^)]*/g;  												//ADD [^}] ?
		var variableList = queryAsString.match(pattern);
		reduce(variableList);
		return labelExpander(query, variableList);		
	}
	
	function labelExpander(query, variableList){
		//Check if there are original __label variables!!
		
		if(!variableList) {
			var variableList = query.variables;
		}

		//Construct string to use as predicate of triples that ask for labels.
		var labelPredicate = "";
		for(var i = 0; i < this.listOfLabelProperties.length; i++) {
			if(i === this.listOfLabelProperties.length - 1) {
				labelPredicate += this.listOfLabelProperties[i];
			} else {
				labelPredicate += this.listOfLabelProperties[i] + "|";
			}
		}
		
		//Add OPTIONAL triple patterns inside query's WHERE statement.
		for (var k = 0; k < variableList.length; k++){
			//Syntax of the predicate: see "http://www.w3.org/TR/sparql11-query/#propertypath-examples".
			//Multiple results for label should be handled!!
			query.optional().where(variableList[k], labelPredicate, variableList[k] + "__label");
		}
		
		//If query's SELECT statement is not empty (i.e. query.variables is not empty array), 
		//add corresponding label variables to query.variables, to use for display of query results.
		if(query.variables.length !== 0) {
			for (var k = 0; k < query.variables.length; k++) {
				query.variables.push(query.variables[k] + "__label");
			}
		}
		
		return query;
	}

	//Function to remove duplicates in the array of SPARQL variables.
	function reduce(list) {
		for(var i = 0; i < list.length; i++){
			for(var j = i + 1; j < list.length; j++){
				//IF statement doesn't look at first character, it could be "$" or "?".
				if(list[i].substring(1, list[i].length) === list[j].substring(1, list[j].length)){
					list.splice(j, 1);
					j--;
				}
			}
		}
	}
	
};

LiteralExpander.prototype.expandFilterLiterals = function(query) {};

LiteralExpander.prototype.addLabelProperty = function(property) {
	this.listOfLabelProperties.push(property);
};
