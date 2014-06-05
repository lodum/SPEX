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
			.where("?a", "rdf:type", "foaf:Person" )
			.where("?b", "foaf:name", "?name")
			.SPEXvariable("?a").SPEXvariable("?b");
			//.where("foaf:homepage", "?page");

	};

};


// Page loaded - start the magic
$( document ).ready(function() {
	spex.init();
});