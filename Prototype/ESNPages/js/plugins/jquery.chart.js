// @sourceURL=jquery.chart.debug.js
$(function() {
	
	$.jqplot.PlanShapeRenderer = function(){
        $.jqplot.ShapeRenderer.call(this);
    };
    
    $.jqplot.PlanShapeRenderer.prototype = new $.jqplot.ShapeRenderer();
    $.jqplot.PlanShapeRenderer.prototype.constructor = $.jqplot.PlanShapeRenderer;
    
    $.jqplot.PlanShapeRenderer.prototype.draw = function(ctx, points, options) {
        ctx.save();
        var opts = (options != null) ? options : {};
        var fill = (opts.fill != null) ? opts.fill : this.fill;
        var closePath = (opts.closePath != null) ? opts.closePath : this.closePath;
        var fillRect = (opts.fillRect != null) ? opts.fillRect : this.fillRect;
        var strokeRect = (opts.strokeRect != null) ? opts.strokeRect : this.strokeRect;
        var clearRect = (opts.clearRect != null) ? opts.clearRect : this.clearRect;
        var isarc = (opts.isarc != null) ? opts.isarc : this.isarc;
        var linePattern = (opts.linePattern != null) ? opts.linePattern : this.linePattern;
        var ctxPattern = $.jqplot.LinePattern(ctx, linePattern);
        ctx.lineWidth = opts.lineWidth || this.lineWidth;
        ctx.lineJoin = opts.lineJoin || this.lineJoin;
        ctx.lineCap = opts.lineCap || this.lineCap;
        ctx.strokeStyle = (opts.strokeStyle || opts.color) || this.strokeStyle;
        ctx.fillStyle = opts.fillStyle || this.fillStyle;
        ctx.beginPath();
        if (isarc) {
            ctx.arc(points[0], points[1], points[2], points[3], points[4], true);   
            if (closePath) {
                ctx.closePath();
            }
            if (fill) {
                ctx.fill();
            }
            else {
                ctx.stroke();
            }
            ctx.restore();
            return;
        }
        else if (clearRect) {
            ctx.clearRect(points[0], points[1], points[2], points[3]);
            ctx.restore();
            return;
        }
        else if (fillRect || strokeRect) {
            if (fillRect) {
                ctx.fillRect(points[0], points[1], points[2], points[3]);
            }
            if (strokeRect) {
                ctx.strokeRect(points[0], points[1], points[2], points[3]);
                ctx.restore();
                return;
            }
        }
        else if (points && points.length){
            var move = true;
            //var padString = $(ctx.canvas.parentElement).attr('pad');
            var pad = 0;
            //if(padString ){
            	//pad = parseInt(padString);
            //}
            $(ctx.canvas.parentElement).attr('pad',pad + 2);
            for (var i=0; i<points.length; i++) {
                if (points[i][0] != null && points[i][1] != null) {
                    if (move) {
                        ctxPattern.moveTo(points[i][0], points[i][1]);
                        move = false;
                    }
                    else {
                        var y = points[i][1] + (points[i - 1][1] - points[i][1]) / 2 + pad;
                        ctxPattern.lineTo(points[i - 1][0], y);
                        ctxPattern.lineTo(points[i][0], y);
                        ctxPattern.lineTo(points[i][0], points[i][1]);
                    }
                }
                else {
                    move = true;
                }
            }
            if (closePath) {
                ctxPattern.closePath();
            }
            if (fill) {
                ctx.fill();
            }
            else {
                ctx.stroke();
            }
        }
        ctx.restore();
    };
    
    
    $.jqplot.PlanShadowRenderer = function(){
        $.jqplot.ShadowRenderer.call(this);
    };
    
    $.jqplot.PlanShadowRenderer.prototype = new $.jqplot.ShadowRenderer();
    $.jqplot.PlanShadowRenderer.prototype.constructor = $.jqplot.PlanShadowRenderer;
    
    $.jqplot.PlanShadowRenderer.prototype.draw = function(ctx, points, options) {
        ctx.save();
        var opts = (options != null) ? options : {};
        var fill = (opts.fill != null) ? opts.fill : this.fill;
        var fillRect = (opts.fillRect != null) ? opts.fillRect : this.fillRect;
        var closePath = (opts.closePath != null) ? opts.closePath : this.closePath;
        var offset = (opts.offset != null) ? opts.offset : this.offset;
        var alpha = (opts.alpha != null) ? opts.alpha : this.alpha;
        var depth = (opts.depth != null) ? opts.depth : this.depth;
        var isarc = (opts.isarc != null) ? opts.isarc : this.isarc;
        var linePattern = (opts.linePattern != null) ? opts.linePattern : this.linePattern;
        ctx.lineWidth = (opts.lineWidth != null) ? opts.lineWidth : this.lineWidth;
        ctx.lineJoin = (opts.lineJoin != null) ? opts.lineJoin : this.lineJoin;
        ctx.lineCap = (opts.lineCap != null) ? opts.lineCap : this.lineCap;
        ctx.strokeStyle = opts.strokeStyle || this.strokeStyle || 'rgba(0,0,0,'+alpha+')';
        ctx.fillStyle = opts.fillStyle || this.fillStyle || 'rgba(0,0,0,'+alpha+')';
        for (var j=0; j<depth; j++) {
            var ctxPattern = $.jqplot.LinePattern(ctx, linePattern);
            ctx.translate(Math.cos(this.angle*Math.PI/180)*offset, Math.sin(this.angle*Math.PI/180)*offset);
            ctxPattern.beginPath();
            if (isarc) {
                ctx.arc(points[0], points[1], points[2], points[3], points[4], true);                
            }
            else if (fillRect) {
                if (fillRect) {
                    ctx.fillRect(points[0], points[1], points[2], points[3]);
                }
            }
            else if (points && points.length){
                var move = true;
                for (var i=0; i<points.length; i++) {
                    if (points[i][0] != null && points[i][1] != null) {
                        if (move) {
                            ctxPattern.moveTo(points[i][0], points[i][1]);
                            move = false;
                        }
                        else {
                        	 var y = points[i][1] + (points[i - 1][1] - points[i][1]) / 2;
                             ctxPattern.lineTo(points[i - 1][0], y);
                             ctxPattern.lineTo(points[i][0], y);
                             ctxPattern.lineTo(points[i][0], points[i][1]);
                        }
                    }
                    else {
                        move = true;
                    }
                }
                
            }
            if (closePath) {
                ctxPattern.closePath();
            }
            if (fill) {
                ctx.fill();
            }
            else {
                ctx.stroke();
            }
        }
        ctx.restore();
    };
    
    $.jqplot.PlanLineRenderer = function(){
        $.jqplot.LineRenderer.call(this);
        this.shapeRenderer = new $.jqplot.PlanShapeRenderer();
        this.shadowRenderer = new $.jqplot.PlanShadowRenderer();
    };
    
    $.jqplot.PlanLineRenderer.prototype = new $.jqplot.LineRenderer();
    $.jqplot.PlanLineRenderer.prototype.constructor = $.jqplot.PlanLineRenderer;
	
	function cloneObj(obj) {
		var objClone;
	    if (obj.constructor == Object){
	        objClone = new obj.constructor(); 
	    }else{
	        objClone = new obj.constructor(obj.valueOf()); 
	    }
	    for(var key in obj){
	        if ( objClone[key] != obj[key] ){ 
	            if ( typeof(obj[key]) == 'object' ){ 
	                objClone[key] = cloneObj(obj[key]);
	            }else{
	                objClone[key] = obj[key];
	            }
	        }
	    }
	    objClone.toString = obj.toString;
	    objClone.valueOf = obj.valueOf;
	    return objClone; 
	}
	
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
	
	maps['XJ'] = {x:265,y:102,label:'新疆'};
	maps['XZ'] = {x:268,y:176,label:'西藏'};
	maps['YN'] = {x:356,y:237,label:'云南'};
	maps['HLJ'] = {x:507,y:43,label:'黑龙江'};
	maps['NMG'] = {x:401,y:107,label:'内蒙古'};
	maps['GX'] = {x:409,y:238,label:'广西'};
	maps['GZ'] = {x:399,y:218,label:'贵州'};
	maps['BJ'] = {x:448,y:106,label:'北京'};
	maps['SC'] = {x:364,y:186,label:'四川'};
	maps['CQ'] = {x:402,y:191,label:'重庆'};
	maps['QH'] = {x:324,y:143,label:'青海'};
	maps['GXU'] = {x:331,y:107,label:'甘肃'};
	maps['NX'] = {x:387,y:133,label:'宁夏'};
	maps['HN'] = {x:418,y:275,label:'海南'};
	maps['JL'] = {x:503,y:72,label:'吉林'};
	maps['LN'] = {x:489,y:92,label:'辽宁'};
	maps['HB'] = {x:429,y:127,label:'河北'};
	maps['SD'] = {x:463,y:139,label:'山东'};
	maps['JS'] = {x:482,y:161,label:'江苏'};
	maps['GD'] = {x:443,y:242,label:'广东'};
	maps['HN'] = {x:426,y:205,label:'湖南'};
	maps['HB'] = {x:482,y:161,label:'湖北'};
	maps['HN'] = {x:436,y:160,label:'河南'};
	maps['AH'] = {x:462,y:172,label:'安徽'};
	
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
		plugins : ['chart','plat','plan'],
		parse : function(context) {
			for ( var i = 0; i < $.esnParser.plugins.length; i++) {
				var name = $.esnParser.plugins[i];
				var r = $('.esn-' + name, context);
				if(name === 'plat'){
					mapImage.onload = (function(plat,name){
						return function(){
							if (plat.length) {
								plat[name]();
							}
						};
					})(r,name);
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
	
	
	$.fn.initChart = function(datasource, options,headerFunc,defaults) {
		options = options || {};
		return this.each(function(){
			var state = $.data(this, 'chart');
			var opts;
			
			if (state){
				opts = $.extend(state.options, options);
			} else {
				var t = $(this);
				opts = $.extend({}, defaults,$.esnParser.parseOptions(this),{
					width: (parseInt(t.css('width')) || undefined),
					height: (parseInt(t.css('height')) || defaults.defaultHeight),
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
				state = $.data(this, 'chart', {
					options: opts,
					chart: wrapChart(this),
					isLoaded: false
				});
			}
			headerFunc(this);
			setBorder(this);
			state.datasource = datasource || opts.datasource;
			state.rawdata = state.datasource;
			state.options.rawseries = state.options.series;
			$(this).esnDraw();
		});
	};
	
	

	$.fn.chart = function(datasource, options) {
		$.fn.initChart.call(this,datasource, options,addChartHeader,$.fn.chart.defaults);
	};
	
	
	$.fn.plat = function(datasource, options) {
		$.fn.initChart.call(this,datasource, options,addMapHeader,$.fn.map.defaults);
	};
	
	$.fn.plan = function(datasource, options) {
		$.fn.initChart.call(this,datasource, options,addPlanHeader,$.fn.chart.defaults);
	};
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
	
	
	$.fn.drawPlan = function(){
		var state = $.data(this[0], 'chart');
		destroyChart(state);
		var maxXaxis = wrapMax(state.datasource.data,5,2);
		var data = new Array();
		var datasourceData = state.datasource.data;
		for(var i=0;i < datasourceData.length;i++){
			var line = new Array();
			for(var j = 0;j < datasourceData[i].length;j++){
				line.push([datasourceData[i][j],j+1]);
			}
			data.push(line);
		}
		
		if(state.datasource){
			var opts = {
				sortData:false,
				seriesDefaults: {
					shadow: true,
					renderer: $.jqplot.PlanLineRenderer,
					markerOptions:{
						style: 'filledSquare',
					}
				},
				axes: { 
			          xaxis: {
			        	  renderer:$.jqplot.LinearAxisRenderer,
			        	  min:0,
			        	  max:maxXaxis % 2 == 0 ? maxXaxis:maxXaxis+1,
			        	  tickInterval:maxXaxis > 10 ? 2:1,
			          }, 
			          yaxis: { 
			        	  ticks:wrapLineLabel(state.datasource.ylabel)
			        }
			      }
	    	};
			state.jqplot = $.jqplot(state.chart.find('>div.chart-body').attr("id"),data,$.extend(opts, customStyle(state)));
		}
	};
	
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
				        	  ticks:wrapLineLabel(state.datasource.xlabel),
				          }, 
				          yaxis: { 
				        	  min:0,
				        	  max:wrapMax(state.datasource.data,80,10),
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
						 pointLabels: {show: true}
					},
					axes: { 
				          xaxis: {
				        	  renderer: $.jqplot.CategoryAxisRenderer,
				              ticks: wrapBarXLabel(state.datasource),
				          }, 
				          yaxis: { 
				        	  min:0,
				        	  max:wrapMax(state.datasource,80,10),
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
		var innerWidth = $(this).width() - 20;
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
	$.fn.drawPlanTable  = function(){
		var state = $.data(this[0], 'chart');
		destroyChart(state);
		if(!state.datasource){
			return;
		}
		var innerWidth = $(this).width() - 20;
		var innerHeigth = $(this).height() <= 0 ? state.options.height:$(this).height();
		var columns  = new Array();
		columns.push({label:'Action'});
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
			$('span', th).html(col.label + (j!=0?"(Day)":""));
			$('span.datagrid-sort-icon', th).html('&nbsp;');
		}
		var datasource = state.datasource;
		var rows = new Array();
		for(var x = 0; x < datasource.ylabel.length; x++){
			var row = new Array();
			row.push(datasource.ylabel[x]);
			for(var y = 0; y < datasource.data.length; y++){
				row.push(datasource.data[y][x]);
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
	
	// draw pie
	
	$.fn.drawPie =function(){
		var state = $.data(this[0], 'chart');
		destroyChart(state);
		if(state.datasource){
			$(this).addClass('chart-bar');
			var opts = {
					 seriesDefaults: {
        renderer: jQuery.jqplot.PieRenderer, 
        rendererOptions: {
          showDataLabels: true
        }
      },
			};
			state.jqplot = $.jqplot(state.chart.find('>div.chart-body').attr("id"),[state.datasource.data],$.extend(opts, customStyle(state)));
		}
	};
	
	function wrapLineLabel(label){
		var i = 0;
		var wrapLabel = new Array();
		wrapLabel.push([i++,'']);
		for(var j = 0;j < label.length;j++){
			wrapLabel.push([i++,label[j]]);
		}
		wrapLabel.push([i,'']);
		return wrapLabel;
	}
	
	function wrapBarXLabel(datasource){
		var xlabel = new Array();
		for(var j = 0;j < datasource.xlabel.length;j++){
			xlabel.push(datasource.xlabel[j]);
		}
		xlabel.push('');
		return xlabel;
	}
	
	function wrapMax(data,def,cap){
		var max = def;
		for(var i=0;i < data.length;i++){
			for(var j = 0;j < data[i].length;j++){
				if(data[i][j] > max){
					max = data[i][j];
				}
			}
		}
		return parseInt(max) + cap;
	}
	
	function wrapChart(target){
		var chart = $(target).addClass('chart-body').wrap('<div class="chart"></div>').parent();
		return chart;
	}
	
	
	function addHeader(target,cycles,menus){
		var state = $.data(target, 'chart');
		var opts =  state.options;
		var chart = state.chart;
		//debugger;
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
					createLis(cycles) + 
					'</ul></li></ul>' + 
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
					createLis(menus) + 
					'</ul></li></ul>' + 
				'</div>';
				var menuOB =  $(menu).appendTo(tool);
				menuOB.find("a[class!='hide']").each(function(i){
					$(this).bind("click", function() {
						$.data(target, 'chart').options.view = $(this).text().toLowerCase();
						$(target).esnDraw();
						return false;
					});
				});
			}
			
			if(opts.setting){
				var menu = '<div class="menu">' + 
					'<ul>' + 
					'<li><a class="hide" href="javascript:void(0)"><img class="chart_tool_menu" src="image/setting_icon.png" width="20" height="20"/></a> ' + 
					'<ul>'  + 
					'</ul></li></ul>' + 
				'</div>';
				var menuOB =  $(menu).appendTo(tool);
				menuOB.find("input").each(function(i){
					$(this).bind("click", function(){
						return true;
					});
				});
			}
			
			if(opts.chooseable){
				var menu = '<div class="menu lineCheck">' + 
				'<ul>' + 
				'<li><a href="javascript:void(0)"><img class="chart_tool_menu" src="image/setting_icon.png" width="20" height="20"/></a> ' + 
				'<ul>' + createCheckboxs(['Activity Force','Communication Force','Attractive Force','Coverage Rate','Close Rate','Lead Turnover Rate']) + 
				'</ul></li></ul>' + 
				'</div>';
				var menuOB =  $(menu).appendTo(tool);
				menuOB.find(".chooseableImg").each(function(i){
					$(this).bind("click", function(event){
						resetDatasource(target);
						$(target).esnDraw();
						return true;
					});
				});
			}
			
			chart.find('>div.chart-body').removeClass('chart-body-noheader');
		} else {
			chart.find('>div.chart-body').addClass('chart-body-noheader');
		}
	}
	
	function resetDatasource(target){
		var lineCheck = $(target).prev().find('.lineCheck');
		if(lineCheck.size() > 0){
			var checked = lineCheck.find("img[value]");
			var state = $.data(target, 'chart');
			var datasource = cloneObj(state.rawdata);
			var series = [];
			datasource.data = [];
			for(var i = 0; i < checked.length; i ++){
				if($(checked[i]).attr('src').indexOf('_selected.png') > 0){
					var index = parseInt($(checked[i]).attr('value'));
					datasource.data.push(state.rawdata.data[index * 2]);
					datasource.data.push(state.rawdata.data[index * 2 + 1]);
					series.push(state.options.rawseries[index* 2] ||  ("series" + (index* 2 + 1)));
					series.push(state.options.rawseries[index* 2 + 1] ||  ("series" + (index* 2 + 2)));
					//datasource.data.push(state.rawdata.data[index]);
					//series.push(state.options.rawseries[index] ||  ("series" + (index + 1)));
				}
			}
			state.datasource = datasource;
			state.options.series = series;
		}
	}
	
	function addChartHeader(target){
		addHeader(target,['Day','Week','Month'],['Line','Bar','Table']);
	}
	function addPlanHeader(target){
		addHeader(target,['Day','Week','Month'],['Line','Table']);
	}
	
	function createLis(array){
		var lis = "";
		for(var i = 0; i < array.length; i++){
			lis += '<li><a href="javascript:void(0)">' + array[i] + '</a></li>';
		}
		return lis;
	}
	
	$.fn.changeImg = function(This){
		var img = This.find("img");
		var src = img.attr('src');
		if(src.indexOf('_selected.png') > 0){
			src = src.replace('_selected.png','.png');
		}else{
			src = src.replace('.png','_selected.png');
		}
		img.attr('src',src);
	};
	
	function createCheckboxs(array){
		var lis = "";
		for(var i = 0; i < array.length; i++){
			lis += '<li style="vertical-align: top;height: 26px;"><a onclick="$.fn.changeImg($(this))" class ="men_img" href="javascript:void(0)"><img title="' + array[i]  +'" src="image/' + array[i].replace(new RegExp(" ","gm"), '')  +'_selected.png" value=' + i +'/></a></li>';
		}
		lis += '<li style="vertical-align: top;height: 13px;margin: 1px;"><img class="chooseableImg" src="image/ok.png"/></li>';
		return lis;
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
	
	$.fn.esnDraw = function(){
		if(this.hasClass('esn-chart')){
			this.esnChartDraw();
		}else if(this.hasClass('esn-plat')){
			this.esnMapDraw();
		}else if(this.hasClass('esn-plan')){
			this.esnPlanDraw();
		}
	};
	
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
		this.addClass('chart-map');
		//if($(this).options)
		var innerWidth = $(this).width() - 20;
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
		addHeader(target,['Day','Week','Month'],['Map','Table']);
	}
	
	function drawCycle(target,cycle){
		var state = $.data(target, 'chart');
		destroyChart(state);
		state.datasource = cycle(target,state.options);
		state.rawdata = state.datasource;
		resetDatasource(target);
		$(target).esnDraw();
	}
	
	$.fn.esnMapDraw = function(){
		if(this.is(':visible')){
			var opts = $.data(this[0], 'chart').options;
			var view = opts.view || 'table';
			if(view == 'map' || view == 'plat'){
				this.drawMap();
			}else{
				this.drawMapTable();
			}
		}
	};
	$.fn.esnChartDraw = function(){
		if(this.is(':visible')){
			var opts = $.data(this[0], 'chart').options;
			var view = opts.view || 'line';
			if(view == 'line'){
				this.drawLine();
			}else if(view == 'bar'){
				this.drawBar();
			}else if(view=='table'){
				this.drawChartTable();
			}else if(view=='pie'){
				this.drawPie();
			}
		}
	};
	
	$.fn.esnPlanDraw = function(){
		if(this.is(':visible')){
			var opts = $.data(this[0], 'chart').options;
			var view = opts.view || 'line';
			if(view == 'line'){
				this.drawPlan();
			}else if(view=='table'){
				this.drawPlanTable();
			}
		}
	};
	
	$.fn.map.defaults = {
			formatable:true,	
			setting:false,
			timeable:true,
			defaultHeight:300,
			loadDayResource:function(target,options){return;},
			loadWeekResource:function(target,options){return;},
			loadMonthResource:function(target,options){return;},
	};
	
	$.fn.chart.defaults = {
			formatable:true,	
			setting:false,
			timeable:true,
			chooseable:false,
			defaultHeight:300,
			loadDayResource:function(target,options){return;},
			loadWeekResource:function(target,options){return;},
			loadMonthResource:function(target,options){return;},
	};
});

$(function() {
	//debugger;
	$.esnParser.parse(); 
});