function getPropertiesOfClass(rdfClass,endpoint,myArray){


//Formulate the Query in 'myQuery'
var myQuery=new SPEXQuery();
myQuery.select(["?predicate"]).distinct().where("?x","a",rdfClass).where("?x","?predicate","?y").filter("?predicate!=rdf:type").orderby("?predicate");

//Use the existing QueryExecutor-class
var myExecutor=new QueryExecutor();

//Overwrite the callback-function of myExecutor
myExecutor.callback=function(str){
	var jsonObj = eval('(' + str + ')');
	for (var i=0; i < jsonObj.results.bindings.length ; i++){
		myArray[i]=jsonObj.results.bindings[i].predicate.value;
	}
};

myExecutor.executeQuery(myQuery,endpoint);

document.getElementById("query").innerHTML = myQuery.serialiseQuery();
}
