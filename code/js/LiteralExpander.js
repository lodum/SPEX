/* Constructor function for LiteralExpander objects. */
function LiteralExpander() {
	this.listOfLabelProperties = ["rdfs:label", "dct:title", "dc:title", "foaf:name"];	
}

/* Function to add triples to retrieve labels for user-selected query variables. */
LiteralExpander.prototype.expandLabels = function(spexquery) {  
		//Check if there are original __label variables!!

		//Construct string to use as predicate of triples that ask for labels.
		var labelPredicate = "";
		for(var i = 0; i < this.listOfLabelProperties.length; i++) {
			if(i === this.listOfLabelProperties.length - 1) {
				labelPredicate += this.listOfLabelProperties[i];
			} else {
				labelPredicate += this.listOfLabelProperties[i] + "|";
			}
		}
		
		//Add OPTIONAL triple patterns to query, asking for labels of user-selected query variables.
		for (var k = 0; k < spexquery.SPEXvariables.length; k++){
			//Syntax of the predicate: see "http://www.w3.org/TR/sparql11-query/#propertypath-examples".
			//Multiple results for label should be handled!!
			spexquery.optional().where(spexquery.SPEXvariables[k], labelPredicate, spexquery.SPEXvariables[k] + "__label");
		}
		
		return spexquery;

};

LiteralExpander.prototype.addLabelProperty = function(property) {
	this.listOfLabelProperties.push(property);
};

