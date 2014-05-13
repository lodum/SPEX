/* Constructor function for LabelGenerator objects */
function LabelGenerator() {
	this.listOfLabelProperties = [];														//WHAT EXACTLY IS THIS?
}
LabelGenerator.prototype.getListOfProperties = function() {
	return this.listOfLabelProperties;
};

/*
This function takes a SPAQRL-JSON result set of a SELECT query which has been worked on by
the LabelExpander, then checks for missing labels, and fills them, for ex. by parsing the uri. 
*/
LabelGenerator.prototype.label = function(resultSet) {
	//resultSet.head.originalVars;
	/* Define reference points. */
	var variables = resultSet.getAllResults().head.vars;
	var data = resultSet.getAllResults().results.bindings;
	
	/* Find variables in the result set ending with "__label". */
	for(var i = 0; i < variables.length; i++){
		if(variables[i].substring(variables[i].length - 7, variables[i].length) === "__label"){
			/* Go to the results and check if the label variable is bound for each solution; 
			if not, create binding (new memeber in the solution).
			A variable does not appear in an array element if it is not bound in that particular query solution. */
			for(var j = 0; j < data.length; j++){				
				if(!data[j][variables[i]]){
					data[j][variables[i]] = {"type": "literal", "value": createLabel(data[j][variables[i].substring(0, variables[i].length - 7)])};
				} 
			}
		}
	}
	
	//storeLabels(data);
	return resultSet;
	
	/* Create a label for a variable according to its type. */
	function createLabel(variable) {
		if(variable.type === "uri") {
			//TO BE EDITED: in this case it should be a html link which links to the URI
			// Very simple, only problem: how to handle quotes in strings? e.g. "<a href="">"
			return handleURI(variable.value);
		} else if(variable.type === "literal" || variable.type === "typed-literal") { 													//DO WE NEED THIS?
			return variable.value;
		} else if(variable.type === "bnode"){
			return "Something"; 
		} else {
			return "Blank";
		}
	}

	/* Parse a URI to create a label. */
	function handleURI(uri) {
		var URIEnding = "";
		for(var i = uri.length - 1; i >= 0; i--) {
			if(uri[i] === "#" || uri[i] === "/") {
				URIEnding = uri.substring(i + 1, uri.length);
				break;
			}
		} 
		return URIEnding; 
	} 		
};
