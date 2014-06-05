var queryPane = new function(){

	// var
	this.width = '100%',
	this.height = '100%';

	this.colors = d3.scale.category10();

	this.vis = null;
	this.force = null;

	this.node = null;
	this.path = null;
	this.pathText = null;

	this.nodes = [{id: 0, name: '?', x: 100, y: 50},
				{id: 1, name: 'Person', x: 30, y: 100},
				{id: 2, name: 'Map', x: 100, y: 150}];

	this.links = [{id: 0, name: 'a', source: this.nodes[0], target: this.nodes[1]},
				{id: 1, name: 'a', source: this.nodes[0], target: this.nodes[2]}];

	this.selected = null;

	this.menu = null;

	this.node_drag = null;

	// Initialization
	this.init = function() {
		
		// Declare a spot for the graph
		this.vis = d3.select("#queryPane").append("svg")
		.attr({
	        "width": this.width,
	        "height": this.height
      	})
      	.attr("preserveAspectRatio", "xMidYMid meet")
      	.attr("pointer-events", "all");
	 
	 	this.menu = d3.select("#contextMenu");

		// Create the graph
		this.force = d3.layout.force()
			.gravity(.05)
			.distance(150)
			.charge(-200)
			.chargeDistance(150)
			.on('tick', this.tick).size([500, 500]);
	 

		this.node_drag = d3.behavior.drag()
        .on("dragstart", queryPane.dragstart)
        .on("drag", queryPane.dragmove)
        .on("dragend", queryPane.dragend);

		// Add the data
		this.force.nodes(this.nodes)
			.links(this.links)
			.start();	

		this.path = this.vis.append('svg:g').selectAll(".link")
		.data(this.links);

		// update existing links
		this.path.classed('selected', function(d) { return false; })
		  .style('marker-start', function(d) { return d.left ? 'url(#start-arrow)' : ''; })
		  .style('marker-end', function(d) { return d.right ? 'url(#end-arrow)' : ''; });


		// add new links
		gPath = this.path.enter().append('svg:path')
		  .attr('class', 'link')
		  .classed('selected', function(d) { return false; })
		  .style('marker-start', function(d) { return d.left ? 'url(#start-arrow)' : ''; })
		  .style('marker-end', function(d) { return d.right ? 'url(#end-arrow)' : ''; });

		gPath.on("click", function(d) {
        	queryPane.menu.datum(queryPane.selected = d).call(queryPane.contextMenu);
    	});

		//gPath.exit().remove();

		  this.pathText = this.vis.append('svg:g').selectAll(".link")
		  this.pathText = this.pathText.data(this.links);
		this.pathText.enter().append('svg:text')
		  .data(this.links)
		  .attr('x', 20)
		  .attr('y', 20)
		  .text(function(d){return d.name;});

		// remove old links
		this.path.exit().remove();
		this.pathText.exit().remove();

		// // Draw the links
		// this.link = this.vis.append('svg:g').selectAll(".link").data(this.force.links());
	 
		// // Update the new links
	 // 	var gLink = this.link.enter().append('svg:g')

		// gLink.append('svg:path')
		//   .attr('class', 'link')
		//   .classed('selected', function(d) { return false; })
		//   .style('marker-start', function(d) { return d.left ? 'url(#start-arrow)' : ''; })
		//   .style('marker-end', function(d) { return d.right ? 'url(#end-arrow)' : ''; })

		// // Remove the old links
		// this.link.exit().remove();
	 


		// Draw the nodes
		this.node = this.vis.append('svg:g').selectAll(".node").data(this.nodes);
	 

		// Update the new nodes 
		var g = this.node.enter().append("svg:g");
		

		var circ = g.append('svg:circle')
	    .attr('class', 'node')
	    .attr('r', 10)
	    .style('fill', function(d) { 
	    	return d3.rgb("#99e").brighter().toString(); 
	    })
	    .style('stroke', function(d) { 
	    	return d3.rgb("#99e").darker().toString(); 
	    });

	    //g.exit().remove();
	    //circ.exit().remove();

	  	g.on("click", function(d) {
	  		if (d3.event.defaultPrevented) return;
        	queryPane.menu.datum(queryPane.selected = d).call(queryPane.contextMenu);
    	});
        // g.call(d3.behavior.drag()
        // .on("drag", function(d) {

        //   queryPane.menu.datum().call(queryPane.contextMenu);
        //   return false;
        // }));
        g.call(this.node_drag);

		g.append('svg:text')
	      .attr('x', 15)
	      .attr('y', 5)
	      .attr('class', 'id')
	      .text(function(d) { return d.name; });
	    
	    this.node.exit().remove();

	};

	// Create the tick function which animates the graph
	this.tick = function()
	{
		queryPane.path.attr('d', function(d) {
		    var deltaX = d.target.x - d.source.x,
		        deltaY = d.target.y - d.source.y,
		        dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY),
		        normX = deltaX / dist,
		        normY = deltaY / dist,
		        sourcePadding = d.left ? 17 : 12,
		        targetPadding = d.right ? 17 : 12,
		        sourceX = d.source.x + (sourcePadding * normX),
		        sourceY = d.source.y + (sourcePadding * normY),
		        targetX = d.target.x - (targetPadding * normX),
		        targetY = d.target.y - (targetPadding * normY);
		    return 'M' + sourceX + ',' + sourceY + 'L' + targetX + ',' + targetY;
		  });

		queryPane.pathText
			.attr("x", function(d) { return ((d.target.x + d.source.x)/2); })
		    .attr("y", function(d) { return ((d.target.y + d.source.y)/2); });

		queryPane.node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

	};

	this.contextMenu = function(menu) {
	  queryPane.menu.each(function(d) {
	    d3.select(this).style("display", "block")
	        .style("left", d.px + 10 + "px")
	        .style("top", d.py + 15 + "px");
	  });
	};

	this.hideContextMenu = function(){
		queryPane.menu.each(function(d) {
	    	d3.select(this).style("display", "none");
	  	});
	}

	this.dragstart = function(d, i) {
		d3.event.sourceEvent.stopPropagation();
		
		queryPane.hideContextMenu();

        queryPane.force.stop() // stops the force auto positioning before you start dragging
    }

    this.dragmove = function(d, i) {
        d.px = d3.event.x;
        d.py = d3.event.y;
        d.x = d3.event.x;
        d.y = d3.event.y; 

        queryPane.tick(); // this is the key to make it work together with updating both px,py,x,y on d !
    }

    this.dragend = function(d, i) {
        //d.fixed = true; // of course set the node to fixed so the force doesn't include the node in its auto positioning stuff
        queryPane.tick();
       queryPane.force.resume();
    }

    this.add = function(){
    	queryPane.nodes.push({id: queryPane.nodes.length, name: '?'});
    	queryPane.links.push({id: queryPane.links.length, name: 'a', source: this.nodes[0], target: this.nodes[queryPane.nodes.length - 1]});

    	

	    queryPane.node.exit().remove();

		queryPane.path.exit().remove();

	 


	    this.force.start();
    }

};