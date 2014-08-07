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
	this.nodes = [{id: 0, label: '', className: '', variable: true, x: 100, y: 0, constraint: false}];
	this.links = [];

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
		this.updateQuery();
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
		.style('marker', 'url(#arrow)');


		// add new links
		gPath = this.path.enter().append('svg:path')
		.attr('class', 'link')
		.classed('selected', function(d) { return false; })
		.style('marker', 'url(#arrow)');

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
		.text(function(d){return d.label;});

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
		.text(function(d) { return d.label; });

		this.node.classed("selected", function(d) { 
			return d == queryPane.selected; 
		});

		this.node.select("text.id")
      	.text(function(d) { 
      		return d.label; 
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
		d3.select("#contextMenu")
		.html('<div style="position:inherit; top: 0; right: 0; padding: 3px;"><a onclick="queryPane.hideContextMenu()">X</a></div> \
				<b>Menu:</b> \
				<div> \
					I am looking for <input type="text" id="queryS" value="Person"></input><br> \
					<input type="checkbox" id="queryVar">Variable<br> \
					<input type="button" id="queryAdd" onclick="queryPane.updateSelected()" value="Update"><br> \
					<br> \
					<a href="javascript:void(0)" onclick="queryPane.showContextMenuAddOut();">Add outgoing Link</a><br> \
					<a href="javascript:void(0)" onclick="queryPane.showContextMenuAddIn();">Add incoming Link</a> \
				</div>');

		document.getElementById('queryS').value = queryPane.selected.label;
		document.getElementById('queryVar').checked = queryPane.selected.variable;
		
		queryPane.menu.each(function(d) {
			d3.select(this).style("display", "block")
			.style("left", d.px + 10 + "px")
			.style("top", d.py + 50 + 15 + "px");
		});
	};

	// 
	this.showContextMenuAddOut = function() {
		d3.select("#contextMenu")
		.html('<div style="position:inherit; top: 0; right: 0; padding: 3px;"><a onclick="queryPane.hideContextMenu()">X</a></div> \
				<b>Menu:</b> \
				<div> \
					<div class="linkAdd"> \
						<input type="text" id="queryS" value="" readonly></input> \
						<input type="text" id="queryP" value=""></input> \
						<input type="text" id="queryO" value=""></input> \
					</div> \
					<input type="button" id="queryAdd" onclick="queryPane.addOut()" value="Add"> \
					<br><br> \
				</div>');

		document.getElementById('queryS').value = queryPane.selected.label;
	};

	//
	this.showContextMenuAddIn = function() {
		d3.select("#contextMenu")
		.html('<div style="position:inherit; top: 0; right: 0; padding: 3px;"><a onclick="queryPane.hideContextMenu()">X</a></div> \
				<b>Menu:</b> \
				<div> \
					<div class="linkAdd"> \
						<input type="text" id="queryS" value=""></input> \
						<input type="text" id="queryP" value=""></input> \
						<input type="text" id="queryO" value="" readonly></input> \
					</div> \
					<input type="button" id="queryAdd" onclick="queryPane.addIn()" value="Add"> \
					<br><br> \
				</div>');

		document.getElementById('queryO').value = queryPane.selected.label;
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

		queryPane.force.stop();
	};

	// Node drag move
	this.dragMove = function(d, i) {

		d3.event.sourceEvent.stopPropagation();

		d.px = d3.event.x;
		d.py = d3.event.y;
		d.x = d3.event.x;
		d.y = d3.event.y; 

		queryPane.tick();
	};

	// Node drag end
	this.dragEnd = function(d, i) {

		d3.event.sourceEvent.stopPropagation();

		queryPane.tick();
		queryPane.force.resume();

		queryPane.hideContextMenu();
	};



	// 
	this.addOut = function(){
		queryPane.nodes.push({id: queryPane.nodes.length, label: document.getElementById('queryO').value,
			variable: true, constraint: false }); //'?'});// variable should be true by default
		queryPane.links.push({id: queryPane.links.length, label: document.getElementById('queryP').value, //'a',//
			source: this.nodes.indexOf(queryPane.selected), target: this.nodes[queryPane.nodes.length - 1]});

		this.update();

		this.force.start();

		queryPane.updateQuery();
	};

	// 
	this.addIn = function(){
		queryPane.nodes.push({id: queryPane.nodes.length, label: document.getElementById('queryS').value,
			variable: false, constraint: false }); //'?'});//
		queryPane.links.push({id: queryPane.links.length, label: document.getElementById('queryP').value, //'a',//
			source: this.nodes[queryPane.nodes.length - 1], target: this.nodes.indexOf(queryPane.selected)});

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
			queryPane.selected.label = document.getElementById('queryS').value;
			queryPane.selected.variable = document.getElementById('queryVar').checked;

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

		console.log(node.label);

		for (var i = 0; i < this.links.length; i++) {
			if (this.links[i].source == node) {
				console.log(this.links[i].label);
				//console.log(this.links[i].target.label);
				this.logSubelements(this.links[i].target);
			};
		};
	};

	this.updateQuery = function() {

		queryPane.hideContextMenu();

		spex.q = new SPEXQuery();

		this.parseQuery();

		//document.getElementById("query").innerHTML = spex.q.getSPARQL();
		spex.ex.executeQuery(spex.q,document.getElementById("endpoint").value); 
	};

	this.parseQuery = function() {

		for (var i = 0; i < this.nodes.length; i++) {

			var node = this.nodes[i];

			if (node.variable && node.label != '') {
				spex.q.where(this.getNodeVarName(node), 'a', node.label);
				spex.q.SPEXvariable(this.getNodeVarName(node),node.label);
				//set variables and their labels for displaying the variable
			};

			for (var j = 0; j < this.links.length; j++) {

				var link = this.links[j];

				if (link.source == node) {
					subject = node.variable ? this.getNodeVarName(node) : node.label;
					//this registers user selected variables in query 
					if (this.node.variable) {spex.q.SPEXvariable(subject,node.label);}

					predicate = link.label;
					object = link.target.variable ? this.getNodeVarName(link.target) : link.target.label;

					spex.q.where(subject, predicate, object);

					//this registers user selected variables in query
					if (link.target.variable) {spex.q.SPEXvariable(object,link.target.label);}

					//console.log(this.links[i].label);
					//console.log(this.links[i].target.label);
				};
			};
		};

	};

	this.getNodeVarName = function(node) {
		return '?var' + node.id;
	};

	this.setSpatialVars = function(vars) {

		for (variable in vars) {
		
			for (var i = 0; i < this.nodes.length; i++) {
				if (this.getNodeVarName(this.nodes[i]) == '?' + variable) {
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
				if (this.getNodeVarName(this.nodes[i]) == '?' + variable) {
					this.nodes[i].constraint = true;
				}
				else {
					this.nodes[i].constraint = false;
				};
			};
		};

		this.update();
	};

	this.setConstraint = function() {

		var win = new Window();
		win.setCorners(
			map.LMap.getBounds()._northEast.lat,
			map.LMap.getBounds()._northEast.lng,
			map.LMap.getBounds()._southWest.lat,
			map.LMap.getBounds()._southWest.lng
			);

		spex.q.setSpatialConstraint(
			queryPane.getNodeVarName(queryPane.selected)
			, win);

		queryPane.updateQuery();
	};

	this.removeConstraint = function() {

		spex.q.setSpatialConstraint(
			queryPane.getNodeVarName(queryPane.selected)
			, null);

		queryPane.updateQuery();
	};

};