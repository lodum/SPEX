function ResultsPane(){
this.currentresults = new SPEXResultSet(" ");
};
ResultsPane.prototype.constructor = ResultsPane;

ResultsPane.prototype.getcurrentresults = function(){
var res = this.currentresults.getAllResults();
return escape(JSON.stringify(res));
};



ResultsPane.prototype.display = function(spexresultset){
		
		this.currentresults = spexresultset;
		
		var a = document.getElementById("getresults");
		a.download = "export.txt";
		a.href = "data:text/plain," + this.getcurrentresults();
		a.innerHTML = "download results as JSON";
		
		//A function that replaces URIs with HTML links.
		var buildHTML = function(solution, variableName){
	    		var text = solution[variableName].value; //instance URL
	    		console.log("solution[variable] value: " + text);
	    		//console.log("solution[variable__label] value: " + solution[variableName + "__label"].value);
	    		//var exp = /(\b(?:https?|ftp|file):\/\/\bdata.uni-muenster.de[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
	    		//var html = text.replace(exp, "<a href='$1' target=\"_blank\">" + solution[variableName + "__label"].value + "</a>");
	    		//var exp = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
	    		//var html = text.replace(exp, "<a href='$1' target=\"_blank\">" + solution[variableName + "__label"].value + "</a>");
	    		//console.log("html from solution[variable] value: " + html);
	    		
	    		var html = "<a href='" + text + "' target=\"_blank\">" + solution[variableName + "__label"].value + "</a>";
	    		
	    		return html; 
		}
	
		
		/*Write the result set as a table.  Table header lists the user-selected variables; 
		  each row lists labels for instances in that particular solution.*/
				/*Write the result set as a table.  Table header lists the user-selected variables; 
		  each row lists labels for instances in that particular solution.*/
		var resultsTable = document.createElement('table');
		resultsTable.className = "table table-hover table-striped table-condensed";
		
		//create table head and append it to the results table
		var tableHead = document.createElement('thead');
		var headRow = document.createElement('tr');
		var userSelectedVars = spexresultset.getUserSelectedVariables();
		$.each(userSelectedVars, function(varIndex, variable) { 
			var headCell = document.createElement('th');
			headCell.innerHTML = "?" + variable;
			headRow.appendChild(headCell);
		});
		tableHead.appendChild(headRow);
		resultsTable.appendChild(tableHead);

		//body
		var tableBody = document.createElement('tbody');
		$.each(spexresultset.getAllResults().results.bindings, function(solutionIndex, solution) { 
			var bodyRow = document.createElement('tr');
			$.each(userSelectedVars, function(variableIndex, variableName) { 
				if(!solution[variableName + "__label"]) {
					var bodyCell = document.createElement('td');
					bodyCell.innerHTML = "";
					bodyRow.appendChild(bodyCell);
				} else {
					var bodyCell = document.createElement('td');
					
					//create object to store the cell and (if they exist) its corresponding slider item and map item
					var ev = new ResultItemEventHandler(solution[variableName].value, bodyCell);
					if(solution[variableName + '__sliderItemNumber'] !== null) {
						ev.setSliderItem(slider.timeline.getItem(solution[variableName + '__sliderItemNumber']));
					}
					//...do same for map item...
					if(solution[variableName + '__mapLayerNumber'] !== null) {
						var layers = map.markerGroup.getLayers();
						ev.setMapLayer(layers[solution[variableName + '__mapLayerNumber']]);
						//ev.setMapLayer(layers[layers.length - (solution[variableName + '__mapLayerNumber'] + 1)]);
						console.log("map layer" + layers[solution[variableName + '__mapLayerNumber']]);
					}
					//build HTML content for the cell
					bodyCell.innerHTML = buildHTML(solution, variableName);
					
					//attach event listener to the cell
					bodyCell.addEventListener("mouseover", function() {
						ev.highlight();
					}, false); 
					bodyCell.addEventListener("mouseout", function() {
						ev.dehighlight();
					}, false); 
					//attach event listener to correspoding slider item
					/*
					slider.timeline.getItem(solution[variableName + '__sliderItemNumber']).hover(
						function () { ev.highlight(); }, 
					  	function () { ev.dehighlight();	}
					);
					*/
					
					bodyRow.appendChild(bodyCell);
				}
			});
			tableBody.appendChild(bodyRow);
		});
		resultsTable.appendChild(tableBody); 
		document.getElementById('result').innerHTML = "";
		document.getElementById('result').appendChild(resultsTable);
		
/*
		var htmlString = "<table class=\"table table-hover table-striped table-condensed\">";
		//Write table head.
		htmlString += "<thead><tr>";
		var userSelectedVars = spexresultset.getUserSelectedVariables();
		console.log("SPEXVARIABLES: "+spex.q.SPEXvariables);
		$.each(userSelectedVars, function(varIndex, variable) { 
			//Get the original label of the variable in display
			var varlabel = spex.q.variablelabels[spex.q.SPEXvariables.indexOf("?"+variable)];
			console.log("user variable:" + variable + " : " +varlabel);
			htmlString += "<th>?" + varlabel + "</th>";
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
					//htmlString += "<td> <a href="+ buildHTML(solution, variableName) +">"+ solution[variableName + "__label"].value + "</a></td>";
					
					htmlString += "<td >" + buildHTML(solution, variableName) + "</td>";
					//$("#"+solutionIndex).hover(A, B);
				} 
				//console.log(value1[value2].value)
			});
			htmlString += "</tr>";
		});
		//Finish writing table.
		htmlString += "</tbody></table>";
*/	
		/* Display table. */
/*		document.getElementById("result").innerHTML = htmlString;
		
		//Generate event handlers and set onmouseover event firing for each table cell of the table (works only for an existing table, therefore a new iteration is necessary)
		$('#result').each(function(){
			$(this).find('td').each(function(){
				//you can use $(this) to get current cell in the table
				if ($(this).find('a')) {
					var ev = new ResultItemEventHandler($(this).find('a').attr('href'),$(this), "t", "s");
					$(this).hover(
					  function () {
						ev.highlight();								
					  }, 
					  function () {
						ev.dehighlight();					  
					  }
					);
				}
			})
		});
*/
		
};
	
		
        
