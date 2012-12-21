function AddCentralButtonView(win)
{
	var top = 400;
	var left = 130;
	var width = 100;
	var height = 100;
	var backView = Ti.UI.createView({
		left:left, //how to make it at center?
		top:top,
		backgroundColor:'transparent',
		width: width,
		height: height,
		zIndex:100
	});
	
	
	var button = Ti.UI.createButton({
		top:0,left:0,width:width, height:height,
		style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
		});
		
	//use switch
	var winId = win.winId;
	if (winId){
		button.backgroundImage = '/images/ShopLogo_1.jpeg';

	}
	else
	{
		button.backgroundImage = '/images/ShopLogo_2.jpeg';
	}
	
	function action(e){
		Ti.API.info('open from with animation'+win.title + winId);
		try
		{
			var rect = e.location;
			var transform = Ti.UI.create2DMatrix().scale(0);
			var view = Ti.UI.createView({
				backgroundColor:'black',
				transform:transform,
				opacity:0,
				top:top,
				left:left,
				height:height,
				width:width
			});
			var close = Ti.UI.createButton({
				title:'Close',
				width:100,
				height:30
			});
			view.add(close);
			win.add(view);
			var animation = Ti.UI.createAnimation();
			animation.left = 0;
			animation.right = 0;
			animation.top = 0;
			animation.bottom = 0;
			animation.width = 320;
			animation.height = 460;
			animation.opacity = 1;
			animation.duration = 500;
			animation.transform = Ti.UI.create2DMatrix();
			view.animate(animation);
		    Ti.API.info("animate it");

			close.addEventListener('click',function()
			{
				view.animate({
					top:top,
					left:left,
					height:height,
					width:width,
					opacity:0,
					duration:400
				},function()
				{
					win.remove(view);
				});
			});
		}
		catch(E)
		{
			Ti.API.error("ERROR = "+E);
		}
	};

	button.addEventListener('click', function(e){
		action(e);
	});
	
	backView.add(button);	
	//win.add(backView);
	
	//return view;
}

module.exports = AddCentralButtonView;