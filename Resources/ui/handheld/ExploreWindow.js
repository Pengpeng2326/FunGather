function ExploreWindow(title) {

	var win = Ti.UI.createWindow({
		title:title,
		winId:3,
		backgroundColor:'black'
	});
	this.win = win;
	
	var that = this;
	win.addEventListener('open', function(){
		var Client = require('/Client');
	 	var client = new Client();
	 	client.get({
	 		func: Client.prototype.functions.getNewsFeed,
	 		object: {},
			success: function(data){ that.createTableView(data) },
			error: function(data, xhr) { that.onError(data, xhr) },
	 	});
	});
		
	return win;
}

ExploreWindow.prototype.createTableView = function(data) {
	var win = this.win;
	var ElementRow  = require('/ui/handheld/ElementRow');
	var tableData = [];
	var shopArr = []; //shop data index by userpicture Indx
	for (var i =0;i<data.length; i++) {
		// data[i].index = i;//to be removed to the datastructure 
		// need a better pull
		var singleData = data.record[i];
		// for (var i = 0; i<shopData.length;i++ ) {
			// if (singleData.shopId==shopData[i].shopId) { var shop = shopData[i];}
			// else { shop = null;}
		// }
		// shopArr.push(shop);
// 
		var row = new ElementRow(singleData,i,0);
		tableData.push(row);
	}

	
	var search = Titanium.UI.createSearchBar({
		showCancel:false
	});
	search.addEventListener('blur',function(){
		if(Ti.Platform.name === "android"){
			Ti.API.info('Going to hide soft Keyboard as we are shifting focus away from the SearchBar.');
			Ti.UI.Android.hideSoftKeyboard();
		}	
	});
	// create table view
	var tableview = Titanium.UI.createTableView({
		data:tableData,
		// search:search,
		filterAttribute:'title',
	    className:"myTableView"
	});
	
  	function openPicExhWin(e, islongclick) {
		// event data
		var index = e.index;
		var section = e.section;
		var row = e.row;
		var rowdata = e.rowData;
		var classType = e.source.classType;
		if (classType == 'exploreImageView'){

			// var msg = 'row ' + row + ' index ' + index + ' ' + row.data.index + ' section ' + section  + ' row data ' + rowdata + 'classType' + classType;
			// if (islongclick) {
				// e.section.headerTitle = e.section.headerTitle + ' section has been long-clicked';
				// msg = "LONGCLICK " + msg;
			// } else {
				// e.section.headerTitle = e.section.headerTitle + ' section has been clicked';
			// }
			// Titanium.UI.createAlertDialog({title:'Table View',message:msg}).show();
			var PicWindow  = require('/ui/handheld/PicExhibitWindow');

			var winPic = new PicWindow(row.data, win);
			win.containingTab.open(winPic);
		}
		else if(classType == 'shopLogo')
		{
			// var shop = shopArr[index];
			// var winShop = new ShopDashboardWindow(shop);
			// win.containingTab.open(winShop);

		}
		
	}
	// create table view event listener
	tableview.addEventListener('click', function(e)
	{
		openPicExhWin(e);
	});
	tableview.addEventListener('longclick', function(e)
	{
		openPicExhWin(e, true);
	});
	//add table view to the window
	win.add(tableview);
	
	var AddCentralButtonView = require('/ui/handheld/AddCentralButtonView');
 	AddCentralButtonView(win);

	// return win;
};

module.exports = ExploreWindow;