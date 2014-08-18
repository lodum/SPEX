var slider = new function(){
	this.timeline;
	// Initialization
	this.init = function() {

		//$( "#slider" ).dateRangeSlider({
		//	bounds: {min: new Date(2000,0,1).valueOf(), max: new Date(2011,0,1).valueOf()},
		//	defaultValues: {min: new Date(2006,11,11).valueOf(), max: new Date(2009,1,11).valueOf()}
		//});			
		
		//source : http://almende.github.io/chap-links-library/timeline.html
        	
        	// Create and populate a data table (example).
        	var data = [
				//{
				//'start': new Date(1980, 7, 15),
				//'end': new Date(2001, 8, 2),  // end is optional
				//'content': 'Trajectory A'
				// Optional: a field 'group'
				  // Optional: a field 'className'
				  // Optional: a field 'editable'		
				//},
				//{
				//'start': new Date(1990, 7, 15),
				//'end': new Date(2001, 8, 2),  // end is optional
				//'content': 'Trajectory B'
				// Optional: a field 'group'
				  // Optional: a field 'className'
				  // Optional: a field 'editable'		
				//}
		];
       

        
        	// specify options
        	var options = {
          		"width":  "100%",
          		"height": "auto",
		  	"minHeight" : "40px",
		  	"stackEvents" : false ,
          		"style": "range" // optional
        	};

        
            	// Instantiate our timeline object.
        	this.timeline = new links.Timeline(document.getElementById('slider'));
		
		// Draw our timeline with the created data and options
		this.timeline.draw(data, options);
		
		//event listeners
		function onselect() {
			var sel = slider.timeline.getSelection();
			if (sel.length) {
				if (sel[0].row != undefined) {//row refers to position in item array
					var row = sel[0].row;
				  	console.log("selected item:" + JSON.stringify(slider.timeline.getItem(row)));
				  	alert("event selected!");
				  	/*
				  	if (getItem(row)!= undefined){
						var i = getItem(row);
						//i.content
				  	}
				  	document.title = "event " + row + " selected";
				  	*/
				}
			}
		}

		links.events.addListener(this.timeline, 'select', onselect);
	};
	  
 	this.displaytime = function (data){
	//Data needs to come in the format specified above 

		var options = {
          		"width":  "100%",
          		"height": "auto",
		  	"minHeight" : "40px",
		  	"stackEvents" : false ,
          		"style": "range" // optional
        	};

        
            	// Instantiate our timeline object.
        	this.timeline = new links.Timeline(document.getElementById('slider'));
		
		// Draw our timeline with the created data and options
		this.timeline.draw(data, options);
		
		//event listeners
		function onselect() {
			//console.log("onselect() fired");
			var sel = slider.timeline.getSelection();
			if (sel.length) {
				if (sel[0].row != undefined) {//row refers to position in item array
					var row = sel[0].row;
				  	console.log("selected item: " + JSON.stringify(slider.timeline.getItem(row)));
				  	alert("event selected!");
				  	/*
				  	if (getItem(row)!= undefined){
						var i = getItem(row);
						//i.content
				  	}
				  	document.title = "event " + row + " selected";
				  	*/
				}
			}
		}

		links.events.addListener(this.timeline, 'select', onselect);
		$('#slider').each(function(){
			console.log("slider element: " + JSON.stringify($(this));
		});
	}; 

};
