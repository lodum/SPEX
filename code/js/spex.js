/**
* Spex is the spatio-temporal content explorer for SPARQL endpoints. It is part of the development of the LODUM initiative and the LIFE project.	
* This is the central controller class. It initiates every other needed object and holds them together.
* @class
* @property {object}  q  - SPEXQuery() (the current SPEX query manipulated by the user).
* @property {object}  lg  - LabelGenerator().
* @property {object}  rp  - ResultsPane().
* @property {object}  ex  - QueryExecutor().
* @property {object}  sug - Suggester().
* @property {object}  queryPane - The query pane.
* @property {object}  endpoint - The current endpoint.
**/
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
		
		$("#helpDialog").dialog( {
			autoOpen: false,
			height: ($(window).height() * 0.7),
			width: 700,
			reziable: false,
			modal: true,
			dialogClass: 'navDialog'
		});

		$("#img_help").click(this.showhelp);
		$("#img_help").tooltip();

		//$("#showquery").click(this.showquery);

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
	/** 
	* shows the current query
	*@function 	
	*/
	this.showquery = function() {		 
		  document.getElementById("query").innerHTML = spex.q.serialiseQuery();
	};
	/** 
	* shows help
	*@function */
	this.showhelp = function() { 
		  $("#helpDialog").dialog( "open" );
	};

};


// Page loaded - start the magic
$( document ).ready(function() {
	spex.init();
});
