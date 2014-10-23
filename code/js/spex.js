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
		$("#img_undo").click(this.undo);
		$("#img_undo").tooltip();
		

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
	/** 
	* undoes the last query construction step
	*@function */
	this.undo = function() { 		  
		  if (queryPane.last_qp != null && queryPane.last_qp.nodes.length !=0) {			  
			  queryPane.vis.remove();			  
			  //console.log(" links: "+queryPane.links.length);
			  //console.log(" nodes: "+queryPane.nodes.length); 			  
			  queryPane = queryPane.last_qp;	
			  //console.log(" old links: "+queryPane.links.length);
			  //console.log(" old nodes: "+queryPane.nodes.length);			
			  queryPane.force.start();			  
			  queryPane.init();
			  //console.log(" old links: "+queryPane.links.length);
			  //console.log(" old nodes: "+queryPane.nodes.length);			  
			  		   
		  }		  
	};
	
	//some general recursive clone method (used for undo method)
	this.clone = function(obj) {
			var copy;

			// Handle the 3 simple types, and null or undefined
			if (null == obj || "object" != typeof obj) return obj;

			// Handle Date
			if (obj instanceof Date) {
				copy = new Date();
				copy.setTime(obj.getTime());
				return copy;
			}

			// Handle Array
			if (obj instanceof Array) {
				copy = [];
				for (var i = 0, len = obj.length; i < len; i++) {
					copy[i] = this.clone(obj[i]);
				}
				return copy;
			}

			// Handle Object
			if (obj instanceof Object) {
				copy = {};
				for (var attr in obj) {
					if (obj.hasOwnProperty(attr)) copy[attr] = this.clone(obj[attr]);
				}
				return copy;
			}

    throw new Error("Unable to copy obj! Its type isn't supported.");
	};
	

};


// Page loaded - start the magic
$( document ).ready(function() {
	spex.init();
});
