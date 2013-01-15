(function($) {
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
		plugins : ['chart'],
		parse : function(context) {
			for ( var i = 0; i < $.esnParser.plugins.length; i++) {
				var name = $.esnParser.plugins[i];
				var r = $('.esn-' + name, context);
				if (r.length) {
					r[name]();
				}
			}
		},
		parseOptions : function(context) {
			var t = $(context);
			var options = {};
			var s = $.trim(t.attr("data-options"));
			if (s) {
				var data = s.substring(0, 1);
				var _a = s.substring(s.length - 1, 1);
				if (data != "{") {
					s = "{" + s;
				}
				if (_a != "}") {
					s = s + "}";
				}
				options = (new Function("return " + s))();
			}
			return options;
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
					height: (parseInt(t.css('height')) || undefined),
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
			/*if (opts.content){
				$(this).html(opts.content);
				if ($.parser){
					$.parser.parse(this);
				}
			}*/
			
			addHeader(this);
			setBorder(this);
			
			if (opts.doSize == true){
				state.panel.css('display','block');
				//setSize(this);
			}
			
			state.datasource = datasource || opts.datasource;;
			drawLine(state);
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
			//delete state.jqplot;
		}
	}
	
	function drawLine(state){
		destroyChart(state);
			if(state.datasource){
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
	}
	
	function drawBar(state){
		destroyChart(state);
		if(state.datasource){
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
	}
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
	
	function addHeader(target){
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
				//var timebar = $('<div class="chart-tool-time"></div>').appendTo(tool);
				$("<a class=\"chart-tool-time\" href=\"javascript:void(0)\">Day</a>").appendTo(tool).bind("click", function() {
					drawCycle(target,opts.loadDayResource);
					return false;
				});
				$("<a class=\"chart-tool-time\" href=\"javascript:void(0)\">Week</a>").appendTo(tool).bind("click", function() {
					drawCycle(target,opts.loadWeekResource);
					return false;
				});
				$("<a class=\"chart-tool-time\" href=\"javascript:void(0)\">Month</a>").appendTo(tool).bind("click", function() {
					drawCycle(target,opts.loadMonthResource);
					return false;
				});
			}
			//need to show format button?
			if(opts.formatable){
				$("<a class=\"chart-tool-chart\" href=\"javascript:void(0)\"></a>").appendTo(tool).bind("click", function(){
					if ($(target).hasClass('chart-bar')){
						drawLine($.data(target, 'chart'));
						$(target).removeClass('chart-bar');
					} else {
						drawBar($.data(target, 'chart'));
						$(target).addClass('chart-bar');
					}
					return false;
				});
				$("<a class=\"chart-tool-table\" href=\"javascript:void(0)\"></a>").appendTo(tool).bind("click", function() {
					$(target).addClass('chart-bar');
					drawTable(target);
					return false;
				});
				
			}
			if(opts.setting){
				$("<a class=\"chart-tool-setting\" href=\"javascript:void(0)\"></a>").appendTo(tool).bind("click", function() {
					return false;
				});
			}
			if (opts.tools){
				for(var i=opts.tools.length-1; i>=0; i--){
					var t = $('<div></div>').addClass(opts.tools[i].iconCls).appendTo(tool);
					if (opts.tools[i].handler){
						t.bind('click', eval(opts.tools[i].handler));
					}
				}
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
	
	function drawCycle(target,cycle){
		var state = $.data(target, 'chart');
		destroyChart(state);
		state.datasource = cycle(target,state.options);
		drawLine(state);
	}
	
	function drawTable(target){
		var state = $.data(target, 'chart');
		destroyChart(state);
		
		if(!state.datasource){
			return;
		}
		var innerWidth = $(target).width();
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
		  '</div>').appendTo($(target));
		//$('<div class="chart-tool"></div>').appendTo($(target));
		$('.datagrid-view2 .datagrid-header-inner', target).html(t);
		$('.datagrid-wrap', target).width(innerWidth);
		$('.datagrid-view', target).width(innerWidth);
		$('.datagrid-view2',target).width(innerWidth - $('.datagrid-view1',target).outerWidth());
		$('.datagrid-view2 .datagrid-header',target).width($('.datagrid-view2',target).width());
		$('.datagrid-view2 .datagrid-body',target).width($('.datagrid-view2',target).width());
		$(".chartTable tr:even").css("background-color", "#FFFFFF");
		$(".chartTable tr:odd").css("background-color", "#E6ECFF");
		$(".chartTable tr").css("height","35px");
		//$('.datagrid-view2 .datagrid-body table', target).html(getTBody(state.datasource,innerWidth,columns));
		//return t;
	}
	
	$.fn.chart.defaults = {
			formatable:true,	
			setting:true,
			timeable:true,
			loadDayResource:function(target,options){return;},
			loadWeekResource:function(target,options){return;},
			loadMonthResource:function(target,options){return;},
		};
})(jQuery);