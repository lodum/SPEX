var spex = new function(){

	this.q = new SPEXQuery();

	this.lg = new LabelGenerator();
	this.rp = new ResultsPane();
	
	this.ex = new QueryExecutor();
	this.sug = new Suggester();
	// Initialization
	
	var endpoint = null;
	
	this.queryEndpoint = function(){
		console.log("Fetching endpoint!!");
		return document.getElementById("endpoint").value;
	};
	
	this.endpointChanged = function(){
		if(endpoint == this.queryEndpoint()) return false;
		else{
			endpoint = this.queryEndpoint();
			return true;
		}
	};
	
	this.init = function() {
		
		endpoint = document.getElementById("endpoint").value;
	
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
	};
	
	this.showquery = function() {		 
		  document.getElementById("query").innerHTML = spex.q.serialiseQuery();		 
	};

};


// Page loaded - start the magic
$( document ).ready(function() {
	spex.init();
});
