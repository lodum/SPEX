var spex = new function(){

	this.q = new SPEXQuery();

	this.lg = new LabelGenerator();
	this.rp = new ResultsPane();
	this.ex = new QueryExecutor(this.lg,this.rp);

	// Initialization
	this.init = function() {

		queryPane.init();

		map.init();
		slider.init();
		
		testing.init();

		this.q.select()
			//.where("?a", "rdf:type", "dbp-ont:building" )	
			.where("?a", "rdf:type", "maps:Map" )
			//.where("?a", "maps:title", "?b" )
			//.where("?c", "<http://vocab.lodum.de/helper/building>", "?a" )
			//.where("?a", "rdf:type", "foaf:Organisation" )
			//?a a dbp-ont:building . ?c <http://vocab.lodum.de/helper/building> ?a. 
			//.where("?a", "rdf:type", "bibo:map" )	
			//.where("?a","foaf:homepage", "?page")
			.SPEXvariable("?a")//.SPEXvariable("?b")
			;
			//.SPEXvariable("?c");
			

	};

};


// Page loaded - start the magic
$( document ).ready(function() {
	spex.init();
});
