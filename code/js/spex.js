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
			.where("?a", "rdf:type", "dbp-ont:building" )			
			.SPEXvariable("?a");
			//.where("foaf:homepage", "?page");

	};

};


// Page loaded - start the magic
$( document ).ready(function() {
	spex.init();
});
