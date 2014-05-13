var spex = new function(){

	this.q = new SPEXQuery();

	this.lg = new LabelGenerator();
	this.rp = new ResultsPane();
	this.ex = new QueryExecutor(this.lg,this.rp);

	// Initialization
	this.init = function() {
		
		map.init();
		slider.init();
		
		testing.init();

		this.q.select("?a", "?b")
			.where("?a", "rdf:type", "foaf:Person" );
			.where("?b", "foaf:name", "?name");
			//.where("foaf:homepage", "?page");

	};

};


// Page loaded - start the magic
$( document ).ready(function() {
	spex.init();
});