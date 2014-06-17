

function SpaceFilterPane() {
//	this.currentSpatialWindow;
} 	

SpaceFilterPane.prototype.displayGeometry = function(resultset){

	for (i=0;i < resultset.getWKT().length;i++){
		omnivore.wkt.parse(resultset.getWKT()[i][1]).bindLabel(resultset.getWKT()[i][0]).addTo(this.LMap);
	}


}
