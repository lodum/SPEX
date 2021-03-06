/*
LabeledQuery() is a SPEXQuery with modified getSPARQL()-function
*/

//Sort array considering part after separator (':' for prefix lists), and remove duplicates
Array.prototype.uniqueAndSort = function(separator) {
    /*
    var o = {}, i, l = this.length, r = [];
    for(i=0; i<l;i+=1) o[this[i]] = this[i];
    for(i in o) r.push(o[i]);
    return r;
    */
    if(separator == ""){
		this.sort()
		return this;
	}else{
		var unexpected=[], expected=[],sorter=[],someJSON={};
		for(var i=0;i<this.length;i++){
			var thisElem = this[i], index = thisElem.indexOf(separator);
			if(index == -1){
				unexpected.push(thisElem);
			} else{
				var string1 = thisElem.substring(0,index), string2 = thisElem.substring(index + separator.length);
				if(!someJSON[string2]){
					someJSON[string2]={};
				}
				if(!someJSON[string2].pfxArray){
					someJSON[string2].pfxArray=[];
				}
				if(someJSON[string2].pfxArray.indexOf(string1) == -1){
					someJSON[string2].pfxArray.push(string1);
				}
				if(!someJSON[string2][string1]){
					someJSON[string2][string1]={};
				}
				someJSON[string2][string1] = thisElem;
				if(sorter.indexOf(string2) == -1){
					sorter.push(string2);
				}
			}
		}
		unexpected.sort();
		sorter.sort();
		for(var i=0;i<sorter.length;i++){
			var thisElem=someJSON[sorter[i]], thisPrefixes=thisElem.pfxArray;
			thisPrefixes.sort();
			for(var j=0;j<thisPrefixes.length; j++){
				var pfx = thisPrefixes[j];
				expected.push(thisElem[pfx]);
			}
		}
		//console.log(JSON.stringify(someJSON,null,'\t'));
		return expected.concat(unexpected);
	}
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
    this.combiner = "DISTINCT";
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
	return this.getPrefixedQueryString();
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
/**
* A suggester which queries an endpoint for constructive (non-syntactical) vocabularies relative to the current query and node in focus. The lists of terms are displayed by autosuggestion. 
* @class
* @property {object}  predicateArrayin  - holds RDF properties that link into the node in focus.
* @property {object} predicateArrayout	- holds RDF properties that link outof the node in focus.
* @property {object}  classesArray		- holds RDF classes of the node in focus.
* @property {object} instancesArray		- holds RDF instances of the variable node in focus.
**/
function Suggester(){
	var timerName='This is the suggester-builder timer';
	console.time(timerName);

//Define Arrays

    var predicateArrayin = [];
	var predicateArrayout = [];
    var classesArray = [];
    var instancesArray = [];
	var instanceIDArray = [];
	
	var suggestClasses = false;
	var queryChain = 0;

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
				var	prefixedelement = "";			
				//console.log("Current value of " + columnName + ": " + currentElement);
							
				// go through the list of prefixes to check if one of the urls associated with a prefix is substring of the current element				
				for (var j = 0; j < prefixList.length; j++ ){
					if (currentElement.indexOf(prefixList[j].uri) != -1){  // if yes
						prefixedelement = currentElement.replace(prefixes[j].uri, prefixes[j].prefix + ':');
						// check if the corresponding prefix is in the blacklist						
						if (prefixBlacklist.indexOf(prefixList[j].prefix) == -1){  // if it is not in the blacklist, add it
							storageArray.push(prefixedelement);
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
		 
		console.log("storage array of " + columnName + ":\n" + storageArray);
	}	
	
	var sugEx=new QueryExecutor();
	
	function removeLabelProperties(prediarray) {
		//Remove label properties and other excluded properties from 'predicateArray'
		//Following code assumes that predicateArray has no duplicates!!
		var labelProps = spex.q.le.listOfLabelProperties.slice();
		var excludedRes = excludedResources.slice();
		for (var x=0;x<prediarray.length;x++){
			var y = labelProps.indexOf(prediarray[x]);
			var j = excludedRes.indexOf(prediarray[x]);			
			if(y != -1 || j != -1){
				prediarray.splice(x,1);
				x--;
				if(y != -1){
				console.log("Label property '" + labelProps[y] + "' was removed from predicate suggester");
				labelProps.splice(y,1);
				}
				if (j != -1){
				console.log("Property '" + excludedRes[j] + "' was removed from predicate suggester");
				excludedRes.splice(j,1);
				}
			}			
				
		}	
	
	}

    sugEx.callback = function(str) {      // Define a callback function to receive the SPARQL JSON result.
		var jsonObj = eval('(' + str + ')');      // Convert result to JSON
		jsonObj=new LabelGenerator().label(new SPEXResultSet(jsonObj)).allResults;    //Add labels to results
			
		storeColumn(jsonObj,prefixes,excludedPrefixes,"aClass",classesArray); //store in classesArray if results correspond to the query for classes
		storeColumn(jsonObj,prefixes,excludedPrefixes,"predicate_o",predicateArrayout); // store in predicateArray if results correspond to the query for predicates
		storeColumn(jsonObj,prefixes,excludedPrefixes,"predicate_i",predicateArrayin); // store in predicateArray if results correspond to the query for predicates
				 
		classesArray = classesArray.uniqueAndSort(":");
		predicateArrayin = predicateArrayin.uniqueAndSort(":");
		predicateArrayout = predicateArrayout.uniqueAndSort(":"); 		
		
		removeLabelProperties(predicateArrayout);
		removeLabelProperties(predicateArrayin);
		
		console.log("The number of suggester classes is:  "+classesArray.length);
	    console.log("The number of suggester predicates/in is:  "+predicateArrayin.length); 
		console.log("The number of suggester predicates/out is:  "+predicateArrayout.length); 
		
		//sets the autosuggestion lists when they are available
		if (spex.sug.suggestClasses==true) {		
		spex.sug.createDropdownC('queryS');
		}
		else {		
		spex.sug.createDropdownI('queryS');	
		};
		
		spex.sug.setLinkText();
		//chains the next suggester queries
		if (spex.sug.queryChain == 0) {				
			spex.sug.queryChain++;
			spex.sug.getSelNodePredicatesofCurrentQuery();			
		}
		else if (spex.sug.queryChain == 1) {			
			spex.sug.queryChain++;
			var back = false;
			//tests whether query has additional triples coming from spex query or whether there are instance filters. If not, it is not required to query for "in" predicates, since node in focus does not have any further constraints which would distinguish in from out
			for (var i = 0; i< spex.q.patterns.length; i++) {
				var pat = spex.q.patterns[i];
				if (pat._sort == "triple"){back = true; break;}
			}
			for (var i = 0; i< spex.q.filters.length; i++) {
				var fil = spex.q.filters[i];
				if (fil.indexOf("=")!=-1){back = true; break;}
			}
			if (back) {spex.sug.getSelNodeInPredicatesofCurrentQuery();}		
		}
		else {
		spex.sug.queryChain= 0;			
		};
		
     };
	 
	 
	var createDropdown=function(idString, dropdownArray,focusFunction){		
	  var closing = false;
	  var s = '#' + idString;
	  $(s).autocomplete({	  
	  source: dropdownArray,	 
	  select: function(event, ui) { 
	  if(ui.item.id) {console.log(ui.item.id); queryPane.selected.uri="<"+ui.item.id+">";};
	  //if (dropdownArray==classesArray) {queryPane.updateSelected();} else if (dropdownArray==predicateArrayout) {queryPane.addOut();} else  {queryPane.addIn();};	  
	  }  ,
	  focus: focusFunction,
	  minLength: 0	  	  
	  //close: function()
	 //	{
			// avoid double-pop-up issue
	//		closing = true;
	//	setTimeout(function() { closing = false; }, 300);
	//	}
	  })
	   //this turns on the suggesterlist already on focus (without the user having to type anything)
	  .focus(function(){            
      //      if (!closing)
			$(s).autocomplete("search","");
		});
	
	};
    /** 
	 * creates a class autosuggestion drop down menu
	 *@function */
	this.createDropdownC=function(idString){
		createDropdown(idString,classesArray,function(event,ui){
			$('#' + idString).val(ui.item.label);
			queryPane.updateSelected();
		});
		//var s = '#' + idString;			
		//$(s).on( "autocompleteselect", function( event, ui ) {$(s).val(ui.item.label); queryPane.updateSelected();} );	
			
	};
	/** 
	 * creates a property (out) autosuggestion drop down menu
	 *@function */
	this.createDropdownPout=function(idString){
		createDropdown(idString,predicateArrayout,function(event,ui){
			$('#' + idString).val(ui.item.label);
			queryPane.addOut();
		})
		$('#numbpr').text('('+predicateArrayout.length+' relations available)');
		//var s = '#' + idString;			
		//$(s).on( "autocompleteselect", function( event, ui ) {$(s).val(ui.item.label);queryPane.addOut();} );
	};
	/** 
	 * creates a property (in) autosuggestion drop down menu
	 *@function */
	this.createDropdownPin=function(idString){
		createDropdown(idString,predicateArrayin,function(event,ui){
			$('#' + idString).val(ui.item.label);
			queryPane.addIn();
		});
		$('#numbpr').text('('+predicateArrayin.length+' relations available)');
		//var s = '#' + idString;			
		//$(s).on( "autocompleteselect", function( event, ui ) {$(s).val(ui.item.label);queryPane.addIn();} );
	}; 
	/** 
	 * creates an instance autosuggestion drop down menu
	 *@function */
	this.createDropdownI = function(idString) {
		createDropdown(idString,instancesArray);
		//var s = '#' + idString;			
		//$(s).on( "autocompleteselect", function( event, ui ) {$(s).val(ui.item.label);queryPane.updateSelected();} );	
	};

	this.init=function(){			
	};
	
	//This adjusts menu the menu text on a node once new suggestions have been generated
	this.setLinkText = function() {
		//console.log("link text: " + predicateArrayout.length + classesArray.length);
		if (predicateArrayout.length==0 ) {			
			$('#addout').text('');
			$('#addout').click(function (){});
		}else { 
			//$('#numbpr').text('('+predicateArrayout.length+' predicates)');
			$('#addout').click(queryPane.showContextMenuAddOut);		
			$('#addout').text('Specify relationship to other things ('+predicateArrayout.length+')');		
		};
		if (predicateArrayin.length==0 ) {			
			$('#addin').text('');
			$('#addin').click(function (){});
		}else { 
			$('#addin').click(queryPane.showContextMenuAddIn);	
			//$('#numbpr').text(''+predicateArrayin.length+' prediates)');			
			$('#addin').text('Specify relationship from other things ('+predicateArrayin.length+')');		
		};
		if (document.getElementById('queryVar').checked){
		if (classesArray.length==0 ) {
			$('#warning').text("No class suggestions found!").css("color" , "red");			
		} else {
			if(classesArray.length==1){var cl=' class'}else{var cl=' classes'};
			$('#numb').text('('+classesArray.length +cl+' available)');				
			$('#warning').text('').css("color" , "white");			
		}};
		if (document.getElementById('queryNonVar').checked){
		if (instancesArray.length==0 ) {
			$('#warning').text("No instance suggestions found!").css("color" , "red");			
		} else {	
			$('#numb').text('('+instancesArray.length+' things available)');		
			$('#warning').text('').css("color" , "white");			
		}
		};
		
	 
	 };
	//both of the following methods are called from queryPane menu in order to update suggester lists
	// method which modifies predicate and class suggestions taking into account the current query	
	this.getSelNodeClassesofCurrentQuery= function(){
			console.log("new auto-suggester class list is being generated!");			 
			 queryClasses = new LabeledQuery();		 	
			queryPane.selected.label = "";
			spex.q = new SPEXQuery();
			queryPane.parseQuery();
			copyQuery(queryClasses, spex.q);
			queryPane.selected.label = document.getElementById('queryS').value;
			spex.q = new SPEXQuery();
			queryPane.parseQuery();
			var varname = queryPane.getNodeVarName(queryPane.selected);
			 queryClasses.select(["?aClass","?aClass__label"]).distinct().where(varname , "rdf:type" , "?aClass").limit(500);
			 queryClasses.SPEXvariables=["?aClass"];
			 //console.log("sugpredicatesparql:  "+queryClasses.getSPARQL());			
			classesArray = [];	
			$('#warning').text("Please wait for class suggestions being generated...").css("color" , "red");			
			sugEx.executeSideQuery(queryClasses, spex.queryEndpoint());		
	};
	this.getSelNodePredicatesofCurrentQuery = function(){
		console.log("new auto-suggester out predicate list is being generated!");			 
			 queryPredicates = new LabeledQuery();			 
			 copyQuery(queryPredicates, spex.q);	
			 var varname = queryPane.getNodeVarName(queryPane.selected);			 
			 queryPredicates.select(["?predicate_o","?predicate_o__label"]).distinct().where(varname , "?predicate_o" , "?tonode").limit(500);
			 queryPredicates.SPEXvariables=["?predicate_o"];
			 //console.log("sugpredicatesparql:  "+queryPredicates.getSPARQL());
			predicateArrayout = [];				
			$('#addout').click(function (){}).text("Suggestions for outgoing links being generated...");			
			sugEx.executeSideQuery(queryPredicates, spex.queryEndpoint());		
	};
	//method which modifies class suggestions taking into account the current query 
	this.getSelNodeInPredicatesofCurrentQuery = function () {
		 if (queryPane.selected.variable) {		 
			console.log("new auto-suggester in prediate list is being generated!");
			 var varname = queryPane.getNodeVarName(queryPane.selected);
			 queryPredicates = new LabeledQuery();			 
			 copyQuery(queryPredicates, spex.q);			 
			 queryPredicates.select(["?predicate_i","?predicate_i__label"]).distinct().where("?fromnode", "?predicate_i", varname).limit(500);
			 queryPredicates.SPEXvariables=["?predicate_i"];
			 //console.log(queryPredicates.getSPARQL());
			predicateArrayin = [];	
			$('#addin').click(function (){}).text("Suggestions for ingoing links being generated...");
			sugEx.executeSideQuery(queryPredicates, spex.queryEndpoint());
		 }
	};
	/** 
	* Executes suggester queries (for classes and linked properties) for a variable node in focus
	*@function */
	this.chainVariableQueries = function () {		
		this.queryChain =0;
		//console.log("queryChain :"+this.queryChain);
		this.getSelNodeClassesofCurrentQuery();
	}
	/** 
	* Executes suggester queries (for instances and linked properties) for an instant node in focus
	*@function */
	this.chainInstanceQueries = function () {		
		spex.sug.getSelNodeInstances();
		this.queryChain =1;
		//console.log("queryChain :"+this.queryChain);
		this.getSelNodePredicatesofCurrentQuery();
	}
	
	this.getSelNodeInstances = function (){
		//if (!queryPane.selected.variable) {	
			instancesArray = [];
			instanceIDArray = [];
			var varname = queryPane.getNodeVarName(queryPane.selected).substr(1);
			console.log("auto-suggester instance list generated from current results for: "+varname);
			if (spex.rp.currentresults.getAllResults() !="") {
			$.each(spex.rp.currentresults.getAllResults().results.bindings, function(solutionIndex, solution) {		
				//console.log(solution);
				if(solution[varname]&& solution[varname+'__label']&& instanceIDArray.indexOf(solution[varname].value)==-1 && solution[varname+'__label'].value!= "Something"){ //This filters out blank nodes and duplicates
					instancesArray.push({ value: solution[varname+'__label'].value, id: solution[varname].value});
					instanceIDArray.push(solution[varname].value); //this assures uniqueness of instance ids
				}			
				//console.log({id: solution[varname].value, value: solution[varname+'__label'].value});
			});	
			};				
			
			if (instancesArray.length==0 ) {
			$('#warning').text("No instance suggestions found!").css("color" , "red");
			} else {
			$('#warning').text('').css("color" , "white");
			instancesArray = instancesArray.sort();
			};
		//}
	};
	

	console.timeEnd(timerName);
}

Suggester.prototype.constructor = Suggester;
