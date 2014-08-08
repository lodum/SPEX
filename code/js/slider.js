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
				{
				'start': new Date(1980, 7, 15),
				'end': new Date(2001, 8, 2),  // end is optional
				'content': 'Trajectory A'
				// Optional: a field 'group'
				  // Optional: a field 'className'
				  // Optional: a field 'editable'		
				},
				{
				'start': new Date(1990, 7, 15),
				'end': new Date(2001, 8, 2),  // end is optional
				'content': 'Trajectory B'
				// Optional: a field 'group'
				  // Optional: a field 'className'
				  // Optional: a field 'editable'		
				}
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
}; 

};
