// create the tableview row for impression
// rowFromart: 0: no comment 1: show comment

function ElementRow(record, rowFormat){
	

    // Ti.include('/ui/common/Data.js');

	
	// record has the type of SingleTermObj
	var index = record.index;
	var profilePicSize         = 50;
	var shopLogoHeight         = 50;
	var shopLogoWidth          = 80;
	var explorePicWidth           = 300;
	var explorePicHeight          = (record.picHeight!=null)?record.picHeight:explorePicWidth;
	var titleLabelViewHeight   = 50;
	var rowMarginHeight        = 5;
	var bottomwLabelViewHeight = explorePicHeight + 5;
	var rowHeight              = bottomwLabelViewHeight + titleLabelViewHeight + rowMarginHeight + rowMarginHeight;
	// need a better pull
	// var shopId                 = record.shopId;
	var shop = record.shop;
	
	var row = Titanium.UI.createTableViewRow({
	
	height: "auto", hasChild: false, backgroundColor: '#black', selectedBackgroundColor: '#c4cde0', 
	
	className: 'profileViewRow' + index, clickName:'row',
	 borderColor:"red", borderWidth: "1"
	
	});
	

	//row.add(sigLine);
	
    // the title view 
    var titleLabelView = Titanium.UI.createView({

        right: 3, left: 3, top: 6,  height: titleLabelViewHeight,

        backgroundColor:"black",

    });
	row.add(titleLabelView);
	

	var profileImage = Titanium.UI.createImageView({
		
		left:5, width:profilePicSize, height:profilePicSize, borderRadius:3,
		
		hires:true,
		
		image:"/iphone/appicon.png"
		
	});
	titleLabelView.add(profileImage);

	var titleLabel = Titanium.UI.createLabel({

		color:'white',
				
		backgroundColor:'transparent', width:100, height: Ti.UI.SIZE,
		
		top:10, left:60, 
		
		font:{fontSize:13, fontWeight: 'bold'},
		
		text: record.title,
		
		        textAlign:'left',
	
	});	
	titleLabelView.add(titleLabel);
	var shopLogoImage = Titanium.UI.createImageView({
		
		right:5, width:shopLogoWidth, height:shopLogoHeight, borderRadius:3,
		
		hires:true,
		
		image:shop.image,		
		
		classType:'shopLogo'
		
	});
	titleLabelView.add(shopLogoImage);



	var bottomView = Titanium.UI.createView({

        right: 0, left: 0, top:titleLabelViewHeight + rowMarginHeight, height: bottomwLabelViewHeight, bottom: 0, 
        borderColor:'#aaa',backgroundColor:"black",

    });
    row.add(bottomView);	
    
    var exploreImage = Titanium.UI.createImageView({		
		top:0, width:explorePicWidth, height:explorePicHeight, borderRadius:3,	
		hires:true,	
		image:record.image,
		// imageUrlHeadString+index+".jpg",
		//borderColor:"black", borderWidth: "1",	
		classType:"exploreImageView"	
	});
	bottomView.add(exploreImage);

    var creationTimeLabel = Titanium.UI.createLabel({
        color:'#aaa',
        //backgroundColor:'white',
        height: Ti.UI.SIZE,
        bottom:25,right:40,width: 60,
        textAlign: 'right',
        font:{fontSize:8, fontWeight: 'bold'},
        text: 'abctiem',//humaneDate(record.obj.creationTime),
        backgroundColor:"#edeff4",
    });
    bottomView.add(creationTimeLabel);

	var likeButton = Titanium.UI.createButton({
        backgroundImage: record.liked?likeIcon:noLikeIcon, 
        font:{fontSize:13, fontWeight: 'bold'}, color: '#576b95', selectedColor:'#a6a6a6',
        style: 0, backgroundSelectedColor:'#000', className: 'likeButton',        //title: record.liked ? 'UnLike' : 'Like',
        textAlign:'left', left: 20, bottom: 15, width:30 , height: 30
	});

	likeButton.addEventListener('click', function(e){
	if (record.liked) {
		if (likeButton.backgroundImage != likeIcon) {
			alert("like button err: like button icon display err: likeFlag "+ record.liked);
		}
		//likeButton.title = 'UnLike';
		likeButton.backgroundImage = noLikeIcon;	
		record.liked     = 0;
		//likeImpression(record.getKey());
		//smallViewContainer.update(record.obj.likeCount, 1);
		record.likeCount ++;

	} else {
		if (likeButton.backgroundImage == likeIcon) {
			alert("like button err: like button icon display err: likeFlag "+ record.liked);
		}
		record.liked     = 1;
		likeButton.backgroundImage = likeIcon;
		//unLikeImpression(record.getKey());
		//smallViewContainer.update(record.obj.likeCount, -1);
 		if (record.likeCount) {
 			record.likeCount --;
 		}
	}
	Ti.API.info('recorc '+ record.title, + 'index', index + 'liked' + record.liked + ' likeCount' + record.likeCount);
	likeButton.fireEvent('buttonClick', {'data': record, 'clickType': 'like', 'button': likeButton});
   	});
   	bottomView.add(likeButton);
   	
   	if(rowFormat) {
   		CommentView = require('/ui/handheld/CommentView');
   		var commentView = new CommentView(record);	
   		commentView.top = rowHeight + 5;
   		//row.add(commentView);
 
   	}
  
	row.data = record;
	return row;
}

module.exports = ElementRow;