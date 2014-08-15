var spex = new function(){

	this.q = new SPEXQuery();

	this.lg = new LabelGenerator();
	this.rp = new ResultsPane();
	
	this.ex = new QueryExecutor();
	this.sug = new Suggester();
	// Initialization
	this.init = function() {
	
		$("#showquery").click(this.showquery);
		queryPane.init();

		this.sug.init();

		map.init();
		slider.init();
		//slider.drawVisualization();
		
		//testing.init();
		

		this.q.select()
			//.where("?a", "rdf:type", "dbp-ont:building" )	
			//.where("?a", "rdf:type", "maps:Map" )
			//.where("?a", "maps:title", "?b" )
			//.where("?c", "<http://vocab.lodum.de/helper/building>", "?a" )
			//.where("?a", "rdf:type", "foaf:Organisation" )
			//?a a dbp-ont:building . ?c <http://vocab.lodum.de/helper/building> ?a. 
			//.where("?a", "rdf:type", "bibo:map" )	
			//.where("?a","foaf:homepage", "?page")
			//.SPEXvariable("?a")//.SPEXvariable("?b")
			//;
			//.SPEXvariable("?c");
			
	Date.prototype.xsdDateTime = function() {
		var yyyy = this.getFullYear().toString();
		var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
		var dd = this.getDate().toString();
		var hh = this.getHours().toString();
		var min = this.getMinutes().toString();
		var sec = this.getSeconds().toString();
		return yyyy + '-' + (mm[1]?mm:"0"+mm[0]) + '-' + (dd[1]?dd:"0"+dd[0]) + 'T' + (hh[1]?hh:"0"+hh[0]) + ':' + (min[1]?min:"0"+min[0]) + ':' + (sec[1]?sec:"0"+sec[0]); // padding
	};
	};
	
	this.showquery = function() {		 
		  document.getElementById("query").innerHTML = spex.q.getSPARQL();		 
	};

};


// Page loaded - start the magic
$( document ).ready(function() {
	spex.init();
});
