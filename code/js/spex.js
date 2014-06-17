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

		this.q.select().distinct()	
			.where("?a", "rdf:type", "dbp-ont:building" )	
			//.where("?c", "<http://vocab.lodum.de/helper/building>", "?a" )
			//.where("?b", "rdf:type", "foaf:Organisation" )
			//?a a dbp-ont:building . ?c <http://vocab.lodum.de/helper/building> ?a. 
			//.where("?a", "rdf:type", "bibo:map" )	
			.SPEXvariable("?a");
			//.SPEXvariable("?c");
			//.where("foaf:homepage", "?page");

	};

};


// Page loaded - start the magic
$( document ).ready(function() {
	spex.init();
});
