

function Window(){ }

Window.prototype.upperRightLatitude = 0.0;
Window.prototype.upperRightLongitude = 0.0;
Window.prototype.lowerLeftLatitude = 0.0;
Window.prototype.lowerLeftLongitude = 0.0;
Window.prototype.variable = "";


// window1.inside(window2) returns true, if window1 is inside window2.
Window.prototype.inside=function(outerWindow){
  if(this.upperRightLatitude<=outerWindow.upperRightLatitude && this.upperRightLongitude<=outerWindow.upperRightLongitude && this.lowerLeftLatitude>=outerWindow.lowerLeftLatitude && this.lowerLeftLongitude>=outerWindow.lowerLeftLongitude) return true;
  else return false;
}
