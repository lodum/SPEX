function FilterResults(){}

FilterResults.prototype.filterWKT=function(spexresultset){
  
  //Get all the wkt-variables and their wkt which appear in spatial constraints:
  //WKTvars contains two columns: [variable, wkt, window of spatial constraints]
  var allWKT=spexresultset.getWKT();
  var WKTvars=[];
  var sc=spexresultset.spatialConstraints.slice();
  for(var i=0; i<allWKT.length; i++){
    var wktvar=allWKT[i][2];
    var wkt=allWKT[i][1];
    if(wktvar!="__noWKT"){
      for(var j=0; j<sc.length; j++){
        if(wktvar==sc[j].v){
          WKTvars.push([wktvar,wkt,sc[j].w]);
          sc.splice(j,1);
        }
      }
    }
  }
  
  
  
}
