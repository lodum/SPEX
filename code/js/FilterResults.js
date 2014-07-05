function FilterResults(){}

FilterResults.prototype.filterWKT=function(spexresultset){
  
  //remove all the wkt-variables from resultset which appear in spatial constraints, and are not inside the constraint-windows
  var allWKT=spexresultset.getWKT();
  var WKTvars=[];
  var sc=spexresultset.spatialConstraints.slice();
  for(var i=0; i<allWKT.length; i++){
    var wktvar=allWKT[i][2];
    if(wktvar!="__noWKT"){
      for(var j=0; j<sc.length; j++){
        if(wktvar==sc[j].v&& !boundingBox(allWKT[i][1]).inside(sc[j].w)){
          //remove wktvar from spexresultset
          sc.splice(j,1);
        }
      }
    }
  }
  
  function boundingBox(WKTpolygon){
    //still to be done
  }
  
};
