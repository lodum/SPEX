function FilterResults(){}

FilterResults.prototype.filterWKT=function(spexresultset){
  
  //Remove all the wkt-results from resultset which don't fulfill the spatial constraints.
  
  /*
  This part of code is longer because the wkt-results (.getWKT()) are parsed first,
  and only then the spatial constraints.
  This is (possibly) more efficient, becuase getWKT is parsed only once, and mostly  the
  spatialConstraints-array is shorter.
  */
  
  var allWKT=spexresultset.getWKT();
  var sc=spexresultset.spatialConstraints;
  var sols=spexresultset.allResults.results.bindings;
  var k=0; //k determines index shift in sols, as solutions are removed.
  for(var i=0; i<allWKT.length; i++){
    if(sc.length==0) break;//if there are no spatial constraints, no effort has to be wasted.
    var wktArray=allWKT[i];
    if(wktArray.length==4){//choose a wkt-result
      var wktVar=wktArray[2]; //choose the wkt-variable of this wkt-result
      for(var j=0; j<sc.length; j++){ //check if wkt-variable has spatial constraints
        if(wktVar==sc[j].v){
          if(!boundingBox(wktArray[1]).inside(sc[j].w)){//check if wkt-result fulfills spatial constraint
             sols.splice(wktArray[3]+k,1);//If not, remove result from spexresultset, use index-shift
             k++; // shift index
          }
          break; // Every var has only one spatial constraint, so exit last for-loop here.
        }
      }
    }
  }
  
  function boundingBox(WKTstring){
    var str=WKTstring;
    var strArray=[];
    var latArray=[];
    var longArray=[];
    var a,b,c,d;
    var wktWindow=new Window();
    cutCharFromStringFront(str,'('); //cut off beginning of string upto the last '(' 
    //remove all the '(' and ')' characters
    for(var i=0;i<str.length;i++){
      if(str[i]=='('||str[i]==')'){
        str=str.substring(0,i)+str.substring(i+1);
        i--;
      }
    }
    strArray=str.split(","); // fill strArray
    //cut off spaces at beginning and end of elements of strArray, and split up lat & long into the arrays.
    for(var i=0;i<strArray.length;i++){
      var s=strArray[i];
      cutCharFromStringFront(s,' ');
      cutCharFromStringBack(s,' ');
      s=s.split(" "); // type of s changes from string to array
      if(s.length!=2) console.log("Error in strArray["+i+"]");
      latArray.push(parseInt(s[0]));
      longArray.push(parseInt(s[1]));
    }
    if(strArray.length!=latArray.length) console.log("Error in latArray!");
    if(strArray.length!=longArray.length) console.log("Error in longArray!");
    //determine min,max of latArray and longArray
    a = Math.max.apply(null, latArray);
    b = Math.max.apply(null, longArray);
    c = Math.min.apply(null, latArray);
    d = Math.min.apply(null, longArray);
    wktWindow.setCorners(a,b,c,d);
    return wktWindow;
  }
  
  function cutCharFromStringFront(string,char){
    for(var i=0;i<string.length;i++){
      if(string[i]==char&&string[i+1]!=char){
        string=string.substring(i+1);
        break;
      }
    }
  }
  
  function cutCharFromStringBack(string,char){
    for(var i=string.length - 1;i>=0;i--){
      if(string[i]==char&&string[i-1]!=char){
        string=string.substring(0,i);
        break;
      }
    }
  }
  
};


