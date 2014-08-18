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

ResultItemEventHandler.prototype.setMapLayer = function(layer) {
  this.spaceObject = layer;
};

ResultItemEventHandler.prototype.highlight = function(){
  //console.log(this.itemuri);
  //this.tableObject.css("background","lightgrey");
  this.tableObject.style.background = "lightgrey";
  console.log(JSON.stringify(this.timeObject));
  if(this.timeObject) {
    slider.timeline.zoom(0.3, this.timeObject.start);
  }
  if(this.spaceObject) {
    map.LMap.fitBounds(spaceObject.getBounds());
  }
}

ResultItemEventHandler.prototype.dehighlight = function(){
  //this.tableObject.css("background","");
  this.tableObject.style.background = "";
  if(this.timeObject) {
    slider.timeline.zoom(-0.3, this.timeObject.start);
  }
  if(this.spaceObject) {
    map.LMap.fitBounds(map.markerGroup.getBounds());
  }
}
