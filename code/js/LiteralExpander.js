/* Constructor function for LabelExpander objects */
function LiteralExpander() {
	this.listOfFilterLiteralTypes  = "";
	this.listOfLabelProperties = "";	
}


LiteralExpander.prototype.expandLabels = function(query) { 
	//See if query has any variables in SELECT statement; if not, parse serialized query for all variables.
	if(query.variables.length !== 0) {
		return labelExpander(query);
	} else {	
		var queryAsString = query.serialiseQuery();
		var pattern = /(?:\?|\$)[^ |^.|^)]*/g;  												//ADD [^}] ?
		var variableList = queryAsString.match(pattern);
		reduce(variableList);
		return labelExpander(query, variableList);		
	}
	
	function labelExpander(query, list){
		//If list argument is not provided (query asks for specific variables to be returned), 
		//add corresponding label variables to query.variables; otherwise leave query.variables = []
		
		//check if there are original __label variables!

		if(!list) {
			for (var k = 0; k < query.variables.length; k++) {
				query.variables.push(query.variables[k] + "__label");
			}
			var variableList = query.variables;
		} else {
			var variableList = list;
		}
		
		//Add "optional" graph patterns inside query's "where"-statement.
		for (var k = 0; k < variableList.length; k++){
			//Syntax of the predicate: see "http://www.w3.org/TR/sparql11-query/#propertypath-examples".
			//Multiple results for label should be handled!!
			query.optional().where(variableList[k], "rdfs:label|dct:title|dc:title|foaf:name", variableList[k] + "__label");
		}
		
		return query;
	};

	//Function to remove duplicates in the array of SPARQL-variables.
	function reduce(list) {
		for(var i = 0; i < list.length; i++){
			for(var j = i + 1; j < list.length; j++){
				//if-statement doesn't look at first character, it could be "$" or "?".
				if(list[i].substring(1, list[i].length) === list[j].substring(1, list[j].length)){
					list.splice(j, 1);
					j--;
				}
			}
		}
	};
	
};

LiteralExpander.prototype.expandFilterLiterals = function(query) {};
