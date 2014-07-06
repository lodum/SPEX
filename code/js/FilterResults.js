function FilterResults(){}

FilterResults.prototype.filterWKT=function(spexresultset){
  
  //remove all the wkt-results from resultset which don't fulfill the spatial constraints.
  // Code is longer because the wkt-results are parsed first, and only then the spatial constraints.
  // This is (possibly) more effective.
  var allWKT=spexresultset.getWKT();
  var sc=spexresultset.spatialConstraints.slice();
  var sols=spexresultset.allResults.results.bindings;
  var k=0;//k determines index shift in sols, as solutions are removed.
  for(var i=0; i<allWKT.length; i++){
    //if there are no spatial constraints, no effort has to be wasted.
    if(sc.length==0) break;
    var wktArray=allWKT[i];
    //find wkt-results
    if(wktArray.length==4){
      //choose the wkt-variable of this wkt-result
      var wktVar=wktArray[2];
      for(var j=0; j<sc.length; j++){
        //check if wkt-variable has spatial constraints
        if(wktVar==sc[j].v){
          //check if the wkt-result for this variable fulfills the spatial constraint
          //If it doesn't, remove the result from spexresultset
          if(!boundingBox(wktArray[1]).inside(sc[j].w)){
             //removal, with earlier index-shift
             sols.splice(wktArray[3]+k,1);
             //index shift
             k++;
          }
          // Every var has only one spatial constraint, so exit last for-loop here.
          break;
        }
      }
    }
  }
  
  function boundingBox(WKTstring){
    var wktWindow= new Window();
    var str="";
    var strArray=[];
    var latArray=[];
    var longArray=[];
    var a,b,c,d;
    //cut off beginning of string upto the last '(' 
    for(var i=0;i<WKTstring.length;i++){
      if(WKTstring[i]=='('&&WKTstring[i+1]!='('){
        str=WKTstring.substring(i+1);
        break;
      }
    }
    strArray=str.split(",");
    for(var i=0;i<strArray.length;i++){
      var s=strArray[i];
      for(var j=0;j<s.length;j++){
        if(s[j]=='('||s[j]==')') //half done
      }
    }
    return wktWindow;
  }
  
};
