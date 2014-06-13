/* Constructor function for LabelGenerator objects */
function LabelGenerator() {}

/* This function takes a SPARQL JSON result set, checks for missing labels, and fills them in. */
LabelGenerator.prototype.label = function(resultSet) {
	
	/* Define reference points. */
	var variables = resultSet.getAllResults().head.vars;
	var data = resultSet.getAllResults().results.bindings;
	
	/* Find result set variables ending with "__label". */
	for(var i = 0; i < variables.length; i++){
		if(variables[i].substring(variables[i].length - 7, variables[i].length) === "__label"){
			/* Check if the __label variable is bound for each solution; 
			if not, create binding (i.e. add new memeber in the solution).
			A variable does not appear in the solutions array's element if it is not bound in that particular query solution. */
			for(var j = 0; j < data.length; j++){				
				if(!data[j][variables[i]]){
					data[j][variables[i]] = {"type": "literal", "value": createLabel(data[j][variables[i].substring(0, variables[i].length - 7)])};
				} 
			}
		}
	}
	
	return resultSet;
	
	/* Function to create a label for a variable according to its type. */
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

	/* Function to parse a URI to create a label. */
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
