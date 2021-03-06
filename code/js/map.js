var map = new function(){

	this.LMap = undefined;
	this.markerGroup = undefined;

	// Initialization
	this.init = function() {


		//this.LMap = L.map('map').setView([52, 7.6], 3);
	    // add an OpenStreetMap tile layer
//		L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {attribution: ' Map data &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}).addTo(this.LMap);
		L.mapbox.accessToken = 'pk.eyJ1Ijoiamltam9uZXMiLCJhIjoib2R0ZUVmTSJ9.9fXpF8LWx9bm2WSW6hg4PQ';
		this.LMap = L.mapbox.map('map', 'mapbox.streets').setView([52, 5], 3);
		this.markerGroup = new L.featureGroup();
		this.markerGroup.addTo(map.LMap);
		//omnivore.wkt.parse('POLYGON ((35 10, 45 45, 15 40, 10 20, 35 10),(20 30, 35 35, 30 20, 20 30))').bindLabel('Europe-Middle East Donut').addTo(this.LMap);

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
