function PerkWindow(title) {
	var win = Ti.UI.createWindow({
		title:title,
		backgroundColor:'black'
	});
	Ti.include('/ui/common/Data.js');


	
	var perkViewArr=[];
	var shadowViewArr=[];
	var topArr = [];
	var topArr_shadow = [];
	var shadowThick = 2;
	var scrollViewHeight = 500;
	
	var titleHeight = 60;
		
	var conHeight = perkData.length *  titleHeight;
	
	var scrollView = Ti.UI.createScrollView({
		top:0,
		backgroundColor:'black',
		height:scrollViewHeight,
		contentHeight:conHeight
	});

	var titleHeight_fold =  ((perkData.length==0) || (perkData.length==1) ) ? 0 :titleHeight_fold =100/(perkData.length-1) ;
    Ti.API.info('mode2 fold height '+titleHeight_fold+' perk length'+perkData.length + ' '+100/(perkData.length-1) );
	
	
	//layout the perk view in two modes: 
	//0: exhibit view
	//1: fold view
	var perkMode = 0;
		
	for (var perkId=0; perkId<perkData.length; perkId++)
	{
		var perkView = new PerkViewTemplate(perkId);
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

	scrollView.addEventListener('click', function(e)
	{
		
		// use inline style
		if (e.source.classtype=='perkView')
		{
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
					//perkViewArr[onClickId].animate({view:perkViewArr[onClickId],transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
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

	});
	
	win.add(scrollView);
	
	return win;
};

module.exports = PerkWindow;


function PerkViewTemplate(perkId) {
	Ti.include('/ui/common/Data.js');
	var perk = perkData[perkId];
	var	shop = shopData[perk.shopId];
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
		classtype:'perkView',
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
	var perkCard= Ti.UI.createImageView({
		top:80,
		left:10,
		image:'/images/perk_'+perkId+'.png',
		height:150,
		width:290,
		perkId:perkId,
		classtype:'perkView'
	});
	backView.add(shopLogo);
	backView.add(titleLabel);
	backView.add(valueLabel);
	backView.add(perkCard);
	
		

	
	return backView;

}
