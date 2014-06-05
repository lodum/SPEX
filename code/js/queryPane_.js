// queryPane object
function queryPane(){ }



// Properties
queryPane.prototype.constructor = queryPane;

queryPane.prototype.classesSelected = [];
queryPane.prototype.propertiesSelected = [];
queryPane.prototype.relationshipsSelected = [];

queryPane.prototype.query = null; // Needed?

queryPane.prototype.spaceFilter = null;
queryPane.prototype.timeFilter = null;
queryPane.prototype.executor = null;

queryPane.prototype.spaceFilter = null;



// Methods
queryPane.prototype.getCurrentQuery = function (){ 
	return '';
}

queryPane.prototype.setFilter = function (query, variable, filter){ 
	
}

queryPane.prototype.removeFilter = function (query, variable){ 
	
}

