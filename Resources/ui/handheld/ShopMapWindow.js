function ShopMapWindow(record, tabGroup) {
	var win = Titanium.UI.createWindow({
		title:'地图'
	});
	//ryan: to make all the icons showed in the map... have to do overlay not annotations? 
	var isAndroid = false;
	if (Titanium.Platform.name == 'android') {
		isAndroid = true;
	}
	
	var isMW = (Ti.Platform.osname === 'mobileweb');
	//
	// CREATE ANNOTATIONS
	//
	var numAnnotations = 3;//ryan: to be loaded from backend
	//generate the number of annotation in this area
	var annotations = [];
	var shopData;
	for(var index = 0; index<numAnnotations;index++)
	{
	    shopData = record[index+1].data;//ignore Macy's just a hack, should remove +1 later'
		Ti.API.info('this shop\'s title is '+shopData.title+shopData.shopId);
		var streetImage = Titanium.Map.createAnnotation({
			title:shopData.title,
			animate:true,
			latitude:shopData.lati,
			longitude:shopData.lon,
			
			subtitle:'11am - 9pm',
			pincolor:Titanium.Map.ANNOTATION_RED,
			
			rightButton: Titanium.UI.iPhone.SystemButton.DISCLOSURE,
			leftButton:   '/images/ShopLogo_'+shopData.shopId+'_small.jpeg',
			//image: '/images/ShopLogo_'+shopId+'.jpeg',
			myid:index // CUSTOM ATTRIBUTE THAT IS PASSED INTO EVENT OBJECTS
	    });
	    

	    streetImage.addEventListener('click', function(evt)
		{
		    Ti.API.info('mapview click clicksource 2 = ' + evt.clicksource);

			if (evt.clicksource=='rightButton') {
				var ShopDashboardWindow  = require('/ui/handheld/ShopDashboardWindow');
			    var winShop = new ShopDashboardWindow(shopData);
			    tabGroup.containingTab.open(winShop);
			}	
		});
	    annotations[index] = streetImage;
		
	}

	
	//
	// PRE-DEFINED REGIONS
	//var regionSV = {latitude:37.337681,longitude:-122.038193,animate:true,latitudeDelta:0.04, longitudeDelta:0.04};
	var regionBJ = {longitude:116.41975329994212, latitude:39.92494491320885,animate:true,latitudeDelta:0.04, longitudeDelta:0.04};
	//
	// CREATE MAP VIEW
	//
	var mapview = Titanium.Map.createView({
		mapType: Titanium.Map.STANDARD_TYPE,
		region:regionBJ,
		animate:true,
		regionFit:true,
		userLocation:true,
		//annotations:[atlanta]
	});
	mapview.addAnnotations(annotations);

	mapview.selectAnnotation(mapview.annotations[0]);
	win.add(mapview);
	
	//
	// NAVBAR BUTTONS
	//

	var wireClickHandlers = function() {


		
		sat.addEventListener('click',function() {
			// set map type to satellite
			mapview.setMapType(Titanium.Map.SATELLITE_TYPE);
		});
		
		std.addEventListener('click',function() {
			// set map type to standard
			mapview.setMapType(Titanium.Map.STANDARD_TYPE);
		});
		
		hyb.addEventListener('click',function() {
			// set map type to hybrid
			mapview.setMapType(Titanium.Map.HYBRID_TYPE);
		});
		
		zoomin.addEventListener('click',function() {
			mapview.zoom(1);
		});
		
		zoomout.addEventListener('click',function() {
			mapview.zoom(-1);
		});
	};
	
	if (!isAndroid) {

		// activate annotation
		mapview.selectAnnotation(mapview.annotations[0].title,true);
		
		mapview.addEventListener('complete', function()
		{
			Ti.API.info("map has completed loaded region");
		});
		
		
		var flexSpace = Titanium.UI.createButton({
			systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
		});
		
		// button to change map type to SAT
		sat = Titanium.UI.createButton({
			title:'Sat',
			style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
		});
		// button to change map type to STD
		std = Titanium.UI.createButton({
			title:'Std',
			style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
		});
		// button to change map type to HYBRID
		hyb = Titanium.UI.createButton({
			title:'Hyb',
			style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
		});
		// button to zoom-in
		zoomin = Titanium.UI.createButton({
			title:'+',
			style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
		});
		// button to zoom-out
		zoomout = Titanium.UI.createButton({
			title:'-',
			style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
		});
		
		wireClickHandlers();
		
		win.setToolbar([flexSpace,std,flexSpace,hyb,flexSpace,sat,flexSpace,flexSpace,flexSpace,zoomin,flexSpace,zoomout,flexSpace]);
	} else { //android
		var activity = Ti.Android.currentActivity;
		activity.onCreateOptionsMenu = function(e) {
			var menu = e.menu;
			
			sat = menu.add({title : 'Sat'});
			std = menu.add({title : 'Std'});
			hyb = menu.add({title : 'Hyb'});
			zoomin = menu.add({title : "Zoom In"});
			zoomout = menu.add({title : 'Zoom Out'});
			
			wireClickHandlers();
		};
	}
	
	//
	// EVENT LISTENERS
	//
	
	// region change event listener
	var event1 = 'regionChanged';
	if (Ti.version >= '3.0.0') {
		event1 = 'regionchanged';
	}
	mapview.addEventListener(event1,function(evt)
	{
		Titanium.API.info('maps region has updated to '+evt.longitude+','+evt.latitude+','+evt.latitudeDelta+','+evt.longitudeDelta);
	    Titanium.API.info(mapview.latitudeDelta+','+mapview.longitudeDelta);
	    if(evt.latitudeDelta === mapview.latitudeDelta)
	    {
	        Titanium.API.info('latitudeDelta property matches event values');
	    }
	    if(evt.longitudeDelta === mapview.longitudeDelta)
	    {
	        Titanium.API.info('longitudeDelta property matches event values');
	    }
	});
	
	var annotationAdded = false;
	var annotationAddedNum = 0;
// 	
	// // map view click event listener
	// mapview.addEventListener('click',function(evt)
	// {
// 	
		// // map event properties
		// var annotation = evt.annotation;
		// var title = evt.title;
		// var clickSource = evt.clicksource;
// 	
		// // custom annotation attribute
		// var myid = (evt.annotation)?evt.annotation.myid:-1;
// 	
		// Ti.API.info('mapview click clicksource = ' + clickSource);
		// if ((myid<index) &&  (myid>=0) && (clickSource=='rightButton'))
		// {
				// //mapview.selectAnnotation(annotations[myid]);
				// // Ti.API.info('removed annotation id ', myid, ' remaining anno ', annotationAddedNum);
				// // var ShopDashboardWindow  = require('/ui/handheld/ShopDashboardWindow');
				// // var winShop = new ShopDashboardWindow(record[myid+1].data);
				// // tabGroup.containingTab.open(winShop);
// 
// 			
		// }
	// });

	
	
	return win;
};

module.exports = ShopMapWindow;