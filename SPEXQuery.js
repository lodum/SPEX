
function SPEXQuery(){ }
SPEXQuery.prototype = new Query();
SPEXQuery.prototype.constructor = SPEXQuery;
SPEXQuery.prototype.spatialConstraints = [];
SPEXQuery.prototype.temporalConstraints = [];
SPEXQuery.prototype.thematicConstraints = [];
SPEXQuery.prototype.getSPARQL= function (){ return this.serialiseQuery();}

SPEXQuery.prototype.setSpatialConstraint = function(va, window){
this.spatialConstraints.push({ "v" : va, "w" : window });
}
SPEXQuery.prototype.setTemporalConstraint = function(va, constr){
this.spatialConstraints.push({ "v" : va, "t" : constr});
}

