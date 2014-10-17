function ResultItemEventHandler(tao){  
  this.tableObject = tao; 
  this.timeObject = null;
  this.spaceObject = null;
  
}

ResultItemEventHandler.prototype.constructor = ResultItemEventHandler;



ResultItemEventHandler.prototype.setMapLayer = function(layer) {
  this.spaceObject = layer;
};

ResultItemEventHandler.prototype.highlight = function(){
if (spex.rp.enabled) { //this checks whether highlighting is enabled or not
    this.tableObject.style.background = "lightgrey";
  
  if(this.timeObject) {  
	slider.timeline.zoom(1, this.timeObject.start);	
	//console.log("Time object"+this.timeObject.start);		
	//$(this.timeObject.dom).prepend("<div class='ui-highlight'></div>");
	//console.log($(this.timeObject.dom).css('borderTopColor'));
  }else {slider.timeline.zoom(-1); 
  }
  if(this.spaceObject) {
    map.LMap.fitBounds(this.spaceObject.getBounds());
  } else {map.LMap.fitBounds(map.markerGroup.getBounds());
  }
}
}

ResultItemEventHandler.prototype.dehighlight = function(){
if (spex.rp.enabled) {  
  this.tableObject.style.background = "";  
  slider.timeline.zoom(-1);
  map.LMap.fitBounds(map.markerGroup.getBounds());
}
}

ResultItemEventHandler.prototype.setSliderItem = function(item, label) {
  this.timeObject = item;  
  //console.log("time item property list: "+(Object.getOwnPropertyNames(item))); 
  if (item.dom) {
  $(item.dom).prepend("<div class='description'></div>");
  $(item.dom).hover(function() {						
						$(this).children(".description").text(label).show();
						//console.log(label);
					},
					function() {
						$(this).children(".description").hide();
						
					}					
					);  
  }
};
