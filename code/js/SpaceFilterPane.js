

function SpaceFilterPane() {

} 	

SpaceFilterPane.prototype.displayGeometry = function(resultset){

	var result = resultset.getWKT();
	console.log(JSON.stringify(result));
	var markers = [];
	
	
	for (i=0;i < result.length;i++){
		
		//omnivore.wkt.parse('POLYGON((35 10, 45 45, 15 40, 10 20, 35 10),(20 30, 35 35, 30 20, 20 30))').bindLabel('Europe-Middle East	 Donut').addTo(map.LMap);

		//Checks if there is a CRS in the WKT literal
		if(result[i][1].indexOf('<') === -1)
		{
			omnivore.wkt.parse(result[i][1]).bindLabel(result[i][0]).addTo(map.LMap);
			markers.push(omnivore.wkt.parse(result[i][1]));
		} else {

			var geometryonly = result[i][1].substring(result[i][1].indexOf('>')+1, result[i][1].length); 
			//console.log(result[i][0].trim() + " @@@ " + geometryonly.trim());

			omnivore.wkt.parse(geometryonly.trim()).bindLabel(result[i][0].trim()).addTo(map.LMap);
			markers.push(omnivore.wkt.parse(geometryonly.trim()));

			
		}
	
	}

	var group = new L.featureGroup(markers);
	map.LMap.fitBounds(group.getBounds());

}
