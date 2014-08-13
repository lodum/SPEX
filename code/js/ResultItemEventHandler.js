function ResultItemEventHandler(uri, tao, tio, so){
this.itemuri = uri;
this.tableObject = tao;
this.timeObject = tio;
this.spaceObject = so;
}

ResultItemEventHandler.prototype.constructor = ResultItemEventHandler;

ResultItemEventHandler.prototype.highlight = function(){
console.log(this.itemuri);
this.tableObject.css("background","lightgrey");
}

ResultItemEventHandler.prototype.dehighlight = function(){
this.tableObject.css("background","");
}