
/**
* A special filter for space literals (WKT) which filters query results by the current space window
* @class
**/
function FilterResults(){}
/** @function */
FilterResults.prototype.filterWKT=function(spexresultset){
  
  //Remove all the wkt-results from resultset which don't fulfill the spatial constraints.
  
  
  var sc=spex.q.spatialConstraints;
  var headVars=spexresultset.allResults.head.vars;
  var sols=spexresultset.allResults.results.bindings;
  var wktVars=[];
  for(var i=0;i<headVars.length;i++){//Store all the (spatially constrained) wkt-Variables in wktVars
    if(headVars[i].substring(headVars[i].length - 5, headVars[i].length) === "__wkt") wktVars.push(headVars[i]);
  }
  console.log("FilterResults.prototype.filterWKT(): WKT vars detected while filtering results: " + wktVars);
  if(wktVars.length>0){//Do only if wktVars is not empty
    for(var j=0; j<sols.length; j++){ // Go through the results
      result=sols[j]; // Pick a result
      for(var i=0; i<wktVars.length; i++){ // Go through the wktVars
        if(result[wktVars[i]]){//if wktVar is there in the result
          var wktString=result[wktVars[i]].value;

          // Check if there is really a Window object
          if (sc["?"+wktVars[i].substring(0,wktVars[i].length - 5)] != null && sc["?"+wktVars[i].substring(0,wktVars[i].length - 5)] != undefined) {
            //console.log("FilterResults.prototype.filterWKT(): wktString for solution No." + j + ": " + wktString);
             //remove if bounding-box is not inside constraint window
            //if(!boundingBox(wktString).inside(sc[wktVars[i].substring(0,wktVars[i].length - 5)])){
            //console.log("FilterResults.prototype.filterWKT(): corresponding constraint window: " + JSON.stringify(sc["?"+wktVars[i].substring(0,wktVars[i].length - 5)]));
            if(!boundingBox(wktString).inside(sc["?"+wktVars[i].substring(0,wktVars[i].length - 5)])){
              sols.splice(j,1);
              j--;
            }
          }
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
    str=cutStringFrontUptoChar(str,'('); //cut off beginning of string upto the last '(' 
    //console.log("FilterResults.prototype.filterWKT(): WKT string cut up to the last '(': " + str);
    //remove all the '(' and ')' characters
    for(var i=0;i<str.length;i++){
      if(str[i]=='('||str[i]==')'){
        str=str.substring(0,i)+str.substring(i+1);
        i--;
      }
    }
    //console.log("FilterResults.prototype.filterWKT(): WKT string with all '('s and ')'s removed: " + str);
    strArray=str.split(","); // fill strArray
    //console.log("FilterResults.prototype.filterWKT(): WKT string split at ',': " + JSON.stringify(strArray));
    //cut off spaces at beginning and end of elements of strArray, and split up lat & long into the arrays.
    for(var i=0;i<strArray.length;i++){
      var s=strArray[i];
      //console.log("string before removing spaces:" + s);
      s=removeSpacesAtEnds(s);
      //console.log("spaces front and end removed (returned):" + JSON.stringify(s));
      s=s.split(" "); // type of s changes from string to array
      //console.log("lat and long split: " + JSON.stringify(s));
      if(s.length!=2) console.log("Error in strArray["+i+"]");
      longArray.push(parseInt(s[0]));
      latArray.push(parseInt(s[1]));
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
  
  
  function cutStringFrontUptoChar(string,ch){
    for(var i=0;i<string.length;i++){
      if(string[i]==ch&&string[i+1]!=ch){
        string=string.substring(i+1);
        break;
      }
    }
    return string;
  }
  
  function removeSpacesFront(string,ch){
    /*
    for(var i=0;i<string.length;i++){
      if(string[i]==ch&&string[i+1]!=ch){
        string=string.substring(i+1);
        break;
      }
    }
    return string;
    */
    if(string[0] === ch) {
      string = string.substring(1, string.length);
      return removeSpacesFront(string, ch);
    } else {
      //console.log("space at front removed:" + string);
      return string;
    }
  }
  
  function removeSpacesBack(string,ch){
    /*
    for(var i=string.length - 1; i>=0 ;i--){
      if(string[i]==ch&&string[i-1]!=ch){
        string=string.substring(0,i);
        break;
      }
    }
    return string;
    */
    if(string[string.length - 1] === ch) {
      string = string.substring(0, string.length - 1);
      return removeSpacesBack(string, ch);
    } else {
      //console.log("space at back removed:" + string);
      return string;
    }
  }
  
  function removeSpacesAtEnds(string){
    string = removeSpacesFront(removeSpacesBack(string,' '), ' ');
    return string;
  }
  
};


