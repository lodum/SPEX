function FilterResults(){}

FilterResults.prototype.filterWKT=function(spexresultset){
  
  //remove all the wkt-variables from resultset which appear in spatial constraints, and are not inside the constraint-windows
  var allWKT=spexresultset.getWKT();
  var sc=spexresultset.spatialConstraints.slice();
  var sols=spexresultset.allResults.results.bindings;
  for(var i=0; i<allWKT.length; i++){
    var wktvar=allWKT[i][2];
    if(sc.length==0){
      i=allWKT.length;
      wktvar="__noWKT";
    } 
    if(wktvar!="__noWKT"){
      for(var j=0; j<sc.length; j++){
        if(wktvar==sc[j].v){
          sc.splice(j,1);
          j=sc.length;
          if(!boundingBox(allWKT[i][1]).inside(sc[j].w)){
            for(var k=0;k<sols.length; k++){
              //remove wktvar from sols
              if(wktvar)
            }
          }
        }
      }
    }
  }
  
  function boundingBox(WKTstring){
    var wktWindow= new Window();
    //still to be done
    return wktWindow;
  }
  
};
