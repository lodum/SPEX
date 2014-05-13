
function SPEXQuery(){ 
this.limit(50); 
this.timeout = 5000;
this.fe = new FilterExpander();
this.SPEXvariables = [];
}


SPEXQuery.prototype = $.sparql("http://www.example.com/sparql/");
SPEXQuery.prototype.constructor = SPEXQuery;
SPEXQuery.prototype.spatialConstraints = [];
SPEXQuery.prototype.temporalConstraints = [];


//a standard list of prefixes
SPEXQuery.prototype.prefix("geo", "http://www.opengis.net/ont/geosparql#");
SPEXQuery.prototype.prefix("wgs84", "http://www.w3.org/2003/01/geo/wgs84_pos#");
SPEXQuery.prototype.prefix("time", "http://www.w3.org/2006/time#");
SPEXQuery.prototype.prefix("xsd", "http://www.w3.org/2001/XMLSchema#");
SPEXQuery.prototype.prefix("dct", "http://purl.org/dc/terms/");
SPEXQuery.prototype.prefix("dc", "http://purl.org/dc/elements/1.1/");
SPEXQuery.prototype.prefix("rdf", "http://www.w3.org/1999/02/22-rdf-syntax-ns#");
SPEXQuery.prototype.prefix("rdfs", "http://www.w3.org/2000/01/rdf-schema#");
SPEXQuery.prototype.prefix("owl", "http://www.w3.org/2002/07/owl#");
SPEXQuery.prototype.prefix("isbd", "http://iflastandards.info/ns/isbd/elements/");
SPEXQuery.prototype.prefix("skos", "http://www.w3.org/2004/02/skos/core#");
SPEXQuery.prototype.prefix("bibo", "http://purl.org/ontology/bibo/");
SPEXQuery.prototype.prefix("rda", "http://RDVocab.info/ElementsGr2/");
SPEXQuery.prototype.prefix("blt", "http://data.bl.uk/schema/bibliographic#");
SPEXQuery.prototype.prefix("bio", "http://purl.org/vocab/bio/0.1/");
SPEXQuery.prototype.prefix("foaf", "http://xmlns.com/foaf/0.1/");
SPEXQuery.prototype.prefix("event", "http://purl.org/NET/c4dm/event.owl#");
SPEXQuery.prototype.prefix("org", "http://www.w3.org/ns/org#");
SPEXQuery.prototype.prefix("pv", "http://linkedscience.org/pv/ns#");
SPEXQuery.prototype.prefix("fn", "http://www.w3.org/2005/xpath-functions#");
SPEXQuery.prototype.prefix("vcard", "http://www.w3.org/2006/vcard/ns#");
SPEXQuery.prototype.prefix("aiiso", "http://purl.org/vocab/aiiso/schema#");
SPEXQuery.prototype.prefix("teach", "http://linkedscience.org/teach/ns#");
SPEXQuery.prototype.prefix("res", "http://www.medsci.ox.ac.uk/vocab/researchers/0.1/");
SPEXQuery.prototype.prefix("resume", "http://rdfs.org/resume-rdf/#");
SPEXQuery.prototype.prefix("tis", "http://www.ontologydesignpatterns.org/cp/owl/timeindexedsituation.owl#");
SPEXQuery.prototype.prefix("ti", "http://www.ontologydesignpatterns.org/cp/owl/timeinterval.owl#");
SPEXQuery.prototype.prefix("lode", "http://linkedevents.org/ontology/");

SPEXQuery.prototype.prefix("tipr", "http://www.ontologydesignpatterns.org/cp/owl/timeindexedpersonrole.owl#");


SPEXQuery.prototype.thematicConstraints = [];

//This is the array which holds those variables requested by the user
SPEXQuery.prototype.SPEXvariable = function(variable) {
    this.SPEXvariables.push(variable);
    return this;
  };

SPEXQuery.prototype.getSPARQL = function (){ 	
	this.expandSpaceFilter();
	this.expandTimeFilter();	
	this.fe.expandFilterLiterals(this);
	return this.serialiseQuery();
}

SPEXQuery.prototype.setSpatialConstraint = function(va, window){
	this.spatialConstraints.push({ "v" : va, "w" : window });

}
SPEXQuery.prototype.setTemporalConstraint = function(va, time){
	this.temporalConstraints.push({ "v" : va, "t" : time});
}


SPEXQuery.prototype.expandTimeFilter = function(){

 	for (i=0;i<this.temporalConstraints.length;i++)  {
		
		this.where(this.temporalConstraints[i].v, "time:hasBeginning", "?INSTANT_BEGINNING");
		this.where("?INSTANT_BEGINNING", "a", "time:Instant"); 
		this.where("?INSTANT_BEGINNING", "time:inXSDDateTime", "?timeBeginning");

		this.where(this.temporalConstraints[i].v, "time:hasEnd", "?INSTANT_END");
		this.where("?INSTANT_END", "a", "time:Instant"); 
		this.where("?INSTANT_END", "time:inXSDDateTime", "?timeEnd");

		this.filter("?timeBeginning  >= '" + this.temporalConstraints[i].t.timeBeginning + "'^^xsd:dateTime && ?timeEnd <= '"  + this.temporalConstraints[i].t.timeEnd + "'^^xsd:dateTime");  		

 	}
	
}

SPEXQuery.prototype.expandSpaceFilter = function(){

 	
 	for (i=0;i<this.spatialConstraints.length;i++)  {
		
		this.where(this.spatialConstraints[i].v, "wgs84:lat", "?lat")
		.where("wgs84:long", "?long");

		this.filter("?lat  < " + this.spatialConstraints[i].w.upperRightLatitude + " && ?lat > "  + this.spatialConstraints[i].w.lowerLeftLatitude + 
			             " && ?long < " + this.spatialConstraints[i].w.upperRightLongitude +" && ?long > " + this.spatialConstraints[i].w.lowerLeftLongitude);  		

 	}

}
