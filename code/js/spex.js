var spex = new function(){

	this.q = new SPEXQuery();

	this.lg = new LabelGenerator();
	this.rp = new ResultsPane();
	
	this.ex = new QueryExecutor();
	// Initialization
	this.init = function() {
	
		$("#showquery").click(this.showquery);
		queryPane.init();

		map.init();
		slider.init();
		
		testing.init();

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
			

	};
	
	this.showquery = function() {		 
		  document.getElementById("query").innerHTML = spex.q.getSPARQL();		 
	};

};


// Page loaded - start the magic
$( document ).ready(function() {
	spex.init();
});
