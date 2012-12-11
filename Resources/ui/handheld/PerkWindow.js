function PerkWindow(title) {
	var win = Ti.UI.createWindow({
		title:title,
		backgroundColor:'black'
	});
	this.win = win;
	/*
	 * this part talks to server and issue callbacks
	 */
	var that = this;
	var Client = require('/Client');
 	var client = new Client();
 	client.get({
 		func: Client.prototype.functions.getPerkData,
 		object: {},
		success: function(data){ that.createTableView(data) },
		error: function(data, xhr) { that.onError(data, xhr) },
 	});
 	
 	return win;
 }
	
PerkWindow.prototype.createTableView = function(perkData) {
	var perkViewArr=[];
	var shadowViewArr=[];
	var topArr = [];
	var topArr_shadow = [];
	var shadowThick = 2;
	var titleHeight = 60;
	
	var titleHeight_fold =  ((perkData.length==0) || (perkData.length==1) ) ? 0 :titleHeight_fold =100/(perkData.length-1) ;
    Ti.API.info('mode2 fold height '+titleHeight_fold+' perk length'+perkData.length + ' '+100/(perkData.length-1) );

	var scrollViewHeight = 500;
	var conHeight = perkData.length *  titleHeight;
	
	var scrollView = Ti.UI.createScrollView({
		top:0,
		backgroundColor:'black',
		height:scrollViewHeight,
		contentHeight:conHeight
	});
	
	//layout the perk view in two modes: 
	//0: exhibit view
	//1: fold view
	var perkMode = 0;
	
	for (var perkId=0; perkId<perkData.length; perkId++)
	{
		var perkView = new PerkViewTemplate(perkId, perkData.record[perkId]);
		var top_0 = perkId *  titleHeight;
		perkView.top = top_0;
		perkViewArr.push(perkView);
		topArr.push(top_0);
		
		// if not the top one, draw a shadow on the top of the second card
		if (perkId!=0) {
			shadow =  Ti.UI.createView({
			backgroundColor:"#787878",

			});
			shadow.zIndex = perkView.zIndex -1;
			shadow.width = perkView.width;		
			shadow.height = 20;
			var top_1 = top_0 - shadowThick;
			shadow.top = top_1;
			shadow.left = perkView.left;
			shadow.borderRadius = perkView.borderRadius;
			shadowViewArr.push(shadow);
			topArr_shadow.push(top_1);
		}
		
	}
	scrollView.add(perkViewArr);
	scrollView.add(shadowViewArr);

	var onClickId = 0;
	function perkViewOnClick(e){
		Ti.API.info('onClickId = : '+e.source.perkId);

		//Ti.API.info('perkmode '+perkMode);
		if (!perkMode) {
			//record which perk been expanded 
				onClickId = e.source.perkId;
			
			if (onClickId!=0) {
				var perkOnClick = perkViewArr[onClickId];
					perkOnClick.animate({top:0, duration:500});
			};
			var index=0;
			
							
			for (var perkId=0; perkId<perkData.length; perkId++)
			{
				if (perkId!=onClickId) {
					
					var top_0 = (index++)*titleHeight_fold;
					var perkOffClick = perkViewArr[perkId];
					perkOffClick.animate({top:400+top_0, duration:500});
					if (perkId != 0 ) {
						var shadow =  shadowViewArr[perkId-1];
						shadow.animate({top:scrollViewHeight+100, duration:500}); //disapear it.
					}
				}

			}				
			//update the state machine to mode 1
			perkMode = 1; // to the fold view
			scrollView.contentHeight = scrollViewHeight; //disable scroll
		}
		else
		//perkMode = 1
		{
			if (onClickId == e.source.perkId) {
				// perkViewArr[onClickId].animate({view:perkViewArr[onClickId + 1],transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
				//scrollView.animate({view:perkViewArr[onClickId + 1],transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
			}
			else {
				
				for (var perkId=0; perkId<perkViewArr.length; perkId++)
				{
					//Ti.API.info('mode 1 UI:perkId'+perkId+'top'+topArr[perkId]);
					perkViewArr[perkId].animate({top:topArr[perkId], duration:500});
					if (perkId != 0) {
						shadowViewArr[perkId-1].animate({top:topArr_shadow[perkId-1], duration:500});
					}
						
				}
				//switching to mode 0
				perkMode = 0;
				scrollView.contentHeight =  conHeight;
			}
				
		}
		
	}

	scrollView.addEventListener('click', function(e)
	{
		Ti.API.info('mode on '+ perkMode +
					' click source = '+ e.source.classtype)
		
		// use inline style
		if (e.source.classtype=='perkView')
		{
			perkViewOnClick(e);
		}
		else if(e.source.classtype=='perkViewShopLogo') {
			if (perkMode == 1) {
				perkViewOnClick(e);
			}
			
		}

	});
	
	this.win.add(scrollView);
	
	// return win;
};

module.exports = PerkWindow;


function PerkViewTemplate(perkId, perk) {
	// need a better pull
	for (var i = 0; i<shopData.length;i++ ) {
		if (perk.shopId==shopData[i].shopId) { var shop = shopData[i]}
	}
	//ui
	var perkHeight = 400;


	var backView= Ti.UI.createView({
		backgroundColor:shop.color,
		zIndex:(perkId),
		width:310,
		height:perkHeight,
		//top:(titleHeight*perkId),
		left:5,
		borderRadius:10,
		classtype:'perkView',
		perkId:perkId
	});
	
	var shopLogo = Ti.UI.createImageView({
		top:5,
		left:5,
		image:'/images/ShopLogo_'+shop.shopId+'.jpeg',
		height:50,
		width:100,
		classtype:'perkViewShopLogo',
		perkId:perkId
	});
	
	var titleLabel = Ti.UI.createLabel({
		top:20,
		left:120,
		width:120,
		text:shop.title,
		color:'black',
		classtype:'perkView',
		perkId:perkId
		
		
	});

	var valueLabel = Ti.UI.createLabel({
		top:10,
		right:10,
		width: 50,
		text:perk.value,
		color:'black',
		classtype:'perkView',
		perkId:perkId
	});
	var perkCard = Ti.UI.createView({
		top:80,
		left:10,
		height:200,
		width:290,
		perkId:perkId,
		classtype:'perkViewCard'
	});
	

	backView.add(shopLogo);
	backView.add(titleLabel);
	backView.add(valueLabel);
	backView.add(perkCard);
	
	var perkCardFront= Ti.UI.createImageView({
		top:0,
		left:0,
		image:'/images/perk_'+perkId+'.png',
		height:'auto',
		width:'auto',
		perkId:perkId,
		classtype:'perkViewCard'
	});
	var perkCardBack= Ti.UI.createImageView({
		top:0,
		left:0,
		image:'/images/perk_'+perkId+'.png',
		height:'auto',
		width:'auto',
		perkId:perkId,
		classtype:'perkViewCard'
	});
	
	perkCard.add(perkCardFront);
	//perkCard.add(perkCardBack);
	perkCardFront.addEventListener('click', function(e)
	{
		perkCard.animate({view:perkCardBack,transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
	});
	perkCardBack.addEventListener('click', function(e)
	{
		perkCard.animate({view:perkCardFront,transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
	});
	
	
	
	return backView;

}
