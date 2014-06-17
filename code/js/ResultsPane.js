function ResultsPane(){}
ResultsPane.prototype.constructor = ResultsPane;

ResultsPane.prototype.display = function(spexresultset){
		
		/*
		//A function that replaces URIs with HTML links.
		var replaceURLWithHTMLLinks = function(text){
	    	var exp = /(\b(https?|ftp|file):\/\/\b(data.uni-muenster.de)[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
	    	return text.replace(exp, "<a href='$1' target=\"_blank\">$1</a>"); 
		}
		*/
		
		var buildHTML = function(solution, variableName){
	    	var text = solution[variableName].value; //instance URL
	    	var exp = /(\b(https?|ftp|file):\/\/\b(data.uni-muenster.de)[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
	    	return text.replace(exp, "<a href='$1' target=\"_blank\">" + solution[variableName + "__label"].value + "</a>"); 
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
					htmlString += "<td>"+ buildHTML(solution, variableName) + "</td>";
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
	
		
        
