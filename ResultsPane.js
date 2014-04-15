function ResultsPane(){}
ResultsPane.prototype.constructor = ResultsPane;
ResultsPane.prototype.display = function(json){
		var html = "<table border='1'>";
		html +="<tr>";
		for (var x in json.head.vars) {		
		html +="<td>" +json.head.vars[x]+ "</td>";
		}
		html += "</tr>";
        for (var b in json.results.bindings) {
            html += "<tr>";
            for (var x in json.head.vars) {
                var value = json.results.bindings[b][json.head.vars[x]];
                if (value.type == "uri")
                    html += "<td><a href='"+value.value+"'>" + value.value + "</a></td>";
                else
                    html += "<td>" + value.value + "</td>";
            }
            html += "</tr>";
        }
        html += "</table>";
        document.getElementById("result").innerHTML = html;
}