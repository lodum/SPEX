/*
	QueryPane class
	
	Author: Peter Zimmerhof
*/

//JSDoc
/**
* A query pane in which one can manipulate a visual query pattern graph which translates into SPARQL and gets automatically executed
* @class
*  @property {object} nodes - holds the array of current user generated visual (variable or instant) nodes 
*  @property {object}  links - holds the array of current user generated visual property links (triple patterns)
**/
var queryPane = {
	//last version of this query pane
	last_qp : null,	

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
	nodes : [{id: 0, label: '', className: '', variable: true, x: 100, y: 0, spConstraint: false, spConstrSet: false, teConstraint: false, teConstrSet : false}],
	links : [],

	// Selected node
	selected : null,

	// Context menu
	menu : null,

	// Node drag beahavior
	node_drag : null,
	
	//flag which tells whether user updated query. for updating suggester classes and suggester predicates (respectively)
	querywasupdatedCL : false,
	//querywasupdatedPRout : false,
	//querywasupdatedPRin : false,
	nodeselectedCL : null,
	//nodeselectedPRout : null,
	//nodeselectedPRin : null,
	
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

		queryPane.querywasupdatedCL = false;
		queryPane.querywasupdatedI = false;
		queryPane.querywasupdatedPR = false;
		queryPane.nodeselectedCL = queryPane.selected;
		queryPane.nodeselectedI  = queryPane.selected;
		queryPane.nodeselectedPRout = queryPane.selected;
		queryPane.nodeselectedPRin = queryPane.selected;
		this.update();
		this.updateQuery();
	},



	/** Graph animation function
	*@function */
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



	/** Graph update function
	*@function */
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
		this.pathText.exit().remove();


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
			if (d.label==''){ if (d.variable) {var lab = 'var'+d.id}else{var lab = '';}}else{var lab =d.label};
      		return  lab; 
      	});

      	this.node.select("text.var")
      	.text(function(d) { 
      		return (d.variable) ? '?' : '';
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
	
	/**Prepares instances in the suggester  and set corresponding autocomplete lists
	*@function */
	checkInstanceSuggestion : function () {					
			spex.sug.suggestClasses=false;
			if (queryPane.querywasupdatedI || spex.endpointChanged() || queryPane.selected != queryPane.nodeselectedI){					
					spex.sug.chainInstanceQueries();
					queryPane.querywasupdatedI = false;
					queryPane.nodeselectedI = queryPane.selected;
				}else {spex.sug.setLinkText();}								
				
			spex.sug.createDropdownI('queryS');				
			//spex.sug.setLinkText();		
		
	},
	/**Prepares classes  in the suggester  and set corresponding autocomplete lists
	*@function */
	checkClassSuggestion : function () {	
				spex.sug.suggestClasses=true;	
				if (queryPane.querywasupdatedCL || spex.endpointChanged() || queryPane.selected != queryPane.nodeselectedCL){
					spex.sug.chainVariableQueries();									
					queryPane.querywasupdatedCL = false;
					queryPane.nodeselectedCL = queryPane.selected;
				}else {spex.sug.setLinkText();}					
				
				spex.sug.createDropdownC('queryS');			
		
	},
	

	/** Shows context menu
	* @function */
	showContextMenu : function(menu) {
		
		var constraintSpLinks = '';
		var constraintTeLinks = '';

		if (queryPane.selected.spConstraint) {			
				if (queryPane.selected.spConstrSet) {constraintSpLinks = '<br><br> <a href="javascript:void(0)" onclick="queryPane.removeSpConstraint();">Remove Spatial Filter</a>';} 
				else {constraintSpLinks = '<br><br><a href="javascript:void(0)" onclick="queryPane.setSpConstraint();" title="Go to map and set desired search area by zooming in/out, only after that click this link.">Filter results by map window</a>';};				
		};

		if (queryPane.selected.teConstraint) {
				if (queryPane.selected.teConstrSet) {constraintTeLinks = '<br><a href="javascript:void(0)" onclick="queryPane.removeTeConstraint();">Remove Temporal Filter</a>';} 
				else {constraintTeLinks = '<br><a href="javascript:void(0)" onclick="queryPane.setTeConstraint();" title="Click this link, then go to time slider and set desired search time interval by scrolling.">Filter results by time window</a>';};	
		};

		d3.select("#contextMenu")
		.html('<div style="position:inherit; top: 0; right: 0; padding: 3px;"><a onclick="queryPane.hideContextMenu()">X</a></div> \
				<div id="contextMenuContent">'+
					'<br>'+					
					'I am looking for: <input type="text" id="queryS" size="22" placeholder="type/select, press return" onkeydown="if(event.keyCode==13) queryPane.updateSelected()"></input> <div id="numb"></div>' +
					'<form>' +
						'<input type="radio" id="queryVar" name="classThing" onclick="queryPane.checkClassSuggestion()">&nbsp;Things of a kind </input>' +
						'<input type="radio" id="queryNonVar" name="classThing" onclick="queryPane.checkInstanceSuggestion()">&nbsp;Particular things </input>'+
					'</form>' +
					'<div id = "warning"></div>'+
					'<br>'+					
					'<a href="javascript:void(0)"  id="addout"></a><br>'+	
					'<a href="javascript:void(0)"  id="addin"></a>'
					+ constraintSpLinks + constraintTeLinks +
				'</div>');
				
		//document.getElementById('queryS').style.size = "type/select, press return".length;
		document.getElementById('queryS').value = queryPane.selected.label;		
		document.getElementById('queryVar').checked = queryPane.selected.variable;
		document.getElementById('queryNonVar').checked = !(queryPane.selected.variable);
		
		if (document.getElementById('queryNonVar').checked) {
				queryPane.checkInstanceSuggestion();	
		} 
		else if (document.getElementById('queryVar').checked) {
		//updates the class and predicate lists of the suggester w.r.t. current query and current selected node if query was updated or new node was selected		
				queryPane.checkClassSuggestion();
		}	
						 
		queryPane.menu.each(function(d) {
			d3.select(this).style("display", "block")
			.style("left", d.px + 10 + "px")
			.style("top", d.py + 50 + 15 + "px");
		});

		document.getElementById("queryS").focus();	
	},
	
	

	/** shows context menu for links (out) 
	* @function */
	showContextMenuAddOut : function() {
		var x;
		var y;
		if (queryPane.selected.variable) { if ( queryPane.selected.label != ""){x = 'Things that are '; y = 'Things that are maps ';} else {x = 'Something '; y = x;}} else {x = ""; y = 'Something ';};
		d3.select("#contextMenu")
		.html('<div style="position:inherit; top: 0; right: 0; padding: 3px;"><a onclick="queryPane.hideContextMenu()">X</a></div>' +
				'<div id="contextMenuContent">' +
					'<br>'+
					'<div class="linkAdd">' +
						'I am looking for:<br>'+
						'<b>' +x+
						  queryPane.selected.label +	
						' connected via ' +	'</b> ' +		
						'<input type="text" id="queryP" size="22" placeholder="type/select, press return"  onkeydown="if(event.keyCode==13) queryPane.addOut()" value=""></input>'+
						'<b>' +' to something else'+'</b> ' +										
					'</div>'+	
						'<div id = "numbpr"></div><br>' +
					'<div class="linkAdd">' +
						'For example: <br>'+
						y+						
						'<i>created by</i> some person' +
					'</div>'+					
					'<br>'+
				'</div>');			
			
		spex.sug.createDropdownPout('queryP');	
		

		document.getElementById("queryP").focus();
	},

	//
	/** shows context menu for links (in) 
	* @function */
	showContextMenuAddIn : function() {
		var x;
		if (queryPane.selected.variable) { if ( queryPane.selected.label != ""){x = 'things that are '} else {x = 'something '}} else {x = ""};
		d3.select("#contextMenu")
		.html('<div style="position:inherit; top: 0; right: 0; padding: 3px;"><a onclick="queryPane.hideContextMenu()">X</a></div> \
				<div id="contextMenuContent">'+
					'<br>'+					
					'<div class="linkAdd">'+
						'I am looking for: <br>'+
						'Something \
						connected via \
						<input type="text" id="queryP" size="22" placeholder="type/select, press return"  onkeydown="if(event.keyCode==13) queryPane.addIn()" value=""></input> \
						to ' + x +
						'<b>' +  queryPane.selected.label +'</b>' +						
					'</div>'+
					'<div id = "numbpr"></div>'+					
					'<br>'+					
				'</div>');			
			
		
		spex.sug.createDropdownPin('queryP');		
		//$("queryP").on( "autocompleteselect", function (event, ui) {queryPane.addIn();});
		
		
		document.getElementById("queryP").focus();	
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
		this.last_qp = spex.clone(this);
		queryPane.nodes.push({id: queryPane.nodes.length, label: "",
			variable: true, spConstraint: false, teConstraint: false }); //'?'});// variable should be true by default
		queryPane.links.push({id: queryPane.links.length, label: document.getElementById('queryP').value, //'a',//
			source: this.nodes.indexOf(queryPane.selected), target: this.nodes[queryPane.nodes.length - 1]});			
		
		this.update();
		

		this.force.start();

		queryPane.updateQuery();
	},

	// 
	addIn : function(){
		this.last_qp = spex.clone(this);
		queryPane.nodes.push({id: queryPane.nodes.length, label: "",
			variable: true, spConstraint: false, teConstraint: false }); //'?'});//
		queryPane.links.push({id: queryPane.links.length, label: document.getElementById('queryP').value, //'a',//
			source: this.nodes[queryPane.nodes.length - 1], target: this.nodes.indexOf(queryPane.selected)});
				
		this.update();
		

		this.force.start();

		queryPane.updateQuery();
	},

	// 
	addToSelected : function(pLabel, pClass, cLabel, cClass) {

	},

	/** Writes input text into node and updates graph 
	* @function */
	updateSelected : function() {

		if (this.isNode(queryPane.selected)) {	
			this.last_qp = spex.clone(this);			
			//if (!document.getElementById('queryNonVar').checked) and no label given, then this means that the menu should go back to its initial empty variable state;
				if (document.getElementById('queryNonVar').checked && document.getElementById('queryS').value =="") {
					queryPane.checkClassSuggestion();
					document.getElementById('queryVar').checked = true;
					document.getElementById('queryNonVar').checked = false;
					queryPane.selected.variable = document.getElementById('queryVar').checked;					
				} 
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
	/** Updates central SPEX query after user manipulation of visual graph 
	* @function */
	updateQuery : function() {

		queryPane.hideContextMenu();

		spex.q = new SPEXQuery();

		this.parseQuery();
		queryPane.querywasupdatedCL = true;	
		queryPane.querywasupdatedI = true;	
		queryPane.querywasupdatedPR = true;	
		
		spex.ex.executeQuery(spex.q,document.getElementById("endpoint").value); 

		document.getElementById("query").innerHTML = spex.q.serialiseQuery();
	},

	parseQuery : function() {

		for (var i = 0; i < this.nodes.length; i++) {

			var node = this.nodes[i];
			//console.log("node :" +node);
			
			if (node.variable) {
				if (node.label != '') {
					spex.q.where(this.getNodeVarName(node), 'a', node.label);					
				};

				//set variables and their labels for displaying the variable
				spex.q.SPEXvariable(this.getNodeVarName(node),node.label);
			} else if (node.label != '') {
			//for constants, add a filter expression which allows to handle it as if it was a variable					
					spex.q.filter(this.getNodeVarName(node)+" = "+node.uri);
					spex.q.SPEXvariable(this.getNodeVarName(node),node.label);
			};
			
			for (var j = 0; j < this.links.length; j++) {

				var link = this.links[j];
				//console.log("link label: "+link.label);
				//console.log("link source: "+link.source.id + " " + node.id + " " + (link.source.id === node.id));
				if (link.source.id == node.id) {	
					//non-variable nodes are handled by filter expression and treated also as a variable (see above)				
					subject = this.getNodeVarName(node) ;					

					predicate = link.label;
					object = this.getNodeVarName(link.target);					
					spex.q.where(subject, predicate, object);					

					//console.log("link label: "+this.links[j].label);
					//console.log(this.links[j].target.label);
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
	/** @function */
	setSpConstraint : function() {
		queryPane.selected.spConstrSet=true;
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
	/** @function */
	removeSpConstraint : function() {
		queryPane.selected.spConstrSet=false;
		spex.q.setSpatialConstraint(
			queryPane.getNodeVarName(queryPane.selected)
			, null);

		queryPane.updateQuery();
	},
	/** @function */
	setTeConstraint : function() {
		queryPane.selected.teConstrSet=true;
		var temp = new Time();
		temp.timeBeginning = slider.timeline.getVisibleChartRange().start.xsdDateTime();
		temp.timeEnd = slider.timeline.getVisibleChartRange().end.xsdDateTime();
		console.log("TIME FILTER OBJECT: " + JSON.stringify(temp));

		spex.q.setTemporalConstraint(
			queryPane.getNodeVarName(queryPane.selected)
			, temp);

		queryPane.updateQuery();
	},
	/** @function */
	removeTeConstraint : function() {
		queryPane.selected.teConstrSet=false;
		spex.q.setTemporalConstraint(
			queryPane.getNodeVarName(queryPane.selected)
			, null);

		queryPane.updateQuery();
	}
	
	

};
