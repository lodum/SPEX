/*
LabeledQuery() is a SPEXQuery with modified getSPARQL()-function
*/

//fast unique method for arrays
Array.prototype.unique = function() {
    var o = {}, i, l = this.length, r = [];
    for(i=0; i<l;i+=1) o[this[i]] = this[i];
    for(i in o) r.push(o[i]);
    return r;
};

function LabeledQuery(){
// redeclare patterns
    this.queryType = "SELECT";
    //this.prefixes = [];
    this.defaultGraphs = [];
    this.namedGraphs = [];
    this.variables = [];
    this.patterns = [];
    this.filters = [];
    this.combiner = "";
    this.orders = [];
    this.limitCount = -1;
    this.offsetCount = 0;
    this._prevSubj = null;
    this._prevProp = null;
    this._storedQuery = "";
}

LabeledQuery.prototype = new SPEXQuery();
LabeledQuery.prototype.constructor=LabeledQuery;


LabeledQuery.prototype.getSPARQL = function (){
	this.le.expandLabels(this);
	return this.serialiseQuery();
}

function copyQuery(copy, q){	
	//this saves only the immediate triple patterns from a query as well as filters (and throws away all other things). This is needed to project the current spex query into the suggester query.
	for(var i = 0; i < q.patterns.length; i++) {
      var pat = q.patterns[i];  	  
      // remove only optionals
      if(pat._sort == "triple") {
		copy.patterns.push(pat);
		//console.log("saved pattern: "+pat.s + " " + pat.p + " " + pat.o + ".");
	  }
	}
	for(var i = 0; i < q.filters.length; i++) {
      var fil = q.filters[i]; 
     
      //if(pat._sort == "triple") {
		copy.filters.push(fil);		
	  //}
	}	
	return copy;
}
 
 
/*
 ---
// distinct classes in the endpoint (very generic)
SELECT DISTINCT ?class ?class__label WHERE {
	?subject a ?class . 

	OPTIONAL {?class  rdfs:label|dct:title|dc:title|foaf:name|maps:title ?class__label}

} order by ?class

---
select distinct ?predicate where
{
	?subject ?predicate ?object.
	
	OPTIONAL {?predicate  rdfs:label|dct:title|dc:title|foaf:name|maps:title ?predicate__label}
} order by ?predicate
---
TO DOS

reduce the predicates displayed: dcterms:title might be useful, but dcterms:date is probably not 
possibility of a cliquable link (to the description of the vocabulary) for the autocomplete

*/
function Suggester(){
	var timerName='This is the suggester-builder timer';
	console.time(timerName);

//Define Arrays
    var predicateArrayin = [];
	var predicateArrayout = [];
    var classesArray = [];
    var instancesArray = [];
	var instancelabelArray = [];
	var suggestClasses = false;

//Define queries
	var queryPredicates = new LabeledQuery();
	var queryClasses = new LabeledQuery();
/*	NOt needed becaus query needs to be done only on selection of some node
	function queryforPredicates() {
	queryPredicates = new LabeledQuery();
	queryPredicates.select(["?predicate","?predicate__label"]).distinct().where("?subject" , "?predicate" , "?object").orderby("?predicate");
	queryPredicates.SPEXvariables=["?predicate"];
	}
	function queryforClasses() {
	queryClasses = new LabeledQuery();	
	queryClasses.select(["?aClass","?aClass__label"]).distinct().where("?a" , "rdf:type" , "?aClass").orderby("?aClass"); 
	queryClasses.SPEXvariables=["?aClass"];
	}		
*/	



	/*
	 Function which takes a column out of the json of a query-result, inserts prefixes, and stores the values in an array,
	 after checking that the prefixes are not in the blacklist. If the column asked for doesn't exist in the query-result, nothing is done.
	 Format:
	 'queryResultJson' must be the result of a sparql query
	 'prefixList' must be an array of JSON snippets containing "prefix" and "uri"
	 'prefixBlacklist' must be an array of unwanted prefixes, contained in prefixList
	 'columnName' must be the variabble name (without the '?')
	 TODO: Build in the labels
	*/
	
	 
	function storeColumn(queryResultJson,prefixList,prefixBlacklist,columnName,storageArray){
		var queryVars = queryResultJson.head.vars;
		var sols = queryResultJson.results.bindings;		
		
		if(queryVars.indexOf(columnName) == -1){
			//console.log("Column " + columnName + " does not exist in the results!");
		}
		else{			
			for( var i = 0; i < sols.length; i++){
				var currentElement = sols[i][columnName].value; //Get the current element
				var isClass = false;
				if (columnName == "aClass") {
					isClass = (sols[i]["predicate_o"].value == "rdf:type" || sols[i]["predicate_o"].value=="http://www.w3.org/1999/02/22-rdf-syntax-ns#type");
				}
				//console.log("Current value of" + columnName + ": " + currentElement);
				// go through the list of prefixes to check if one of the urls associated with a prefix is substring of the current element
				if ((columnName == "aClass"&&isClass)||columnName != "aClass") {
				for (var j = 0; j < prefixList.length; j++ ){
					if (currentElement.indexOf(prefixList[j].uri) != -1){  // if yes
						// check if the corresponding prefix is in the blacklist
						if (prefixBlacklist.indexOf(prefixList[j].prefix) == -1){  // if it is not in the blacklist
							storageArray.push(currentElement.replace(prefixes[j].uri, prefixes[j].prefix + ':')); //Add current element to storageArray
						}
						break;
					}
					else if (j == prefixList.length - 1){
						console.log("Following value ("+ currentElement +") cannot be matched with the prefix list!");
						//Add corresponding prefix to prefixList ??
					}
				}
				}
			}
		}
		 
		console.log("storage array of " + columnName + ":\n" + storageArray);
	}	
	
	var sugEx=new QueryExecutor();
	

    sugEx.callback = function(str) {      // Define a callback function to receive the SPARQL JSON result.
		var jsonObj = eval('(' + str + ')');      // Convert result to JSON
		jsonObj=new LabelGenerator().label(new SPEXResultSet(jsonObj)).allResults;    //Add labels to results
			
		storeColumn(jsonObj,prefixes,excludedPrefixes,"aClass",classesArray); //store in classesArray if results correspond to the query for classes
		storeColumn(jsonObj,prefixes,excludedPrefixes,"predicate_o",predicateArrayout); // store in predicateArray if results correspond to the query for predicates
		storeColumn(jsonObj,prefixes,excludedPrefixes,"predicate_i",predicateArrayin); // store in predicateArray if results correspond to the query for predicates
		//Remove label properties from 'predicateArray'
		//Following code assumes that predicateArray has no duplicates!!
		var labelProps = spex.q.le.listOfLabelProperties.slice();
		for (var x=0;x<predicateArrayout.length;x++){
			var y = labelProps.indexOf(predicateArrayout[x]);
			if(y != -1){
				predicateArrayout.splice(x,1);
				x--;
				console.log("Label property '" + labelProps[y] + "' was removed from predicate suggester");
				labelProps.splice(y,1);
			}
		}	
		 
		classesArray = classesArray.unique().sort();
		predicateArrayin = predicateArrayin.unique().sort();
		predicateArrayout = predicateArrayout.unique().sort();
	   	console.log("The number of suggester classes is:  "+classesArray.length);
	    console.log("The number of suggester predicates/in is:  "+predicateArrayin.length); 
		console.log("The number of suggester predicates/out is:  "+predicateArrayout.length); 	
		spex.sug.setLinkText();	
		if (spex.sug.suggestClasses==true) {		
		spex.sug.createDropdownC('queryS');
		}
		else {		
		spex.sug.createDropdownI('queryS');	
		}
     };
	 
	 
	 
	var createDropdown=function(idString, dropdownArray){		
	  var closing = false;
	  var s = '#' + idString;
	  $(s).autocomplete({	  
	  source: dropdownArray,	 
	  select: function(event, ui) { if(ui.item.id) {console.log(ui.item.id); queryPane.selected.uri="<"+ui.item.id+">";}}  ,
	  minLength: 0  
	  //close: function()
	 //	{
			// avoid double-pop-up issue
	//		closing = true;
	//	setTimeout(function() { closing = false; }, 300);
	//	}
	  })
	   //this turns on the suggesterlist already on focus (without the user having to type anything)
	  //.focus(function(){            
      //      if (!closing)
		//	$(s).autocomplete("search");
	//	})
		;
	
	};
    
	this.createDropdownC=function(idString){
		createDropdown(idString,classesArray);
		//spex.sug.setLinkText();	
	};
	
	this.createDropdownPout=function(idString){
		createDropdown(idString,predicateArrayout);
		$('#numbpr').text('('+predicateArrayout.length+' predicates to choose from)');
	};
	this.createDropdownPin=function(idString){
		createDropdown(idString,predicateArrayin);
		$('#numbpr').text('('+predicateArrayin.length+' predicates to choose from)');
	}; 
	
	this.createDropdownI = function(idString) {
		createDropdown(idString,instancesArray);
	};

	this.init=function(){
		//console.log(queryClasses.getSPARQL());
		//console.log(queryPredicates.getSPARQL());
		//queryforPredicates();
		//queryforClasses();
		//sugEx.executeQuery(queryClasses, endpoint); 
		//sugEx.executeQuery(queryPredicates, endpoint);
	};
	
	this.setLinkText = function() {
		//console.log("link text: " + predicateArrayout.length + classesArray.length);
		if (predicateArrayout.length==0 ) {			
			$('#addout').text('');
			$('#addout').click(function (){});
		}else { 
			$('#numbpr').text('('+predicateArrayout.length+' predicates)');
			$('#addout').click=queryPane.showContextMenuAddOut;		
			$('#addout').text('Add outgoing Link ('+predicateArrayout.length+')');		
		};
		if (predicateArrayin.length==0 ) {			
			$('#addin').text('');
			$('#addin').click(function (){});
		}else { 
			$('#addin').click=queryPane.showContextMenuAddIn;	
			$('#numbpr').text(''+predicateArrayin.length+' prediates)');			
			$('#addin').text('Add incoming Link ('+predicateArrayin.length+')');		
		};
		if (document.getElementById('queryVar').checked){
		if (classesArray.length==0 ) {
			$('#warning').text("No class suggestions found!").css("color" , "red");			
		} else {
			if(classesArray.length==1){var cl=' class'}else{var cl=' classes'};
			$('#numb').text('('+classesArray.length +cl+' to choose from)');				
			$('#warning').text('').css("color" , "white");			
		}};
		if (document.getElementById('queryNonVar').checked){
		if (instancesArray.length==0 ) {
			$('#warning').text("No instance suggestions found!").css("color" , "red");			
		} else {	
			$('#numb').text('('+instancesArray.length+' things to choose from)');		
			$('#warning').text('').css("color" , "white");			
		}
		};
		
	 
	 };
	//both of the following methods are called from queryPane menu in order to update suggester lists
	// method which modifies predicate and class suggestions taking into account the current query	
	this.getSelNodePredicatesandClassesofCurrentQuery = function(){
		console.log("new auto-suggester out predicate and class list is being generated!");			 
			 queryPredicates = new LabeledQuery();			 
			 copyQuery(queryPredicates, spex.q);	
			 var varname = queryPane.getNodeVarName(queryPane.selected);			 
			 queryPredicates.select(["?predicate_o","?predicate_o__label","?aClass","?aClass__label"]).distinct().where(varname , "?predicate_o" , "?aClass").end();
			 queryPredicates.SPEXvariables=["?predicate_o","?aClass"];
			 //console.log("sugpredicatesparql:  "+queryPredicates.getSPARQL());
			predicateArrayout = [];
			classesArray = [];	
			$('#warning').text("Please wait for suggestions being generated...").css("color" , "red");			
			sugEx.executeQuery(queryPredicates, spex.queryEndpoint());		
	};
	//method which modifies class suggestions taking into account the current query 
	this.getSelNodeInPredicatesofCurrentQuery = function () {
		 if (queryPane.selected.variable) {		 
			console.log("new auto-suggester in prediate list is being generated!");
			 var varname = queryPane.getNodeVarName(queryPane.selected);
			 queryClasses = new LabeledQuery();			 
			 copyQuery(queryClasses, spex.q);			 
			 queryClasses.select(["?predicate_i","?predicate_i__label"]).distinct().where("?fromnode", "?predicate_i", varname).orderby("?predicate_i");
			 queryClasses.SPEXvariables=["?predicate_i"];
			 //console.log(queryClasses.getSPARQL());
			predicateArrayin = [];	
			$('#warning').text("Please wait for suggestions being generated...").css("color" , "red");
			sugEx.executeQuery(queryClasses, spex.queryEndpoint());
		 }
	};
	this.getSelNodeInstances = function (){
		//if (!queryPane.selected.variable) {	
			instancesArray = [];
			instancelabelArray = [];
			var varname = queryPane.getNodeVarName(queryPane.selected).substr(1);
			console.log("auto-suggester instance list generated from current results for: "+varname);			
			$.each(spex.rp.currentresults.getAllResults().results.bindings, function(solutionIndex, solution) {		
				//console.log(solution);
				if(solution[varname]){ instancesArray.push({ value: solution[varname+'__label'].value, id: solution[varname].value});}
				//console.log({id: solution[varname].value, value: solution[varname+'__label'].value});
			});			
			//instancesArray = instancesArray.unique();
			if (instancesArray.length==0 ) {
			$('#warning').text("No instance suggestions found!").css("color" , "red");
			} else {$('#warning').text('').css("color" , "white")};
		//}
	};
	

	console.timeEnd(timerName);
}

Suggester.prototype.constructor = Suggester;
