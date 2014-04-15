function QueryExecutor(labelgen, resultspane){ 
this.labelGen = labelgen;
this.resultsPane = resultspane;
} 
QueryExecutor.prototype.constructor = QueryExecutor;
QueryExecutor.prototype.resultsLimit = 50;
QueryExecutor.prototype.timeout = 5000;



QueryExecutor.prototype.executeQuery = function(spexquery, endpoint) {
spexquery.limit = this.resultsLimit;
spexquery.config.endpoint = endpoint;
spexquery.execute(callbackqe);

function callbackqe(results){
if(results = []){
console.log("Empty result set");
} else {
return results;
}
}
}




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
 
 
