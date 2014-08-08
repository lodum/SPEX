
/**
Executes a SPEX query via http post and calls a callback function which turns results into a JSON object (sparql-results+json) and displays it in the registered resultspane.
**/
function QueryExecutor(){ 
	this.spatiallyEnabledVars = null;
	this.temporallyEnabledVars = null;
} 
QueryExecutor.prototype.constructor = QueryExecutor;



QueryExecutor.prototype.executeQuery = function(spexquery, endpoint) {
	//Test whether endpoint is non empty:
	if (endpoint == '' || endpoint == null) {
		alert('Enter an endpoint URI!');
		return;
	}
	document.getElementById("result").innerHTML = "Waiting for results...";
	//this.sparqlQueryJson(spexquery.getSPARQL(), endpoint, this.callback, spexquery.timeout, false);
	this.sparqlQueryJson(spexquery.getSPARQL(), endpoint, spexquery.timeout, false);	
}

/*
QueryExecutor.prototype.callback = function(str){
  	var jsonObj = eval('(' + str + ')');
  	//Create a SPEXResultSet object, fill in any missing labels, and store the object in the variable results.
  	var results = spex.lg.label(new SPEXResultSet(jsonObj));
  
  	//Detect spatially and temporally enabled variables and pass them on to the query pane.
  	console.log("detected spatial vars: " + JSON.stringify(results.detectSpatiallyEnabledVars()));
  	this.spatiallyEnabledVars = results.detectSpatiallyEnabledVars();
  	//spex.ex.spatiallyEnabledVars = results.detectSpatiallyEnabledVars();
  	console.log("this's spatial vars: " + JSON.stringify(this.spatiallyEnabledVars));
  	//console.log("spex.ex's spatial vars: " + JSON.stringify(spex.ex.spatiallyEnabledVars));
  	this.temporallyEnabledVars = results.detectTemporallyEnabledVars();
  	queryPane.setSpatialVars(this.spatiallyEnabledVars);
  	queryPane.setTemporalVars(this.temporallyEnabledVars);
  
  	//Filter WKT results (if any are there) 
  	FilterResults.prototype.filterWKT(results);
  
  	//Display result geometries on the map.
  	var spacePane = new SpaceFilterPane();
  	spacePane.displayGeometry(results);
  
  	spex.rp.display(results);
}
*/

//QueryExecutor.prototype.sparqlQueryJson = function(queryStr, endpoint, callback, timeout, isDebug) {
QueryExecutor.prototype.sparqlQueryJson = function(queryStr, endpoint, timeout, isDebug) {
      	var querypart = "query=" + escape(queryStr);
      	//console.log('Endpoint: '+ endpoint);
      
	// Function for creating xmlhttp  object depending on browser.
	function createCORSRequest(method, url) {
		var xmlhttp = new XMLHttpRequest();
		if ("withCredentials" in xmlhttp) {
			// xmlhttp for Chrome/Firefox/Opera/Safari.
			xmlhttp.open(method, url, true);
		} else if (typeof XDomainRequest != "undefined") {
			// XDomainRequest for IE.
			xmlhttp = new XDomainRequest();
			xmlhttp.open(method, url);
		} else {
			// CORS not supported.
			xmlhttp = null;
		}
		return xmlhttp;
	}
	
	// Get our HTTP request object.	 
      	var xmlhttp = createCORSRequest('POST', endpoint); 
	if (!xmlhttp) {
		alert('CORS not supported');
		return;
	}
	
     	// Set up a POST with JSON result format.
     	//xmlhttp.open('POST', endpoint, true); // GET can have caching probs, so POST
     	xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
     	xmlhttp.setRequestHeader("Accept", "application/sparql-results+json");	 
	xmlhttp.timeout = timeout;
	xmlhttp.ontimeout = function () { alert("Timeout: the endpoint is not responding!"); }
	xmlhttp.onerror = function() {
		alert('Woops, there was an error making the request.');
	};

     	// Set up callback to get the response asynchronously.
     	xmlhttp.onreadystatechange = function() {
       		if(xmlhttp.readyState == 4) {
         		if(xmlhttp.status == 200) {
           			// Do something with the results
           			if(isDebug) alert(xmlhttp.responseText);//alert in debug mode
           			callback(xmlhttp.responseText);
         		} else {
           			// Some kind of error occurred.
           			alert("Sparql query error: http status " + xmlhttp.status + " "
        		        + xmlhttp.statusText);
         		}
       		}
     	};
     
     	// Send the query to the endpoint.
     	xmlhttp.send(querypart);
    
     	
     	function callback(str) {
  		var jsonObj = eval('(' + str + ')');
  		//Create a SPEXResultSet object, fill in any missing labels, and store the object in the variable results.
  		var results = spex.lg.label(new SPEXResultSet(jsonObj));
  
  		//Detect spatially and temporally enabled variables and pass them on to the query pane.
  		spex.ex.spatiallyEnabledVars = results.detectSpatiallyEnabledVars();
  		console.log("callback(): detected spatial vars stored in spex.ex: " + JSON.stringify(spex.ex.spatiallyEnabledVars));
  		spex.ex.temporallyEnabledVars = results.detectTemporallyEnabledVars();
  		console.log("callback(): detected temporal vars stored in spex.ex: " + JSON.stringify(spex.ex.temporallyEnabledVars));
  		//Forward the detected spatially and temporally enabled variables to query pane:
  		queryPane.setSpatialVars(spex.ex.spatiallyEnabledVars);
  		queryPane.setTemporalVars(spex.ex.temporallyEnabledVars);
  
  		//Filter WKT results (if any are there) 
  		FilterResults.prototype.filterWKT(results);
  
  		//Display result geometries on the map and on the time slider.
  		var spacePane = new SpaceFilterPane();
  		spacePane.displayGeometry(results);
		slider.displaytime(results.getTimes());		
		//Display results in resultspane as table
  		spex.rp.display(results);
     	}
     	
     
     	// Done; now just wait for the callback to be called.
};




 
 
