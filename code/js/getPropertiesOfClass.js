/*
Works like this: Given a class rdfClass="???",  an endpoint and an empty array, following query is executed at the given endpoint:

select distinct ?predicate where{
?x a "???".
?x ?predicate ?y.
filter(?predicate!=?rdf:type).
}
order by ?predicate

Results are then extracted as strings out of the json returned by the endpoint, and stored in the given array.
*/
function getPropertiesOfClass(rdfClass,endpoint,resultsArray){


//Formulate the Query in 'myQuery'
var myQuery=new SPEXQuery();
myQuery.select(["?predicate"]).distinct().where("?x","a",rdfClass).where("?x","?predicate","?y").filter("?predicate!=rdf:type").orderby("?predicate");

//Use the existing QueryExecutor-class
var myExecutor=new QueryExecutor();

//Overwrite the callback-function of myExecutor
myExecutor.callback=function(str){
	var jsonObj = eval('(' + str + ')');
	for (var i=0; i < jsonObj.results.bindings.length ; i++){
		resultsArray[i]=jsonObj.results.bindings[i].predicate.value;
	}
};

myExecutor.executeQuery(myQuery,endpoint);

//this line is only so that "tesGetPropertiesOfClass.html" displays the query. should be removed if used in another context
//document.getElementById("query").innerHTML = myQuery.serialiseQuery();
}
