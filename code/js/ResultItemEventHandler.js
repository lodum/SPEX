function ResultItemEventHandler(uri, tao){
  this.itemuri = uri;
  this.tableObject = tao;
  this.timeObject = null;
  this.spaceObject = null;
}

ResultItemEventHandler.prototype.constructor = ResultItemEventHandler;

ResultItemEventHandler.prototype.setSliderItem = function(item) {
  this.timeObject = item;
};

ResultItemEventHandler.prototype.setMapItem = function(item) {
  this.spaceObject = item;
};

ResultItemEventHandler.prototype.highlight = function(){
  console.log(this.itemuri);
  this.tableObject.css("background","lightgrey");
  slider.timeline.zoom(0.2, this.timeObject.start);
}

ResultItemEventHandler.prototype.dehighlight = function(){
this.tableObject.css("background","");
}
