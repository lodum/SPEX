var map = new function(){

	this.LMap = undefined;

	// Initialization
	this.init = function() {

		this.LMap = L.map('map').setView([0, 0], 3);
	    // add an OpenStreetMap tile layer
		L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
			attribution: '&amp;copy; &lt;a href="http://osm.org/copyright"&gt;OpenStreetMap&lt;/a&gt; contributors'
		}).addTo(this.LMap);
	    
		var info = L.control();

		info.onAdd = function (map) {
		    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
		    this.update();
		    return this._div;
		};

		// method that we will use to update the control based on feature properties passed
		info.update = function () {
			var bounds = map.LMap.getBounds();
		    this._div.innerHTML = '<h4>BoundingBox</h4><hr><h5>NE:'
		    	+bounds._northEast+'</h5><br/><h5>SW:'
		    	+bounds._southWest+'</h5>';
		};

		info.addTo(this.LMap);

		function updateBBox() {
			info.update();
		}

		this.LMap.on('drag', updateBBox);
		this.LMap.on('zoomend', updateBBox)
	};

};