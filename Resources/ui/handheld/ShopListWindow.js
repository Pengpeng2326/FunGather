 function ShopListWindow(title) {
	var self = Ti.UI.createWindow({
 		title:title,
 		winId:1,
 		backgroundColor:'black'
 	});
 	var that = this;
	var shopTable = Ti.UI.createTableView({
    	width:320,
        data:[],
 		// search:search,
 		filterAttribute:'title',
		backgroundColor:'black',
	    className:"myShopTable"
    });
    this.shopTable = shopTable;
 
   	function openPicExhWin(e, islongclick) {
 		// event data
 		var index = e.index;
 		var section = e.section;
 		var row = e.row;
 		var rowdata = e.rowData;
		var clickName = row.clickName;
		Ti.API.info('the clickName = '+clickName+row.clickName+rowdata.shopId+e.source);
		if (clickName == 'shopTableRow'){
			var ShopDashboardWindow  = require('/ui/handheld/ShopDashboardWindow');
			var winShop = new ShopDashboardWindow(row.data);
			self.containingTab.open(winShop);
 		}
 	}
 	// create table view event listener
	shopTable.addEventListener('click', function(e) {
		openPicExhWin(e,false);
 	});
	shopTable.addEventListener('longclick', function(e) {
 		openPicExhWin(e, true);
 	});
 	//add table view to the window
	self.add(shopTable);
	
	var mapButton = Titanium.UI.createButton({
		title:'地图'
	});

	mapButton.addEventListener('click', function()
	{
		var ShopMapWindow = require('/ui/handheld/ShopMapWindow');
		var winMap = new ShopMapWindow(self);
		self.containingTab.open(winMap);
	});
	self.rightNavButton = mapButton;
	
	/*
	 * this part talks to server and issue callbacks
	 */
	var Client = require('/Client');
 	var client = new Client();
 	client.get({
 		func: Client.prototype.functions.getStoreAround,
 		object: {location: {x:0, y: 0}},
		success: function(data){ that.createTableView(data) },
		error: function(data, xhr) { that.onError(data, xhr) },
 	});
 	
 	var AddCentralButtonView = require('/ui/handheld/AddCentralButtonView');
 	AddCentralButtonView(self);
	return self;
}

ShopListWindow.prototype.onError = function(data, xhr) {
	Ti.API.info('shopListWindow error');
}

ShopListWindow.prototype.createTableView = function(data){
 	var tableData = [];
 	var shopLength = data.length;
	// var shopLength = 5; //to be removed and retrived from backend according to the users' record
	var tableRowHeight = 110;
	for (var shopId =0; shopId<shopLength; shopId++) { //dont use shopId = 0;
		Ti.API.info(shopId)
		var singleRecord = data.record[shopId]
        var row = Titanium.UI.createTableViewRow({
			height: tableRowHeight, hasChild: false, backgroundColor: 'black', selectedBackgroundColor: '#c4cde0', 
			classType:'shopTableRow', clickName:'shopTableRow',
			borderColor:"red", borderWidth: "1"		
		});
		
		var logoView = Ti.UI.createImageView({
			width:320, height:tableRowHeight - 5,
			image: singleRecord.image
			// image:'/images/ShopLogo_'+shopId+'.jpeg', // should be retrieve from the backend
		});
		row.data = singleRecord;
		row.add(logoView);
 		tableData.push(row);
 	}
 	this.shopTable.setData(tableData);
 };
 
module.exports = ShopListWindow;
