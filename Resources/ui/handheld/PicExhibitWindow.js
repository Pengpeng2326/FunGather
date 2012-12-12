function PicExhitbitWindow(record, tabWin)
{
	var CommentView = require('/ui/handheld/CommentView');
	
	

    //Ti.include('/ui/handheld/Data.js');
    var picWidth = 320;
    var shopId = (record.shopId == null) ? 0 : record.shopId;//0 if null record shop
    var imageURL = record.image;//imageUrlHeadString+record.index+".jpg";
    Ti.API.info('imageURL ' + imageURL);
    

	var win = Ti.UI.createWindow({
		title:record.title + ' 在 ' + shopData[shopId].title,
		backgroundColor:'black'
	});
	        
    var shopLogo = Titanium.UI.createImageView({
		
		width:picWidth, height: 110,
		top:0, left:0,
		image:record.shop.image,		
		classType: 'shopLogo'
	});	
	
	function openShopProfileWin(e, islongclick) {
		// event data
		var index = e.index;
		var section = e.section;
		var row = e.row;
		var rowdata = e.rowData;
		var classType = e.source.classType;
		Ti.API.info("clicked ");
		if (classType == 'shopLogo'){

			// var msg = 'row ' + row + ' index ' + index + ' ' + row.data.index + ' section ' + section  + ' row data ' + rowdata + 'classType' + classType;
			// if (islongclick) {
				// e.section.headerTitle = e.section.headerTitle + ' section has been long-clicked';
				// msg = "LONGCLICK " + msg;
			// } else {
				// e.section.headerTitle = e.section.headerTitle + ' section has been clicked';
			// }
			// Titanium.UI.createAlertDialog({title:'Table View',message:msg}).show();
			var ShopWindow  = require('/ui/handheld/ShopDashboardWindow');	
			
			var winShop = new ShopWindow(record);
			tabWin.containingTab.open(winShop);
		}
		
	}
	// create table view event listener
	shopLogo.addEventListener('click', function(e)
	{
		openShopProfileWin(e);
	});
	shopLogo.addEventListener('longclick', function(e)
	{
		openShopProfileWin(e, true);
	});    
    win.add(shopLogo);
    
	var picScrollView = Titanium.UI.createScrollView({
		contentWidth:'auto',
		contentHeight:'auto',
		top:shopLogo.height + 10,
		showVerticalScrollIndicator:false,
		showHorizontalScrollIndicator:false

		
	})
	win.add(picScrollView);
    var picView = Ti.UI.createImageView({
    	top:0, width:picWidth, height:picWidth, borderRadius:3,	
		hires:true,	
		image:record.image,
    })
    picScrollView.add(picView);

    
    var commentView = CommentView(record);
	commentView.top = picView.top + picView.height + 50 +10;
	
	picScrollView.add(commentView);
	

    return win;
}
module.exports = PicExhitbitWindow;
