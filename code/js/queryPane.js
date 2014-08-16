/*
	QueryPane class
	
	Author: Peter Zimmerhof
*/

var queryPane = {

	// Variables
	varCount : 0,

	// Height and Width of the queryPane
	width : '500',
	height : '700',

	// Main visual
	vis : null,

	// D3.js force
	force : null,

	// Visual classes
	visNode : null,
	visPath : null,
	visPathText : null,

	// Visual elements
	node : null,
	path : null,
	pathText : null,

	// Data
	nodes : [{id: 0, label: '', className: '', variable: true, x: 100, y: 0, spConstraint: false, teConstraint: false}],
	links : [],

	// Selected node
	selected : null,

	// Context menu
	menu : null,

	// Node drag beahavior
	node_drag : null,

	

	// Initialization
	init : function() {

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
	},



	// Graph animation function
	tick : function()
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

	},



	// Graph update function
	update : function() {

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

			if (d.spConstraint || d.teConstraint)
				rgb = "#eff2d8";

			return d3.rgb(rgb);
		})
		.style('stroke', function(d) { 
			rgb = "#006E89";

			if (d.spConstraint || d.teConstraint)
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

			if (d.spConstraint || d.teConstraint)
				rgb = "#eff2d8";

			return d3.rgb(rgb);
		})
		.style('stroke', function(d) { 
			rgb = "#006E89";

			if (d.spConstraint || d.teConstraint)
				rgb = "#b1c800";

			return d3.rgb(rgb); 
		});

		this.node.exit().remove();
	},



	// Show context menu
	showContextMenu : function(menu) {
		
		var constraintSpLinks = '';
		var constraintTeLinks = '';

		if (queryPane.selected.spConstraint) {
			constraintSpLinks =
				'<br><br>' + 
				'<a href="javascript:void(0)" onclick="queryPane.setSpConstraint();">Set Spatial Constraint</a><br>' +
				'<a href="javascript:void(0)" onclick="queryPane.removeSpConstraint();">Remove Spatial Constraint</a>';
		};

		if (queryPane.selected.teConstraint) {
			constraintTeLinks =
				'<br><br>' + 
				'<a href="javascript:void(0)" onclick="queryPane.setTeConstraint();">Set Temporal Constraint</a><br>' +
				'<a href="javascript:void(0)" onclick="queryPane.removeTeConstraint();">Remove Temporal Constraint</a>';
		};

		d3.select("#contextMenu")
		.html('<div style="position:inherit; top: 0; right: 0; padding: 3px;"><a onclick="queryPane.hideContextMenu()">X</a></div> \
				<div id="contextMenuContent"> \
					<br> \
					I am looking for <input type="text" id="queryS" value="Person"></input><br> \
					<form> \
						<input type="radio" id="queryVar" name="classThing" >&nbsp;Class \
						<input type="radio" id="queryNonVar" name="classThing" >&nbsp;Thing \
					</form> \
					<input type="button" id="queryAdd" onclick="queryPane.updateSelected()" value="Update"><br> \
					<br> \
					<a href="javascript:void(0)" onclick="queryPane.showContextMenuAddOut();">Add outgoing Link</a><br> \
					<a href="javascript:void(0)" onclick="queryPane.showContextMenuAddIn();">Add incoming Link</a>'
					+ constraintSpLinks + constraintTeLinks +
				'</div>');

		spex.sug.createDropdownC('queryS');
		
		document.getElementById('queryS').value = queryPane.selected.label;
		document.getElementById('queryVar').checked = queryPane.selected.variable;
		document.getElementById('queryNonVar').checked = !(queryPane.selected.variable);

		queryPane.menu.each(function(d) {
			d3.select(this).style("display", "block")
			.style("left", d.px + 10 + "px")
			.style("top", d.py + 50 + 15 + "px");
		});

		document.getElementById("queryS").focus();	
	},

	// 
	showContextMenuAddOut : function() {
		d3.select("#contextMenu")
		.html('<div style="position:inherit; top: 0; right: 0; padding: 3px;"><a onclick="queryPane.hideContextMenu()">X</a></div> \
				<div id="contextMenuContent"> \
					<br> \
					<div class="linkAdd"> \
						Things that are \
						<input type="text" id="queryS" value="" disabled></input> \
						connected via \
						<input type="text" id="queryP" value=""></input> \
						to \
						<input type="text" id="queryO" value=""></input> \
						<form> \
							<input type="radio" id="queryVar" name="classThing" checked>&nbsp;Class \
							<input type="radio" id="queryNonVar" name="classThing" >&nbsp;Thing \
						</form> \
					</div> \
					<input type="button" id="queryAdd" onclick="queryPane.addOut()" value="Add"> \
					<br> \
				</div>');

		spex.sug.createDropdownP('queryP');
		spex.sug.createDropdownC('queryO');
		
		document.getElementById('queryS').value = queryPane.selected.label;

		document.getElementById("queryP").focus();
	},

	//
	showContextMenuAddIn : function() {
		d3.select("#contextMenu")
		.html('<div style="position:inherit; top: 0; right: 0; padding: 3px;"><a onclick="queryPane.hideContextMenu()">X</a></div> \
				<div id="contextMenuContent"> \
					<br> \
					<div class="linkAdd"> \
						Things that are \
						<input type="text" id="queryS" value=""></input> \
						connected via \
						<input type="text" id="queryP" value=""></input> \
						to \
						<input type="text" id="queryO" value="" disabled></input> \
						<form> \
							<input type="radio" id="queryVar" name="classThing" checked>&nbsp;Class \
							<input type="radio" id="queryNonVar" name="classThing" >&nbsp;Thing \
						</form> \
					</div> \
					<input type="button" id="queryAdd" onclick="queryPane.addIn()" value="Add"> \
					<br> \
				</div>');

		spex.sug.createDropdownC('queryS');
		spex.sug.createDropdownP('queryP');
		
		document.getElementById('queryO').value = queryPane.selected.label;

		document.getElementById("queryS").focus();	
	},

	// Hide context menu
	hideContextMenu : function(){
		queryPane.menu.each(function(d) {
			d3.select(this).style("display", "none");
		});
	},



	// Node drag start
	dragStart : function(d, i) {
		d3.event.sourceEvent.stopPropagation();

		queryPane.hideContextMenu();

		queryPane.force.stop();
	},

	// Node drag move
	dragMove : function(d, i) {

		d3.event.sourceEvent.stopPropagation();

		d.px = d3.event.x;
		d.py = d3.event.y;
		d.x = d3.event.x;
		d.y = d3.event.y; 

		queryPane.tick();
	},

	// Node drag end
	dragEnd : function(d, i) {

		d3.event.sourceEvent.stopPropagation();

		queryPane.tick();
		queryPane.force.resume();

		queryPane.hideContextMenu();
	},



	// 
	addOut : function(){
		queryPane.nodes.push({id: queryPane.nodes.length, label: document.getElementById('queryO').value,
			variable: document.getElementById('queryVar').checked, spConstraint: false, teConstraint: false }); //'?'});// variable should be true by default
		queryPane.links.push({id: queryPane.links.length, label: document.getElementById('queryP').value, //'a',//
			source: this.nodes.indexOf(queryPane.selected), target: this.nodes[queryPane.nodes.length - 1]});

		this.update();

		this.force.start();

		queryPane.updateQuery();
	},

	// 
	addIn : function(){
		queryPane.nodes.push({id: queryPane.nodes.length, label: document.getElementById('queryS').value,
			variable: document.getElementById('queryVar').checked, spConstraint: false, teConstraint: false }); //'?'});//
		queryPane.links.push({id: queryPane.links.length, label: document.getElementById('queryP').value, //'a',//
			source: this.nodes[queryPane.nodes.length - 1], target: this.nodes.indexOf(queryPane.selected)});

		this.update();

		this.force.start();

		queryPane.updateQuery();
	},

	// 
	addToSelected : function(pLabel, pClass, cLabel, cClass) {

	},

	// 
	updateSelected : function() {

		if (this.isNode(queryPane.selected)) {
			queryPane.selected.label = document.getElementById('queryS').value;
			queryPane.selected.variable = document.getElementById('queryVar').checked;

			queryPane.updateQuery();

			this.update();
		};
	},

	// 
	removeSelected : function() {

	},


	resize : function() {
	  width = window.innerWidth -400;
	  height = window.innerHeight - 200;
	  queryPane.vis
	      .attr("width", width)
	      .attr("height", height);

	  queryPane.force.size([width, height]);

	  queryPane.force.start();
	},


	// 
	isNode : function(node) {
		return (this.nodes.indexOf(node) >= 0);
	},

	// 
	isLink : function(link) {
		return (this.links.indexOf(link) >= 0);
	},

	// 
	logSubelements : function(node) {

		console.log(node.label);

		for (var i = 0; i < this.links.length; i++) {
			if (this.links[i].source == node) {
				console.log(this.links[i].label);
				//console.log(this.links[i].target.label);
				this.logSubelements(this.links[i].target);
			};
		};
	},

	updateQuery : function() {

		queryPane.hideContextMenu();

		spex.q = new SPEXQuery();

		this.parseQuery();

		//document.getElementById("query").innerHTML = spex.q.getSPARQL();
		spex.ex.executeQuery(spex.q,document.getElementById("endpoint").value); 
	},

	parseQuery : function() {

		for (var i = 0; i < this.nodes.length; i++) {

			var node = this.nodes[i];

			if (node.variable) {
				if (node.label != '') {
					spex.q.where(this.getNodeVarName(node), 'a', node.label);
				};

				//set variables and their labels for displaying the variable
				spex.q.SPEXvariable(this.getNodeVarName(node),node.label);
			};

			for (var j = 0; j < this.links.length; j++) {

				var link = this.links[j];

				if (link.source == node) {
					subject = node.variable ? this.getNodeVarName(node) : node.label;
					//this registers user selected variables in query 
					//if (this.node.variable) {spex.q.SPEXvariable(subject,node.label);}

					predicate = link.label;
					object = link.target.variable ? this.getNodeVarName(link.target) : link.target.label;

					spex.q.where(subject, predicate, object);

					//this registers user selected variables in query
					//if (link.target.variable) {spex.q.SPEXvariable(object,link.target.label);}

					//console.log(this.links[i].label);
					//console.log(this.links[i].target.label);
				};
			};
		};

	},

	getNodeVarName : function(node) {
		return '?var' + node.id;
	},

	setSpatialVars : function(vars) {

		for (variable in vars) {
		
			for (var i = 0; i < this.nodes.length; i++) {
				if (this.getNodeVarName(this.nodes[i]) == '?' + variable) {
					this.nodes[i].spConstraint = true;
				}
				else {
					this.nodes[i].spConstraint = false;
				};
			};
		};

		this.update();
	},

	setTemporalVars : function(vars) {

		for (variable in vars) {
		
			for (var i = 0; i < this.nodes.length; i++) {
				if (this.getNodeVarName(this.nodes[i]) == '?' + variable) {
					this.nodes[i].teConstraint = true;
				}
				else {
					this.nodes[i].teConstraint = false;
				};
			};
		};

		this.update();
	},

	setSpConstraint : function() {

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
	},

	removeSpConstraint : function() {

		spex.q.setSpatialConstraint(
			queryPane.getNodeVarName(queryPane.selected)
			, null);

		queryPane.updateQuery();
	},

	setTeConstraint : function() {

		var temp = new Time();
		temp.timeBeginning = slider.timeline.getVisibleChartRange().start.xsdDateTime();
		temp.timeEnd = slider.timeline.getVisibleChartRange().end.xsdDateTime();

		spex.q.setTemporalConstraint(
			queryPane.getNodeVarName(queryPane.selected)
			, temp);

		queryPane.updateQuery();
	},

	removeTeConstraint : function() {

		spex.q.setTemporalConstraint(
			queryPane.getNodeVarName(queryPane.selected)
			, null);

		queryPane.updateQuery();
	}

};
