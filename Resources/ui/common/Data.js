// create table view data object
	// Ti.API.info(record);
	var allData = {};
	
	var imageUrlHeadString = 'http://thechive.files.wordpress.com/2010/01/hot-chive-hotties-';
	var likeIcon           = '/images/liked.png';
	var noLikeIcon         = '/images/noLiked.png';
		// create table view data object
	var shopData = [
		//{title:'Unknown Store', 	shopId:0,		addr:'Unknown',					city:'Unknown',			lati:0,				lon:0,					color:'', 	   	image:'/images/ShopLogo_1.jpeg'},
		{title:'Macy\'s', 			shopId:1,		addr:'3165 Kifer Rd',			city:'Santa Clara',		lati:0,				lon:0,					color:'white', 	image:'/images/ShopLogo_1.jpeg'},
		{title:'一麻一辣', 			shopId:2,		addr:'1234 Qianmen Street',		city:'Beijing',			lati:39.97168911,	lon:116.51696264521209,	color:'red',	image:'/images/ShopLogo_2.jpeg'},	
		{title:'上岛咖啡', 			shopId:3,		addr:'333 Gulou Street',		city:'Santa Clara',		lati:39.93168911,	lon:116.52696264521209,	color:'yellow',	image:'/images/ShopLogo_3.jpeg'},
		{title:'我型你秀', 			shopId:4,		addr:'1234 Qianmen Street',		city:'Beijing',			lati:39.94168911,	lon:116.53696264521209,	color:'white',	image:'/images/ShopLogo_4.jpeg'},	
		{title:'Macy\'s', 			shopId:5,		addr:'333 Gulou Street',		city:'Santa Clara',		lati:0,				lon:0,					color:'white',	image:'/images/ShopLogo_1.jpeg'},
		];
		
	var perkData = [
		{title:'会员卡',	perkId:0,		shopId:2,		expdate:'12/31',			value:'余额 123元'},
		{title:'会员卡',	perkId:1,		shopId:1,		expdate:'12/31',			value:'余额 2100元'	},
		{title:'减价卷',	perkId:2,		shopId:2,		expdate:'1/15',				value:'立减 50元'	},	
		{title:'减价卷',	perkId:3,		shopId:1,		expdate:'2/2',				value:'立减 20'	},
		{title:'减价卷',	perkId:4,		shopId:3,		expdate:'3/2',				value:'8折'	},	
		{title:'会员卡',	perkId:5,		shopId:4,		expdate:'6/31',				value:'余额 210元'	},
		{title:'减价卷',	perkId:6,		shopId:1,		expdate:'3/3',				value:'立减 20元'	},
		{title:'会员卡',	perkId:7,		shopId:3,		expdate:'12/31',			value:'余额 520元'	},	
		{title:'减价卷',	perkId:8,		shopId:4,		expdate:'2/1',				value:'免费服务 1次'	},
		];
		
	var data = [
		{title:'Alan', 		shopId:2,		liked:0,		likeCount:0,		picHeight:200,	hasChild:true, 	header:'A'},
		{title:'Alice', 	shopId:4,		liked:0,		likeCount:0,		picHeight:300,	hasDetail:true},
		{title:'Alexander',	shopId:2,		liked:0,		likeCount:0,		picHeight:400},
		{title:'Amos',		shopId:3,		liked:0,		likeCount:0,		picHeight:200},
		{title:'Alonzo',	shopId:3,		liked:0,		likeCount:0,		picHeight:300},
		{title:'Brad',		shopId:4,		liked:0,		likeCount:0,		picHeight:400, 	header:'B'},
		{title:'Brent',		shopId:1,		liked:0,		likeCount:0,		picHeight:200},
		{title:'Billy',		shopId:1,		liked:0,		likeCount:0,		picHeight:300},
		{title:'Brenda',	shopId:2,		liked:0,		likeCount:0,		picHeight:400},
		{title:'Callie',					header:'C'},
		{title:'Cassie'},
		{title:'Chris'},
		{title:'Cameron'},
		{title:'Don', header:'D'},
		{title:'Dilbert'},
		{title:'Deacon'},
		{title:'Devin'},
		{title:'Darin'},
		{title:'Darcy'},
		{title:'Erin', header:'E'},
		{title:'Erica'},
		{title:'Elvin'},
		{title:'Edrick'},
		{title:'Frank', header:'F'},
		{title:'Fred'},
		{title:'Fran'},
		{title:'Felicity'},
		{title:'George', header:'G'},
		{title:'Gina'},
		{title:'Gary'},
		{title:'Herbert', header:'H'},
		{title:'Henry'},
		{title:'Harold'},
		{title:'Ignatius', header:'I'},
		{title:'Irving'},
		{title:'Ivan'},
		{title:'Dr. J', header:'J'},
		{title:'Jefferson'},
		{title:'Jenkins'},
		{title:'Judy'},
		{title:'Julie'},
		{title:'Kristy', header:'K'},
		{title:'Krusty the Clown'},
		{title:'Klaus'},
		{title:'Larry', header:'L'},
		{title:'Leon'},
		{title:'Lucy'},
		{title:'Ludwig'},
		{title:'Mary', header:'M'},
		{title:'Mervin'},
		{title:'Malcom'},
		{title:'Mellon'},
		{title:'Ned', header:'N'},
		{title:'Nervous Eddie'},
		{title:'Nelson'},
		{title:'The Big O', header:'O'},
		{title:'Orlando'},
		{title:'Ox'},
		{title:'Pluto', header:'P'},
		{title:'Paris'},
		{title:'Potsie'}
	];
	
	for (var i=0;i<data.length;i++) {
		data[i].image = imageUrlHeadString+i+".jpg";
		data[i].shop = shopData[data[i].shopId - 1];
	}

	for (var i=0; i<perkData.length; i++) {
		perkData[i].shop = shopData[perkData[i].shopId - 1];
	}
	
	allData.getStoreAround = {record: shopData, length: shopData.length };
	allData.getPerkData = {record: perkData, length: perkData.length };
	allData.getNewsFeed = {record: data, length: perkData.length };

		
		


