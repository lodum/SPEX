var map = new function(){

	this.LMap = undefined;

	// Initialization
	this.init = function() {

		//this.LMap = L.map('map').setView([52, 7.6], 3);
	    // add an OpenStreetMap tile layer
//		L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {attribution: ' Map data &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}).addTo(this.LMap);
		this.LMap = L.mapbox.map('map', 'examples.map-i86nkdio').setView([52, 5], 3);

		omnivore.wkt.parse('POLYGON ((35 10, 45 45, 15 40, 10 20, 35 10),(20 30, 35 35, 30 20, 20 30))').bindLabel('Europe-Middle East Donut').addTo(this.LMap);		
		
		// var info = L.control();

		// info.onAdd = function (map) {
		//     this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
		//     this.update();
		//     return this._div;
		// };

		// // method that we will use to update the control based on feature properties passed
		// info.update = function () {
		// 	var bounds = map.LMap.getBounds();
		//     this._div.innerHTML = bounds._northEast + '<br/>' + bounds._southWest;
		// };

		// info.addTo(this.LMap);

		// function updateBBox() {
		// 	info.update();
		// }

		// this.LMap.on('drag', updateBBox);
		// this.LMap.on('zoomend', updateBBox)
	};

};
