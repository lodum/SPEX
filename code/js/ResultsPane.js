
/**
* A results pane that displays the result set in terms of a table
* @class
*  @property {object} currentresults - holds the current result set
**/
function ResultsPane(){
this.currentresults = new SPEXResultSet(" ");
this.enabled = true; //This disables results highlighting
};
ResultsPane.prototype.constructor = ResultsPane;

/** @function */
ResultsPane.prototype.getcurrentresults = function(){
var res = this.currentresults.getAllResults();
return escape(JSON.stringify(res));
};


/** 
* displays a spex result set in the results pane
*@function 
*/


ResultsPane.prototype.display = function(spexresultset){
		
		this.currentresults = spexresultset;
		
		var a = document.getElementById("getresults");
		a.download = "export.txt";
		a.href = "data:text/plain," + this.getcurrentresults();
		a.innerHTML = "download results as JSON";
		var b = document.getElementById("resultsnumber");
		var numberofresults = 0;
		
		//A function that replaces URIs with HTML links.
		var buildHTML = function(solution, variableName){
	    		var text = solution[variableName].value; //instance URL
	    		//console.log("solution[variable] value: " + text);
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
		//resultsTable.id = "table";
		resultsTable.className = "table table-hover table-striped table-condensed";
		//resultsTable.width = "100%";
		//create table head and append it to the results table
		//var tableHeadDiv = document.createElement('div');
		//tableHeadDiv.id = "result_header";
		var tableHead = document.createElement('thead');
		//tableHead.id = "result_header";
		//tableHead.width = "100%";
		var headRow = document.createElement('tr');
		//headRow.width = "100%";
		var userSelectedVars = spexresultset.getUserSelectedVariables();
		$.each(userSelectedVars, function(varIndex, variable) { 
			var headCell = document.createElement('th');						
			//display labels instead of variable names if there are labels for them. Otherwise display variable names
			var varlabel = spex.q.variablelabels[spex.q.SPEXvariables.indexOf("?"+variable)];
			if (!varlabel || 0 === variable.length) { headCell.innerHTML = "?"+variable} else {headCell.innerHTML = "?"+varlabel;}
			//console.log("user variable:" + variable + " : " +varlabel);
			headRow.appendChild(headCell);
		});
		tableHead.appendChild(headRow);
		//tableHeadDiv.appendChild(tableHead);
		//resultsTable.appendChild(tableHeadDiv);
		resultsTable.appendChild(tableHead);

		//body
		//var tableBodyDiv = document.createElement('div');
		//tableBodyDiv.id = "result_body";
		var tableBody = document.createElement('tbody');
		//tableBody.class = "body";
		$.each(spexresultset.getAllResults().results.bindings, function(solutionIndex, solution) { 
			numberofresults ++;
			var bodyRow = document.createElement('tr');
			//bodyRow.id = "body tr";
			$.each(userSelectedVars, function(variableIndex, variableName) { 
				var bodyCell = document.createElement('td');
				
				//create object to store the cell and (if they exist) its corresponding slider item and map item
				var ev = new ResultItemEventHandler(bodyCell);
				
				if(solution[variableName + '__sliderItemNumber']) {
					var item = slider.timeline.items[solution[variableName + '__sliderItemNumber']];						
					ev.setSliderItem(item,solution[variableName + "__label"].value);
				}//else if(solution[variableName + '__sliderItemNumber'] === 0) {
				//	ev.setSliderItem(slider.timeline.items[solution[variableName + '__sliderItemNumber']], solution[variableName + "__label"].value);
				//}
				//...do same for map item...
				if(solution[variableName + '__mapLayerNumber'] !== null) {
					var layers = map.markerGroup.getLayers();
					ev.setMapLayer(layers[solution[variableName + '__mapLayerNumber']]);
					//ev.setMapLayer(layers[layers.length - (solution[variableName + '__mapLayerNumber'] + 1)]);
					//console.log("map layer" + layers[solution[variableName + '__mapLayerNumber']]);
				}
				
				
				//attach event listener to the cell
				var highl = function() {
					ev.highlight();
				};
				var dehighl =  function() {
					ev.dehighlight();
				};
				bodyCell.addEventListener("mouseover", highl, true); 
				bodyCell.addEventListener("mouseout", dehighl , true); 
				bodyCell.addEventListener("click", function() {			
					//console.log("spex.rp.enabled" + spex.rp.enabled);
					spex.rp.enabled = false;	
				}, true);
				bodyCell.addEventListener("dblclick", function() {
					//console.log("spex.rp.enabled" + spex.rp.enabled);
					spex.rp.enabled = true;													
				}, true);
				
				if(!solution[variableName + "__label"]) {					
					//bodyCell.id = "body td";
					bodyCell.innerHTML = "";
					
				} else {					
					//build HTML content for the cell
					bodyCell.innerHTML = buildHTML(solution, variableName);
				}	
					
				bodyRow.appendChild(bodyCell);
				
			});
			tableBody.appendChild(bodyRow);
		});
		b.innerHTML = numberofresults;
		resultsTable.appendChild(tableBody); 		
		document.getElementById('result').appendChild(resultsTable);
		fixHeader();

		/*This function creates a div element (headerDiv) into which it copies the first (i.e. header) row
		of the original table.  It then dimensions this div dynamically to correspond to the dimensions of the original
		table header, and positions the div as fixed so that it overlays the header of the original table. */
		function fixHeader() {
			var headerDiv = document.createElement('div');
			var table2 = document.createElement('table');
			var table2Header = document.createElement('thead');
			var table2HeaderRow = resultsTable.rows[0].cloneNode(true);			

			for(var i = 0; i < table2HeaderRow.cells.length; i++) {
				table2HeaderRow.cells[i].style.width = resultsTable.rows[0].cells[i].offsetWidth + "px";
				table2HeaderRow.cells[i].style.height = resultsTable.rows[0].cells[i].offsetHeight + "px";
			}
			
			table2Header.appendChild(table2HeaderRow);
			table2.appendChild(table2Header);
			headerDiv.appendChild(table2);

			//headerDiv.style.overflow = "hidden";
			headerDiv.style.position = "fixed";	
			headerDiv.style.bottom = (180 - 20 - resultsTable.rows[0].offsetHeight) + "px";
			headerDiv.style.left = "0px";
			headerDiv.style.width = resultsTable.offsetWidth + "px";
			headerDiv.style.height = resultsTable.rows[0].offsetHeight + "px";
			headerDiv.style.marginTop = "0px";
			headerDiv.style.backgroundColor = "lightgray";
			//set back map to bounds if hovering over table column
			var settobounds = function() {					
					map.LMap.fitBounds(map.markerGroup.getBounds());
			}			
			headerDiv.addEventListener("mouseover", settobounds, true);
			resultsTable.parentNode.insertBefore(headerDiv, resultsTable);
		}
		

		
};


	
		
        
