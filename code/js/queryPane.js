/*
	QueryPane class
	
	Author: Peter Zimmerhof
*/

var queryPane = new function(){

	// Variables
	this.varCount = 0;

	// Height and Width of the queryPane
	this.width = '500',
	this.height = '700';

	// Main visual
	this.vis = null;

	// D3.js force
	this.force = null;

	// Visual classes
	this.visNode = null;
	this.visPath = null;
	this.visPathText = null;

	// Visual elements
	this.node = null;
	this.path = null;
	this.pathText = null;

	// Data
	this.nodes = [{id: 0, name: 'a', varname: 'var'+ (this.varCount++), x: 0, y: 0, variable: true, constraint: false},
				{id: 0, name: 'maps:Map', varname: '', x: 100, y: 0, variable: false, constraint: false}];
	this.links = [{id: 0, name: 'a', source: this.nodes[0], target: this.nodes[1], arrow: true}];

	// Selected node
	this.selected = null;

	// Context menu
	this.menu = null;

	// Node drag beahavior
	this.node_drag = null;

	

	// Initialization
	this.init = function() {

		d3.select(window)
    		.on("resize", queryPane.resize);

		// Declare a spot for the graph
		this.vis = d3.select("#queryPane").append("svg")
		.attr({
			"width": "100%",
			"height": "100%"
		})
		//.attr("viewBox", "0 0 " + this.width + " " + this.height )
		.attr("preserveAspectRatio", "xMidYMid")
		.attr("pointer-events", "all");

		// define arrow markers for graph links
		this.vis.append('svg:defs').append('svg:marker')
		.attr('id', 'arrow')
		.attr('viewBox', '0 -5 10 10')
		.attr('refX', 6)
		.attr('markerWidth', 3)
		.attr('markerHeight', 3)
		.attr('orient', 'auto')
		.append('svg:path')
		.attr('d', 'M0,-5L10,0L0,5')
		.attr('fill', '#000');

		this.menu = d3.select("#contextMenu");

		// Create the graph
		this.force = d3.layout.force()
		.gravity(.05)
		.distance(200)
		.charge(-800)
		.chargeDistance(300)
		.on('tick', this.tick).size([700, 500]);


		this.node_drag = d3.behavior.drag()
		.on("dragstart", queryPane.dragStart)
		.on("drag", queryPane.dragMove)
		.on("dragend", queryPane.dragEnd);

		// Add the data
		this.force.nodes(this.nodes)
		.links(this.links)
		.start();

		this.visPath = this.vis.append('svg:g');

		this.visPathText = this.vis.append('svg:g');

		this.visNode = this.vis.append('svg:g');

		this.resize();

		this.update();

	};



	// Graph animation function
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



	// Graph update function
	this.update = function() {

		this.path = this.visPath.selectAll(".link").data(this.links);

		this.pathText = this.visPathText.selectAll(".link").data(this.links);

		this.node = this.visNode.selectAll(".node").data(this.nodes);


		// update existing links
		this.path.classed('selected', false)
		.style('marker', function(d) { return d.arrow ? 'url(#arrow)' : ''; });


		// add new links
		gPath = this.path.enter().append('svg:path')
		.attr('class', 'link')
		.classed('selected', function(d) { return false; })
		.style('marker', function(d) { return d.arrow ? 'url(#arrow)' : ''; });

		gPath.on("click", function(d) {
			queryPane.menu.datum(queryPane.selected = d).call(queryPane.showContextMenu);

			

			queryPane.path.classed("selected", function(d) { 
				return d == queryPane.selected; 
			});
		});


		this.pathText.enter().append('svg:text')
		.data(this.links)
		.attr('class', 'link')
		.attr('x', 20)
		.attr('y', 20)
		.text(function(d){return d.name;});

		// remove old links
		this.path.exit().remove();
		this.pathText.exit().remove()


		// Draw the nodes
		// Update the new nodes 
		var g = this.node.enter().append("svg:g")
		.attr('class', 'node')
		.classed('selected', function(d) { return false; });


		var circ = g.append('svg:circle')
		.attr('r', 10)
		.style('fill', function(d) { 
			rgb = "#cae6ed";

			if (d.constraint)
				rgb = "#eff2d8";

			return d3.rgb(rgb);
		})
		.style('stroke', function(d) { 
			rgb = "#006E89";

			if (d.constraint)
				rgb = "#b1c800";

			return d3.rgb(rgb); 
		});


		g.on("click", function(d) {

			queryPane.logSubelements(d);

			if (d3.event.defaultPrevented) return;
			queryPane.menu.datum(queryPane.selected = d).call(queryPane.showContextMenu);

			document.getElementById('queryS').value = queryPane.selected.name;
			document.getElementById('queryVar').checked = queryPane.selected.variable;
			document.getElementById('querySpat').checked = queryPane.selected.constraint;

			queryPane.node.classed("selected", function(d) { 
				return d == queryPane.selected; 
			});
		});

		g.call(this.node_drag);

		g.append('svg:text')
		.attr('x', -4)
		.attr('y', 5)
		.attr('class', 'var')
		.text(function(d) { return (d.variable) ? '?': ''; });

		g.append('svg:text')
		.attr('x', 15)
		.attr('y', 5)
		.attr('class', 'id')
		.text(function(d) { return d.name; });

		this.node.classed("selected", function(d) { 
			return d == queryPane.selected; 
		});

		this.node.select("text.id")
      	.text(function(d) { 
      		return d.name; 
      	});

      	this.node.select("text.var")
      	.text(function(d) { 
      		return (d.variable) ? '?': '';
      	});

      	this.node.select("circle")
      	.style('fill', function(d) { 
			rgb = "#cae6ed";

			if (d.constraint)
				rgb = "#eff2d8";

			return d3.rgb(rgb);
		})
		.style('stroke', function(d) { 
			rgb = "#006E89";

			if (d.constraint)
				rgb = "#b1c800";

			return d3.rgb(rgb); 
		});

		this.node.exit().remove();
	};



	// Show context menu
	this.showContextMenu = function(menu) {
		queryPane.menu.each(function(d) {
			d3.select(this).style("display", "block")
			.style("left", d.px + 10 + "px")
			.style("top", d.py + 15 + "px");
		});
	};

	// Hide context menu
	this.hideContextMenu = function(){
		queryPane.menu.each(function(d) {
			d3.select(this).style("display", "none");
		});
	};



	// Node drag start
	this.dragStart = function(d, i) {
		d3.event.sourceEvent.stopPropagation();

		queryPane.hideContextMenu();

		queryPane.force.stop(); // stops the force auto positioning before you start dragging
	};

	// Node drag move
	this.dragMove = function(d, i) {

		d3.event.sourceEvent.stopPropagation();

		d.px = d3.event.x;
		d.py = d3.event.y;
		d.x = d3.event.x;
		d.y = d3.event.y; 

		queryPane.tick(); // this is the key to make it work together with updating both px,py,x,y on d !
	};

	// Node drag end
	this.dragEnd = function(d, i) {

		d3.event.sourceEvent.stopPropagation();

		//d.fixed = true; // of course set the node to fixed so the force doesn't include the node in its auto positioning stuff
		queryPane.tick();
		queryPane.force.resume();
	};



	// 
	this.add = function(){
		queryPane.nodes.push({id: queryPane.nodes.length, name: document.getElementById('queryC').value,
			variable: false, constraint: document.getElementById('querySpat').checked }); //'?'});//
		queryPane.links.push({id: queryPane.links.length, name: document.getElementById('queryP').value, //'a',//
			source: this.nodes.indexOf(queryPane.selected), target: this.nodes[queryPane.nodes.length - 1], 
			arrow: true});

		this.update();

		this.force.start();

		queryPane.updateQuery();
	};

	// 
	this.addToSelected = function(pLabel, pClass, cLabel, cClass) {

	};

	// 
	this.updateSelected = function() {

		if (this.isNode(queryPane.selected)) {
			queryPane.selected.name = document.getElementById('queryS').value;
			queryPane.selected.variable = document.getElementById('queryVar').checked;
			queryPane.selected.constraint = document.getElementById('querySpat').checked;

			queryPane.updateQuery();

			this.update();
		};
	};

	// 
	this.removeSelected = function() {

	};


	this.resize = function() {
	  width = window.innerWidth -400;
	  height = window.innerHeight - 200;
	  queryPane.vis
	      .attr("width", width)
	      .attr("height", height);

	  queryPane.force.size([width, height]);

	  queryPane.force.start();
	};


	// 
	this.isNode = function(node) {
		return (this.nodes.indexOf(node) >= 0);
	};

	// 
	this.isLink = function(link) {
		return (this.links.indexOf(link) >= 0);
	};

	// 
	this.logSubelements = function(node) {

		console.log(node.name);

		for (var i = 0; i < this.links.length; i++) {
			if (this.links[i].source == node) {
				console.log(this.links[i].name);
				//console.log(this.links[i].target.name);
				this.logSubelements(this.links[i].target);
			};
		};
	};

	this.updateQuery = function() {
		spex.q = new SPEXQuery();

		this.rParseQuery(this.nodes[0]);
	};

	this.parseQuery = function() {
		this.rParseQuery(this.nodes[0]);	
	};

	this.rParseQuery = function(node) {

		for (var i = 0; i < this.links.length; i++) {
			if (this.links[i].source == node) {

				subject = node.variable ? '?' + node.name : node.name;
				//this registers user selected variables in query
				if (node.variable) {spex.q.SPEXvariable(subject);}
				
				predicate = this.links[i].name;
				object = this.links[i].target.variable ? '?' + this.links[i].target.name : this.links[i].target.name;

				spex.q.where(subject, predicate, object);
				//this registers user selected variables in query
				if (this.links[i].target.variable) {spex.q.SPEXvariable(object);}
				//console.log(this.links[i].name);
				//console.log(this.links[i].target.name);
				this.rParseQuery(this.links[i].target);
			};
		};
	};

	this.setSpatialVars = function(vars) {

		for (variable in vars) {
		
			for (var i = 0; i < this.nodes.length; i++) {
				if (this.nodes[i].name == variable) {
					this.nodes[i].constraint = true;
				}
				else {
					this.nodes[i].constraint = false;
				};
			};
		};

		this.update();
	};

	this.setTemporalVars = function(vars) {

		for (variable in vars) {
		
			for (var i = 0; i < this.nodes.length; i++) {
				if (this.nodes[i].name == variable) {
					this.nodes[i].constraint = true;
				}
				else {
					this.nodes[i].constraint = false;
				};
			};
		};

		this.update();
	};

};