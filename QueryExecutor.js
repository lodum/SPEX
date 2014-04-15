function QueryExecutor(labelgen, resultspane){ 
this.labelGen = labelgen;
this.resultsPane = resultspane;
} 
QueryExecutor.prototype.constructor = QueryExecutor;
QueryExecutor.prototype.resultsLimit = 50;
QueryExecutor.prototype.timeout = 5000;


QueryExecutor.prototype.executeQuery = function(spexquery, endpoint) {
spexquery.limit = this.resultsLimit;
this.sparqlQueryJson(spexquery.getSPARQL(), endpoint, this.callback, true);
}

QueryExecutor.prototype.callback = function(str){
var jsonObj = eval('(' + str + ')');
var fjsonObj = this.filterResults(jsonObj);
this.resultspane.display(fjsonObj);
}

QueryExecutor.prototype.filterResults = function(resultset){
return resultset;
}

QueryExecutor.prototype.sparqlQueryJson = function(queryStr, endpoint, callback, isDebug) {
      var querypart = "query=" + escape(queryStr);
    
      // Get our HTTP request object.
      var xmlhttp = null;
      if(window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
     } else if(window.ActiveXObject) {
       // Code for older versions of IE, like IE6 and before.
       xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
     } else {
       alert('Perhaps your browser does not support XMLHttpRequests?');
     }
    
     // Set up a POST with JSON result format.
     xmlhttp.open('POST', endpoint, true); // GET can have caching probs, so POST
     xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
     xmlhttp.setRequestHeader("Accept", "application/sparql-results+json");
    
     // Set up callback to get the response asynchronously.
     xmlhttp.onreadystatechange = function() {
       if(xmlhttp.readyState == 4) {
         if(xmlhttp.status == 200) {
           // Do something with the results
           if(isDebug) alert(xmlhttp.responseText);
           callback(xmlhttp.responseText);
         } else {
           // Some kind of error occurred.
           alert("Sparql query error: " + xmlhttp.status + " "
               + xmlhttp.responseText);
         }
       }
     };
     // Send the query to the endpoint.
     xmlhttp.send(querypart);
    
     // Done; now just wait for the callback to be called.
    };




//var qef = new service.QueryExecutionFactoryHttp(
//          "http://dbpedia.org/sparql",
//          ["http://dbpedia.org"]
//);
//var qe = qef.createQueryExecution(spexquery.getSPARQL);
//qe.setTimeout(5000); // timout in milliseconds

//qe.execSelect()
//.done(function(rs) {
//        return rs
//    })
//    .fail(function(err) {
//        console.log("An error occurred: ", err);
 //   });
 
 
