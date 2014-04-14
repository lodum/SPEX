function QueryExecutor(){ } 
QueryExecutor.prototype.constructor = QueryExecutor;

QueryExecutor.prototype.executeQuery = function(spexquery, endpoint) {
var qef = new service.QueryExecutionFactoryHttp(
          "http://dbpedia.org/sparql",
          ["http://dbpedia.org"]
);
var qe = qef.createQueryExecution(spexquery.getSPARQL);
qe.setTimeout(5000); // timout in milliseconds

qe.execSelect()
.done(function(rs) {
        return rs
    })
    .fail(function(err) {
        console.log("An error occurred: ", err);
    });
}