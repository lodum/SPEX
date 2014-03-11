function Node(id){
this.id = id; //this is the node identifier (a string, e.g. URI)
this.label = ""; //can be any short name for the node
this.getID = function (){return this.id};
this.getLabel = function (){return this.label};
this.prototype.toString = function() {return this.id;}
 }
