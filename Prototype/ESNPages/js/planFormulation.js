$.fn.dataTableExt.oApi.fnGetColumnData = function(oSettings, iColumn, bUnique,
		bFiltered, bIgnoreEmpty) {
	// check that we have a column id
	if (typeof iColumn == "undefined")
		return new Array();

	// by default we only want unique data
	if (typeof bUnique == "undefined")
		bUnique = true;

	// by default we do want to only look at filtered data
	if (typeof bFiltered == "undefined")
		bFiltered = true;

	// by default we do not want to include empty values
	if (typeof bIgnoreEmpty == "undefined")
		bIgnoreEmpty = true;

	// list of rows which we're going to loop through
	var aiRows;

	// use only filtered rows
	if (bFiltered == true)
		aiRows = oSettings.aiDisplay;
	// use all rows
	else
		aiRows = oSettings.aiDisplayMaster; // all row numbers

	// set up data array
	var asResultData = new Array();

	for ( var i = 0, c = aiRows.length; i < c; i++) {
		iRow = aiRows[i];
		var aData = this.fnGetData(iRow);
		var sValue = aData[iColumn];

		// ignore empty values?
		if (bIgnoreEmpty == true && sValue.length == 0)
			continue;

		// ignore unique values?
		else if (bUnique == true && jQuery.inArray(sValue, asResultData) > -1)
			continue;

		// else push the value onto the result data array
		else
			asResultData.push(sValue);
	}

	return asResultData;
}

function fnCreateSelect(aData) {
	var r = '<select><option value=""></option>', i, iLen = aData.length;
	for (i = 0; i < iLen; i++) {
		r += '<option value="' + aData[i] + '">' + aData[i] + '</option>';
	}
	return r + '</select>';
}

var asInitVals = new Array();

var oTable;

var actionString = '<ul><li><div class="unlock"></div></li><li><div class="editp1 editp"></div></li><li><div class="star"></div></li><li><div class="delete1 delete"></div></li></ul>';

var okAndCan = '<div class="cancleButton">Cancle</div><div class="saveButton">OK</div>';

$(function() {
	page = "planNav"
	navSelected("plan");

	var oTable = $('.marketingPlan').dataTable({
		"bPaginate" : false,
		"bStateSave" : true,
		"bSort" : false,
		"bAutoWidth" : false,
		"bInfo" : false,
		"bDestroy" : true,
		"oLanguage" : {
			"sSearch" : ""
		}
	});



   
	/* Add a select menu for each TH element in the table footer */
	function refreshtfoot() {
		$("table tfoot th").each(function(i) {
			this.innerHTML = fnCreateSelect(oTable.fnGetColumnData(i));
			$('select', this).change(function() {
				oTable.fnFilter($(this).val(), i);
			});

		});

	}
	refreshtfoot();

	$(".marketingPlan tbody tr")
			.live(
					'click',
					function(e) {
						e.stopPropagation();
						if($(this).hasClass('row_selected')==false){
						if (oTable.$('tr').find('td:last-child').find('ul')
								.html() != '') {
							oTable.$('tr.row_selected').find('td:last-child')
									.find('ul').remove();
						}
						nRow = $(this)[0];
						if (nEditing !== null && nEditing != nRow) {
							/*
							 * A different row is being edited - the edit should
							 * be save
							 */
							saveRow(oTable, nEditing);
							nEditing = nRow;
						}
						oTable.$('tr.row_selected').removeClass('row_selected');
						$(this).addClass('row_selected');
						$(this).unbind('click');
						if ($(this).find('td:last-child').find('ul').length == 0
								&& $(this).find('td:last-child').find('div').length == 0) {
							$(this).find('td:last-child').append(actionString);
						}
						}
					});

	var nEditing = null;

	$('.marketingPlan .unlock').live('click',function(e){
				e.stopPropagation();
				var This =$(this);
				var imgStr =This.css('background-image');
				var delete1 =$('.marketingPlan .delete');
				var edit =$('.marketingPlan .editp');
				if(imgStr.indexOf('un')>-1){
					This.css('background','url(image/lock.png)');
					delete1.css('background','url(image/delete.png)');
					edit.css('background','url(image/pencil.png)');
					edit.removeClass('editp1');
					delete1.removeClass('delete1');
					}else{
					This.css('background','url(image/unlock.png)');
					edit.addClass('editp1');
					delete1.css('background','url(image/delete_blue.png)');
					edit.css('background','url(image/pencil_blue.png)');
					delete1.addClass('delete1');
						}
								})

	$('.marketingPlan .editp1').live('click', function(e) {
		//e.preventDefault();
		e.stopPropagation();
		/* Get the row as a parent of the link that was clicked on */
		var nRow = $(this).parents('tr')[0];

		if (nEditing !== null && nEditing != nRow) {
			/*
			 * A different row is being edited - the edit should be canceled and
			 * this row edited
			 */
			restoreRow(oTable, nEditing);
			editRow(oTable, nRow);
			nEditing = nRow;
		} else if (nEditing == nRow && this.innerHTML == "Ok") {
			/* This row is being edited and should be saved */
			saveRow(oTable, nEditing);
			nEditing = null;
		} else {
			/* No row currently being edited */
			editRow(oTable, nRow);
			nEditing = nRow;
		}
	});

	$('.marketingPlan .cancle').live('click', function(e) {
		e.preventDefault();

		/* Get the row as a parent of the link that was clicked on */
		var nRow = $(this).parents('tr')[0];
		restoreRow(oTable, nRow);
		saveRow(oTable, nRow);
	});

	$('.marketingPlan .saveButton').live('click', function(e) {
		e.preventDefault();

		/* Get the row as a parent of the link that was clicked on */
		var nRow = $(this).parents('tr')[0];
		saveRow(oTable, nRow);
	});
	
	$('#new').die('click');
	$('#new').live(
			'click',
			function(e) {
				e.preventDefault();
				if($('#DataTables_Table_0').find('input').length==0){
				var aData = oTable.fnGetData(0);
				var aiNew;
				if (aData.length == 7) {
					aiNew = oTable.fnAddData([ 'Name', 'Associated Entity',
							'Start Time', 'Completion Time',
							'Responsible Department', 'Statistical Account',
							'Master Budget' ]);
				} else {
					aiNew = oTable.fnAddData([ 'Act Name', 'Lead Activities',
							'Plan Name', 'Type', 'Start Time',
							'Completion Time', 'Media', 'Cost', 'Owner' ]);
				}
				var nRow = oTable.fnGetNodes(aiNew[0]);
				editRow(oTable, nRow, 'new');
				nEditing = nRow;
				}
			});

	function restoreRow(oTable, nRow) {
		var aData = oTable.fnGetData(nRow);

		var jqTds = $('>td', nRow);
		for ( var i = 0, iLen = jqTds.length; i < iLen; i++) {
			if (i = iLen - 1) {
				aData[i] = aData[i] + okAndCan
			}
			oTable.fnUpdate(aData[i], nRow, i, false);
		}
		oTable.fnDraw();
	}

	function editRow(oTable, nRow, one) {
		var aData = oTable.fnGetData(nRow);
		var jqTds = $('>td', nRow);
		for ( var i = 0; i < aData.length; i++) {
			jqTds[i].innerHTML = '<input type="text" value="' + aData[i] + '">';
			if (i == aData.length - 1)
				if (one != null) {
					jqTds[i].innerHTML = '<input type="text" value="'
							+ aData[i] + '">' + okAndCan;
				} else {
					jqTds[i].innerHTML = '<input type="text" value="'
							+ aData[i] + '">'
				}
		}

	}

	function saveRow(oTable, nRow) {
		var jqInputs = $('input', nRow);
		if (typeof jqInputs[0] != 'undefined') {
			for ( var i = 0; i < jqInputs.length; i++) {
				oTable.fnUpdate(jqInputs[i].value, nRow, i, false);
			}
			oTable.fnDraw();
			refreshtfoot();
		}
	}

	function deleteRow(nRow) {
		oTable.fnDeleteRow(nRow);
		refreshtfoot();
	}

	$('.marketingPlan .cancleButton').live('click', function(e) {
		e.preventDefault();
		var nRow = $(this).parents('tr')[0];
		deleteRow(nRow);
	});

	$('.marketingPlan .delete1').live('click', function(e) {
		e.stopPropagation();
		var nRow = $(this).parents('tr')[0];
		deleteRow(nRow);
	});

	$('#marketPlan').die('click');
	$('#marketPlan').live('click', function(e) {
		$("#homecontent").load('marketingPlan.html');
	});

	$('#marketActivities').die('click');
	$('#marketActivities').live('click', function(e) {
		$("#homecontent").load('marketingActivities.html');
	});
	
	
})
