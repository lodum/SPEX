var spex = new function(){

	this.q = new SPEXQuery();

	this.lg = new LabelGenerator();
	this.rp = new ResultsPane();
	this.ex = new QueryExecutor(this.lg,this.rp);

	// Initialization
	this.init = function() {
		console.log("lg = " + this.lg);
		console.log("rp = " + this.rp);
		queryPane.init();

		map.init();
		slider.init();
		
		testing.init();

		this.q.select()
			.where("?a", "rdf:type", "dbp-ont:building" )
			.where("foaf:name", "?name")
			.SPEXvariable("?a");
			//.where("foaf:homepage", "?page");

	};

};


// Page loaded - start the magic
$( document ).ready(function() {
	spex.init();
});
