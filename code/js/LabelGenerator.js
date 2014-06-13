/* Constructor function for LabelGenerator objects */
function LabelGenerator() {}

/* This function takes a SPARQL JSON result set, checks for missing labels, and fills them in. */
LabelGenerator.prototype.label = function(resultSet) {
	
	/* Define reference points. */
	var variables = resultSet.getAllResults().head.vars; 
	var solutions = resultSet.getAllResults().results.bindings;
	
	for(var i = 0; i < variables.length; i++){
		var v = variables[i];
		/*Check if the variable is a __label variable. */
		if(v.substring(v.length - 7, v.length) === "__label"){
			/*For each solution, check if the __label variable is bound that solution; 
			if not, create a binding (i.e. add a member corresponding to the __label variable to the solution object).
			(A variable does not appear in a solution object if it is not bound in that particular query solution.) */
			for(var j = 0; j < solutions.length; j++){				
				var sol = solutions[j];
				if(!sol[v]){
					if(sol[v.substring(0, v.length - 7)]) {
						sol[v] = {"type": "literal", "value": createLabel(sol[v.substring(0, v.length - 7)])};
					}
				} 
			}
		}
	}
	
	return resultSet;
	
	/* Function to create a label for a variable according to its type. */
	function createLabel(variable) {
		if(variable.type === "uri") {
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
