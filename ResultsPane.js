function ResultsPane(){}
ResultsPane.prototype.constructor = ResultsPane;

ResultsPane.prototype.display = function(json){
		//a function that replaces URIs with Html links
		var replaceURLWithHTMLLinks = function(text){
	    var exp = /(\b(https?|ftp|file):\/\/\b(data.uni-muenster.de)[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
	    return text.replace(exp,"<a href='$1' target=\"_blank\">$1</a>"); 
		}
	
		//Converts JSON object into table and displays it
		var htmlString="<table class=\"table table-hover table-striped table-condensed\">";
		//write table head
		htmlString+="<thead><tr>";
			$.each(json.head.vars, function(index2, value2) { 
				htmlString+="<th>?"+value2+"</th>";
			 });
		htmlString+="</tr></thead><tbody>";
		//write table body
		$.each(json.results.bindings, function(index1, value1) { 
			htmlString+="<tr>";
			$.each(json.head.vars, function(index2, value2) { 
				if(value1[value2]!=undefined){
					htmlString+="<td>"+ replaceURLWithHTMLLinks(value1[value2].value)+"</td>";
				}else{
					htmlString+="<td></td>";
				}
				//console.log(value1[value2].value)
			 });
			htmlString+="</tr>";
		});

		htmlString+="</tbody></table>";
		
		document.getElementById("result").innerHTML = htmlString;
		
		
	}	
	
		
        
