

function SpaceFilterPane() {

} 	

SpaceFilterPane.prototype.displayGeometry = function(resultset){

	var result = resultset.getWKT();
	var markers = [];
	
	for (i=0;i < result.length;i++){
		
		//omnivore.wkt.parse('POLYGON((35 10, 45 45, 15 40, 10 20, 35 10),(20 30, 35 35, 30 20, 20 30))').bindLabel('Europe-Middle East	 Donut').addTo(map.LMap);
	
		omnivore.wkt.parse(result[i][1]).bindLabel(result[i][0]).addTo(map.LMap);
		markers.push(omnivore.wkt.parse(result[i][1]));
	}

	var group = new L.featureGroup(markers);
	map.LMap.fitBounds(group.getBounds());

}
