(function($) {
	
	Date.prototype.Format = function (fmt) { //author: meizz 
	    var o = {
	        "M+": this.getMonth() + 1, //月份 
	        "d+": this.getDate(), //日 
	        "h+": this.getHours(), //小时 
	        "m+": this.getMinutes(), //分 
	        "s+": this.getSeconds(), //秒 
	        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
	        "S": this.getMilliseconds() //毫秒 
	    };
	    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	    for (var k in o)
	    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	    return fmt;
	};
	
	var maps = new Array();
	
	var mapImage = new Image();
	
	var mapSrc = "image/map.jpg";
	
	
	maps['WLM'] = {x:280,y:112,label:'乌鲁木齐'};
	maps['HHH'] = {x:486,y:169,label:'呼和浩特'};
	maps['HEB'] = {x:636,y:82,label:'哈尔滨'};
	maps['CC'] = {x:602,y:112,label:'长春'};
	maps['DL'] = {x:584,y:162,label:'大连'};
	maps['BJ'] = {x:534,y:163,label:'北京'};
	maps['TJ'] = {x:540,y:180,label:'天津'};
	maps['YT'] = {x:574,y:198,label:'烟台'};
	maps['LZ'] = {x:423,y:229,label:'兰州'};
	maps['SC'] = {x:418,y:305,label:'四川'};
	maps['QH'] = {x:390,y:220,label:'青海'};
	maps['KM'] = {x:400,y:373,label:'昆明'};
	maps['HK'] = {x:480,y:430,label:'海口'};
	maps['GY'] = {x:446,y:346,label:'贵阳'};
	maps['NN'] = {x:450,y:382,label:'南宁'};
	maps['CQ'] = {x:457,y:300,label:'重庆'};
	
	var rgbs = new Array([255,252],[210,128],[176,35]);
	
	
	function createColor(value){
		var rgb = [];
		for(var i = 0;i < 3;i++){
			rgb[i] = rgbs[i][0] + (rgbs[i][1] - rgbs[i][0]) / 100 * value ; 
		}
		return "rgb(" + Math.floor(rgb[0]) + "," + Math.floor(rgb[1]) + ","  + Math.floor(rgb[2]) +  ")";
	}
	
	function displayArea(ctx,x,y,value){
		ctx.fillStyle = createColor(value); 
		ctx.beginPath();
		ctx.arc(x,y, 6, 0, Math.PI*2, true); 
		ctx.closePath();
		ctx.fill();
	}
	
	function removeNode(node){
		node.each(function(){
			$(this).remove();
			if ($.browser.msie){
				this.outerHTML = '';
			}
		});
	}
	
	$.esnParser = {
		auto : true,
		onComplete : function(context) {return ;},
		plugins : ['chart','plat'],
		parse : function(context) {
			for ( var i = 0; i < $.esnParser.plugins.length; i++) {
				var name = $.esnParser.plugins[i];
				var r = $('.esn-' + name, context);
				if(name === 'plat'){
					mapImage.onload = function(){
						if (r.length) {
							r[name]();
						}
					};
					mapImage.src = mapSrc;
				}else{
					if (r.length) {
						r[name]();
					}
				}
			}
		},
		parseOptions : function(context) {
			var t = $(context);
			var s = $.trim(t.attr("data-options")) || "";
			var data = s.substring(0, 1);
			var _a = s.substring(s.length - 1, 1);
			if (data != "{") {
				s = "{" + s;
			}
			if (_a != "}") {
				s = s + "}";
			}
			return (new Function("return " + s))();
		}
	};

	$.fn.chart = function(datasource, options) {
		options = options || {};
		return this.each(function(){
			var state = $.data(this, 'chart');
			var opts;
			
			if (state){
				opts = $.extend(state.options, options);
			} else {
				var t = $(this);
				opts = $.extend({}, $.fn.chart.defaults,$.esnParser.parseOptions(this),{
					width: (parseInt(t.css('width')) || undefined),
					height: (parseInt(t.css('height')) || $.fn.chart.defaults.defaultHeight),
					left: (parseInt(t.css('left')) || undefined),
					top: (parseInt(t.css('top')) || undefined),
					title: t.attr('title'),
					iconCls: t.attr('icon'),
					cls: t.attr('cls'),
					headerCls: t.attr('headerCls'),
					bodyCls: t.attr('bodyCls'),
					href: t.attr('href'),
					cache: (t.attr('cache') ? t.attr('cache') == 'true' : undefined),
					fit: (t.attr('fit') ? t.attr('fit') == 'true' : undefined),
					border: (t.attr('border') ? t.attr('border') == 'true' : undefined),
					noheader: (t.attr('noheader') ? t.attr('noheader') == 'true' : undefined)
				}, options);
				//t.attr('title', '');
				
				state = $.data(this, 'chart', {
					options: opts,
					chart: wrapChart(this),
					isLoaded: false
				});
			}
			addChartHeader(this);
			setBorder(this);
			
			
			state.datasource = datasource || opts.datasource;
			$(this).esnChartDraw();
		});
	};
	
	
	$.fn.plat = function(datasource, options) {
		options = options || {};
		return this.each(function(){
			var state = $.data(this, 'chart');
			var opts;
			
			if (state){
				opts = $.extend(state.options, options);
			} else {
				var t = $(this);
				opts = $.extend({}, $.fn.map.defaults,$.esnParser.parseOptions(this),{
					width: (parseInt(t.css('width')) || undefined),
					height: (parseInt(t.css('height')) || $.fn.map.defaults.defaultHeight),
					left: (parseInt(t.css('left')) || undefined),
					top: (parseInt(t.css('top')) || undefined),
					title: t.attr('title'),
					iconCls: t.attr('icon'),
					cls: t.attr('cls'),
					headerCls: t.attr('headerCls'),
					bodyCls: t.attr('bodyCls'),
					href: t.attr('href'),
					cache: (t.attr('cache') ? t.attr('cache') == 'true' : undefined),
					fit: (t.attr('fit') ? t.attr('fit') == 'true' : undefined),
					border: (t.attr('border') ? t.attr('border') == 'true' : undefined),
					noheader: (t.attr('noheader') ? t.attr('noheader') == 'true' : undefined)
				}, options);
				//t.attr('title', '');
				
				state = $.data(this, 'chart', {
					options: opts,
					chart: wrapChart(this),
					isLoaded: false
				});
			}
			addMapHeader(this);
			setBorder(this);
			
			state.datasource = datasource || opts.datasource;
			$(this).esnMapDraw();
		});
	};
	
	
	
	$(function() {
		$.esnParser.parse();
	});
	
	$.fn.chart.parseOptions = function(context) {
		var t = $(context);
		return $.extend({},$.fn.chart.defaults, $.parser.parseOptions(context), {
			loadingMessage : (t.attr("loadingMessage") != undefined ? t
					.attr("loadingMessage") : undefined)
		});
	};
	
	function customStyle(state){
		var opts = {};
		if(state.options.legend == true){
			opts.legend={
	            show: true,
	            //placement: 'outsideGrid'
	        };
		}
		opts.series = state.options.series || [];
		return opts;
	}
	
	
	function destroyChart(state){
		if(state.jqplot){
			state.jqplot.destroy();
		}else{
			state.chart.find('>div.chart-body').empty();
		}
	}
	
	$.fn.drawLine = function(){
		var state = $.data(this[0], 'chart');
		destroyChart(state);
			if(state.datasource){
			$(this).removeClass('chart-bar');
			var opts = {
					seriesDefaults: {
						renderer: $.jqplot.LineRenderer,
					},
					axes: { 
				          xaxis: {
				        	  renderer:$.jqplot.LinearAxisRenderer,
				        	  ticks:wrapLineXLabel(state.datasource),
				          }, 
				          yaxis: { 
				        	  min:0,
				        	  max:wrapYMax(state.datasource),
				        	  tickInterval:10,
				              tickOptions:{formatString:'%d%%',},
				        }
				      }
		    };
			state.jqplot = $.jqplot(state.chart.find('>div.chart-body').attr("id"),state.datasource.data,$.extend(opts, customStyle(state)));
		}
	};
	
	$.fn.drawBar =function(){
		var state = $.data(this[0], 'chart');
		destroyChart(state);
		if(state.datasource){
			$(this).addClass('chart-bar');
			var opts = {
					seriesDefaults: {
						 renderer:$.jqplot.BarRenderer,
					},
					axes: { 
				          xaxis: {
				        	  renderer: $.jqplot.CategoryAxisRenderer,
				              ticks: wrapBarXLabel(state.datasource),
				          }, 
				          yaxis: { 
				        	  min:0,
				        	  max:wrapYMax(state.datasource),
				        	  tickInterval:10,
				              tickOptions:{formatString:'%d%%',} ,
				        }
				      }
			};
			state.jqplot = $.jqplot(state.chart.find('>div.chart-body').attr("id"),state.datasource.data,$.extend(opts, customStyle(state)));
		}
	};
	
	$.fn.drawChartTable  = function(){
		var state = $.data(this[0], 'chart');
		destroyChart(state);
		if(!state.datasource){
			return;
		}
		$(this).addClass('chart-bar');
		//if($(this).options)
		var innerWidth = $(this).width();
		var innerHeigth = $(this).height() <= 0 ? state.options.height:$(this).height();
		var columns  = new Array();
		columns.push({label:'Date'});
		if(state.options.series){
			for(var i = 0; i < state.options.series.length;i++){
				columns.push(state.options.series[i]);
			}
		}else{
			var datalength = state.datasource.data.length;
			if(datalength > 1){
				for(var i = 0; i < datalength;i++){
					columns.push({label:'series' + (i + 1)});
				}
			}else{
				columns.push({label:state.options.head});
			}
		}
		var t = $('<table border="0" cellspacing="0" cellpadding="0" class="chartTable" ><thead style="background-color: #FFFFFF;"></thead><tbody ></tbody></table>');
		var tr = $('<tr></tr>').appendTo($('thead', t));
		var cols = columns;
		for(var j=0; j<cols.length; j++){
			var col = cols[j];
			var th = $('<td align="center"></td>').appendTo(tr);
			th.append('<div class="datagrid-cell"><span></span><span class="datagrid-sort-icon"></span></div>');
			$('.datagrid-cell', th).width(innerWidth / columns.length);
			$('span', th).html(col.label);
			$('span.datagrid-sort-icon', th).html('&nbsp;');
		}
		var datasource = state.datasource;
		var rows = new Array();
		for(var x = 0; x < datasource.xlabel.length; x++){
			var row = new Array();
			row.push(datasource.xlabel[x]);
			for(var y = 0; y < datasource.data.length; y++){
				row.push(datasource.data[y][x] + "%");
			}
			rows.push(row);
		}
		
		for(var i=0; i<rows.length; i++) {
			var row = rows[i];
			var tr = $('<tr></tr>').appendTo($('tbody', t));
			for(var j=0; j<row.length; j++){
				var field = row[j];
				var td = $('<td align="center"></td>').appendTo(tr);
				td.append('<div class="datagrid-cell datagrid-cell-height">' +  field +'</div>');
			}
		}
		
		$('<div class="datagrid-wrap">' +
				'<div class="datagrid-view">' +
					'<div class="datagrid-view2">' +
						'<div class="datagrid-header">' +
							'<div class="datagrid-header-inner"></div>' +
						'</div>' +
						'<div class="datagrid-body"><table class="datagrid-btable"  border="0" cellspacing="0" cellpadding="0"></table></div>' +
					'</div>' +
			    '</div>' +
		  '</div>').appendTo($(this));
		//$('<div class="chart-tool"></div>').appendTo($(target));
		$('.datagrid-view2 .datagrid-header-inner', this).html(t);
		$('.datagrid-wrap', this).width(innerWidth);
		$('.datagrid-wrap', this).height(innerHeigth);
		$('.datagrid-view', this).width(innerWidth);
		$('.datagrid-view2',this).width(innerWidth - $('.datagrid-view1',this).outerWidth());
		$('.datagrid-view2 .datagrid-header',this).width($('.datagrid-view2',this).width());
		$('.datagrid-view2 .datagrid-body',this).width($('.datagrid-view2',this).width());
		$(".chartTable tr:even").css("background-color", "#FFFFFF");
		$(".chartTable tr:odd").css("background-color", "#E6ECFF");
		$(".chartTable tr").css("height","35px");
		//$('.datagrid-view2 .datagrid-body table', target).html(getTBody(state.datasource,innerWidth,columns));
		//return t;
	};
	
	function wrapLineXLabel(datasource){
		var i = 0;
		var xlabel = new Array();
		xlabel.push([i++,'']);
		for(var j = 0;j < datasource.xlabel.length;j++){
			xlabel.push([i++,datasource.xlabel[j]]);
		}
		xlabel.push([i,'']);
		return xlabel;

	}
	function wrapBarXLabel(datasource){
		var xlabel = new Array();
		for(var j = 0;j < datasource.xlabel.length;j++){
			xlabel.push(datasource.xlabel[j]);
		}
		xlabel.push('');
		return xlabel;
	}
	function wrapYMax(datasource){
		var max = 80;
		for(var i=0;i < datasource.data.length;i++){
			for(var j = 0;j < datasource.data[i].length;j++){
				if(datasource.data[i][j] > max){
					max = datasource.data[i][j];
				}
			}
		}
		return max + 10;
	}
	
	function wrapChart(target){
		var chart = $(target).addClass('chart-body').wrap('<div class="chart"></div>').parent();
		return chart;
	}
	
	function addChartHeader(target){
		var opts = $.data(target, 'chart').options;
		var chart = $.data(target, 'chart').chart;
		removeNode(chart.find('>div.chart-header'));
		if (opts.head && !opts.noheader){
			var header = $('<div class="chart-header"><div class="chart-title">'+opts.head +'</div></div>').prependTo(chart);
			if (opts.iconCls){
				header.find('.chart-title').addClass('chart-with-icon');
				$('<div class="chart-icon"></div>').addClass(opts.iconCls).appendTo(header);
			}
			var tool = $('<div class="chart-tool"></div>').appendTo(header);
			
			if(opts.timeable){
				var menu = '<div class="menu">' + 
					'<ul>' + 
					'<li><a class="hide" href="javascript:void(0)"><img class="chart_tool_menu" src="image/timeType.png" width="20" height="20"/></a> ' + 
					'<ul>' + 
						'<li><a href="javascript:void(0)">Day</a></li>' + 
						'<li><a href="javascript:void(0)">Week</a></li>' + 
						'<li><a href="javascript:void(0)">Month</a></li>' + 
					'</ul></li>' + 
				'</div>';
				var menuOB =  $(menu).appendTo(tool);
				menuOB.find("a[class!='hide']").each(function(i){
					$(this).bind("click", function() {
						drawCycle(target,opts['load' + $(this).html() + 'Resource']);
						return false;
					});
				});
			}
			//need to show format button?
			if(opts.formatable){
				
				var menu = '<div class="menu">' + 
					'<ul>' + 
					'<li><a class="hide" href="javascript:void(0)"><img class="chart_tool_menu" src="image/action_icon.png" width="20" height="20"/></a> ' + 
					'<ul>' + 
						'<li><a href="javascript:void(0)">Line</a></li>' + 
						'<li><a href="javascript:void(0)">Bar</a></li>' + 
						'<li><a href="javascript:void(0)">Table</a></li>' + 
					'</ul></li>' + 
				'</div>';
				var menuOB =  $(menu).appendTo(tool);
				
				menuOB.find("a[class!='hide']").each(function(i){
					$(this).bind("click", function() {
						if(i == 0){
							$(target).drawLine();
						}else if(i == 1){
							$(target).drawBar();
						}else{
							$(target).drawChartTable();
						}
						return false;
					});
				});
			}
			if(opts.setting){
				
				var menu = '<div class="menu">' + 
					'<ul>' + 
					'<li><a class="hide" href="javascript:void(0)"><img class="chart_tool_menu" src="image/setting_icon.png" width="20" height="20"/></a> ' + 
					'<ul>' + 
					'</ul></li>' + 
				'</div>';
				var menuOB =  $(menu).appendTo(tool);
				
				menuOB.find("a[class!='hide']").each(function(i){
					$(this).bind("click", function() {
						return false;
					});
				});
			}
			chart.find('>div.chart-body').removeClass('chart-body-noheader');
		} else {
			chart.find('>div.chart-body').addClass('chart-body-noheader');
		}
	}
	
	function setBorder(target){
		var opts = $.data(target, 'chart').options;
		var chart = $.data(target, 'chart').chart;
		if (opts.border == true){
			chart.find('>div.chart-header').removeClass('chart-header-noborder');
			chart.find('>div.chart-body').removeClass('chart-body-noborder');
		} else {
			chart.find('>div.chart-header').addClass('chart-header-noborder');
			chart.find('>div.chart-body').addClass('chart-body-noborder');
		}
	}
	
	function drawChartCycle(target,cycle){
		var state = $.data(target, 'chart');
		destroyChart(state);
		state.datasource = cycle(target,state.options);
		$(target).drawLine();
	}
	
	$.fn.esnChartDraw = function(){
		if(this.is(':visible')){
			var opts = $.data(this[0], 'chart').options;
			var view = opts.view || 'line';
			if(view == 'line'){
				$(this).drawLine();
			}else if(view == 'bar'){
				$(this).drawBar();
				$(this).addClass('chart-bar');
			}else{
				$(this).addClass('chart-bar');
				$(this).drawChartTable();
			}
		}
	};
	
	$.fn.esnDraw  = $.fn.esnChartDraw;
	
	$.fn.drawMap  = function(){
		var state = $.data(this[0], 'chart');
		destroyChart(state);
		if(!state.datasource){
			return;
		}
		var canvas = $('<canvas/>').appendTo($(this))[0];
		var ctx = canvas.getContext("2d");
		canvas.width = mapImage.width;
		canvas.height = mapImage.height;
		ctx.drawImage(mapImage, 0, 0,mapImage.width,mapImage.height);
		
		var datas = state.datasource.data;
		for(var i = 0; i < datas.length; i ++ ){
			displayArea(ctx,maps[datas[i].name].x,maps[datas[i].name].y,datas[i].value);
		}
		ctx.fillStyle = "#000000"; 
		ctx.fillText('Last Update Time', 558,411);
		ctx.fillText(state.datasource.updateTime, 658 , 411);
	};
	
	$.fn.drawMapTable  = function(){
		var state = $.data(this[0], 'chart');
		destroyChart(state);
		if(!state.datasource){
			return;
		}
		$(this).addClass('chart-map');
		//if($(this).options)
		var innerWidth = $(this).width();
		var innerHeigth = $(this).height() <= 0 ? state.options.height:$(this).height();
		var columns  = new Array();
		columns.push({label:'City'});
		columns.push({label:state.options.head});
		var t = $('<table border="0" cellspacing="0" cellpadding="0" class="chartTable" ><thead style="background-color: #FFFFFF;"></thead><tbody ></tbody></table>');
		var tr = $('<tr></tr>').appendTo($('thead', t));
		var cols = columns;
		for(var j=0; j<cols.length; j++){
			var col = cols[j];
			var th = $('<td align="center"></td>').appendTo(tr);
			th.append('<div class="datagrid-cell"><span></span><span class="datagrid-sort-icon"></span></div>');
			$('.datagrid-cell', th).width(innerWidth / columns.length);
			$('span', th).html(col.label);
			$('span.datagrid-sort-icon', th).html('&nbsp;');
		}
		var datasource = state.datasource;
		var rows = new Array();
		for(var i = 0; i < datasource.data.length; i++){
			var row = new Array();
			row.push(maps[datasource.data[i].name].label);
			row.push(datasource.data[i].value + "%");
			rows.push(row);
		}
		for(var i=0; i<rows.length; i++) {
			var row = rows[i];
			var tr = $('<tr></tr>').appendTo($('tbody', t));
			for(var j=0; j<row.length; j++){
				var field = row[j];
				var td = $('<td align="center"></td>').appendTo(tr);
				td.append('<div class="datagrid-cell datagrid-cell-height">' +  field +'</div>');
			}
		}
		
		$('<div class="datagrid-wrap">' +
				'<div class="datagrid-view">' +
					'<div class="datagrid-view2">' +
						'<div class="datagrid-header">' +
							'<div class="datagrid-header-inner"></div>' +
						'</div>' +
						'<div class="datagrid-body"><table class="datagrid-btable"  border="0" cellspacing="0" cellpadding="0"></table></div>' +
					'</div>' +
			    '</div>' +
		  '</div>').appendTo($(this));
		//$('<div class="chart-tool"></div>').appendTo($(target));
		$('.datagrid-view2 .datagrid-header-inner', this).html(t);
		$('.datagrid-wrap', this).width(innerWidth);
		$('.datagrid-wrap', this).height(innerHeigth);
		$('.datagrid-view', this).width(innerWidth);
		$('.datagrid-view2',this).width(innerWidth - $('.datagrid-view1',this).outerWidth());
		$('.datagrid-view2 .datagrid-header',this).width($('.datagrid-view2',this).width());
		$('.datagrid-view2 .datagrid-body',this).width($('.datagrid-view2',this).width());
		$(".chartTable tr:even").css("background-color", "#FFFFFF");
		$(".chartTable tr:odd").css("background-color", "#E6ECFF");
		$(".chartTable tr").css("height","35px");
		//$('.datagrid-view2 .datagrid-body table', target).html(getTBody(state.datasource,innerWidth,columns));
		//return t;
	};
	
	function addMapHeader(target){
		var opts = $.data(target, 'chart').options;
		var chart = $.data(target, 'chart').chart;
		removeNode(chart.find('>div.chart-header'));
		if (opts.head && !opts.noheader){
			var header = $('<div class="chart-header"><div class="chart-title">'+opts.head +'</div></div>').prependTo(chart);
			if (opts.iconCls){
				header.find('.chart-title').addClass('chart-with-icon');
				$('<div class="chart-icon"></div>').addClass(opts.iconCls).appendTo(header);
			}
			var tool = $('<div class="chart-tool"></div>').appendTo(header);
			
			if(opts.timeable){
				var menu = '<div class="menu">' + 
					'<ul>' + 
					'<li><a class="hide" href="javascript:void(0)"><img class="chart_tool_menu" src="image/timeType.png" width="20" height="20"/></a> ' + 
					'<ul>' + 
						'<li><a href="javascript:void(0)">Day</a></li>' + 
						'<li><a href="javascript:void(0)">Week</a></li>' + 
						'<li><a href="javascript:void(0)">Month</a></li>' + 
					'</ul></li>' + 
				'</div>';
				var menuOB =  $(menu).appendTo(tool);
				menuOB.find("a[class!='hide']").each(function(i){
					$(this).bind("click", function() {
						drawMapCycle(target,opts['load' + $(this).html() + 'Resource']);
						return false;
					});
				});
			}
			//need to show format button?
			if(opts.formatable){
				
				var menu = '<div class="menu">' + 
					'<ul>' + 
					'<li><a class="hide" href="javascript:void(0)"><img class="chart_tool_menu" src="image/action_icon.png" width="20" height="20"/></a> ' + 
					'<ul>' + 
						'<li><a href="javascript:void(0)">Map</a></li>' + 
						'<li><a href="javascript:void(0)">Table</a></li>' + 
					'</ul></li>' + 
				'</div>';
				var menuOB =  $(menu).appendTo(tool);
				
				menuOB.find("a[class!='hide']").each(function(i){
					$(this).bind("click", function() {
						if(i == 0){
							$(target).drawMap();
						}else{
							$(target).drawMapTable();
						}
						return false;
					});
				});
			}
			if(opts.setting){
				
				var menu = '<div class="menu">' + 
					'<ul>' + 
					'<li><a class="hide" href="javascript:void(0)"><img class="chart_tool_menu" src="image/setting_icon.png" width="20" height="20"/></a> ' + 
					'<ul>' + 
					'</ul></li>' + 
				'</div>';
				var menuOB =  $(menu).appendTo(tool);
				
				menuOB.find("a[class!='hide']").each(function(i){
					$(this).bind("click", function() {
						return false;
					});
				});
			}
			
			chart.find('>div.chart-body').removeClass('chart-body-noheader');
		} else {
			chart.find('>div.chart-body').addClass('chart-body-noheader');
		}
	}
	
	function drawMapCycle(target,cycle){
		var state = $.data(target, 'chart');
		destroyChart(state);
		state.datasource = cycle(target,state.options);
		$(target).drawMap();
	}
	
	$.fn.esnMapDraw = function(){
		if(this.is(':visible')){
			var opts = $.data(this[0], 'chart').options;
			var view = opts.view || 'table';
			if(view == 'plat'){
				$(this).drawMap();
			}else{
				$(this).drawMapTable();
			}
		}
	};
	
	$.fn.map.defaults = {
			formatable:true,	
			setting:true,
			timeable:true,
			defaultHeight:300,
			loadDayResource:function(target,options){return;},
			loadWeekResource:function(target,options){return;},
			loadMonthResource:function(target,options){return;},
	};
	
	
	$.fn.chart.defaults = {
			formatable:true,	
			setting:true,
			timeable:true,
			defaultHeight:300,
			loadDayResource:function(target,options){return;},
			loadWeekResource:function(target,options){return;},
			loadMonthResource:function(target,options){return;},
	};
})(jQuery);