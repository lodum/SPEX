function ResultsPane(){}
ResultsPane.prototype.constructor = ResultsPane;

ResultsPane.prototype.display = function(spexresultset){
		

		//A function that replaces URIs with HTML links.
		var buildHTML = function(solution, variableName){
	    		var text = solution[variableName].value; //instance URL
	    		console.log("solution[variable] value: " + text);
	    		console.log("solution[variable__label] value: " + solution[variableName + "__label"].value);
	    		var exp = /(\b(?:https?|ftp|file):\/\/\bdata.uni-muenster.de[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
	    		//var exp = /(\b(?:https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*)/ig;
	    		var html = text.replace(exp, "<a href='$1' target=\"_blank\">" + solution[variableName + "__label"].value + "</a>");
	    		console.log("html from solution[variable] value: " + html);
	    		return html; 
		}
	
		/*Write the result set as a table.  Table header lists the user-selected variables; 
		  each row lists labels for instances in that particular solution.*/
		var htmlString = "<table class=\"table table-hover table-striped table-condensed\">";
		//Write table head.
		htmlString += "<thead><tr>";
		var userSelectedVars = spexresultset.getUserSelectedVariables();
		$.each(userSelectedVars, function(varIndex, variable) { 
			htmlString += "<th>?" + variable + "</th>";
		});
		htmlString+="</tr></thead><tbody>";
		//Write table body.
		$.each(spexresultset.getAllResults().results.bindings, function(solutionIndex, solution) { 
			htmlString+="<tr>";
			$.each(userSelectedVars, function(variableIndex, variableName) { 
				if(!solution[variableName + "__label"]) {
					htmlString += "<td></td>";
				} else {
					//htmlString += "<td>"+ solution[variableName + "__label"].value + "</td>";
					//htmlString += "<td>"+ buildHTML(solution, variableName) + "</td>";
					//console.log("URI: " + encodeURI(buildHTML(solution, variableName)));
					htmlString += "<td> <a href="+ buildHTML(solution, variableName) +">"+ solution[variableName + "__label"].value + "</a></td>";
					//htmlString += "<td> " + buildHTML(solution, variableName) + "</td>";
				} 
				//console.log(value1[value2].value)
			});
			htmlString += "</tr>";
		});
		//Finish writing table.
		htmlString += "</tbody></table>";
		
		/* Display table. */
		document.getElementById("result").innerHTML = htmlString;
}	
	
		
        
