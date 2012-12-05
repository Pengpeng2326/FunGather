
function CommentTableView(record)
{
    Ti.include('/ui/common/Data.js');
	
	var profilePicSize = 25;
	
	tableData = [];
	for(var i=0;i<5;i++) {
		var row = Ti.UI.createTableViewRow();
		row.backgroundColor = "black";//'#576996';
		//row.selectedBackgroundColor = '#385292';
		row.selectionStyle = Titanium.UI.iPhone.TableViewCellSelectionStyle.None;
		row.height = 20;
		var userLogo = Titanium.UI.createImageView({
			image:"images/KS_nav_views.png",
			left:5, width:15, height:15, borderRadius:1,
			top:0,
		    hires:true,
		    borderColor:"black",
		    borderWidth:1
		});
		row.add(userLogo);
		
		
		var clickLabel = Titanium.UI.createLabel({
			text:data[i].title,
			color:'black',
			textAlign:'center',
			font:{fontSize:7},
			width:'auto',
			height:'auto',
			left:30,
			top:0
		});
		//row.className = 'header';
		row.add(clickLabel);
		tableData.push(row);
	}
	
		
	var view = Ti.UI.createView({
			
	
	        backgroundColor:'white',

		
	})


   		// a comment view
		var commentLine = Ti.UI.createView({
	        left: 10, right: 10, height:30,top:10,
	        backgroundColor:'#d9d9d9',
	    });
	    view.add(commentLine);
	    
		var commentLineIcon = Ti.UI.createImageView({
	    left: 10, width:profilePicSize, height:profilePicSize, borderRadius:3,
		
		hires:true,
		
		image:"/iphone/appicon.png"
	    });
	    commentLine.add(commentLineIcon);
	    
	    var commentLineText = Ti.UI.createTextArea({
		    editable: true,
			value:'I am a textarea',
			height:30,
			width:200,
			top:0,
			left: 40,
			font:{fontSize:10,fontFamily:'Marker Felt', fontWeight:'bold'},
			color:'#888',
			textAlign:'left',
			borderWidth:2,
			borderColor:'#bbb',
			borderRadius:5,
			suppressReturn:false,
	    	
	    })
	    commentLineText.addEventListener('blur',function(){
		if(Ti.Platform.name === "android"){
			Ti.API.info('Going to hide soft Keyboard as we are shifting focus away from the SearchBar.');
			Ti.UI.Android.hideSoftKeyboard();
		}
		else if(Ti.Platform.name == "iphone"){
			//commentLineText.blur();
			TextField.blur();
			
		}	
		Ti.API.info("blurrrr....");
	});

	 
	   		
	   	// a line to seperate views
		var sigLine = Ti.UI.createView({
	
	        left: 10, right: 10, height:1, bottom:4, top:(10 + commentLine.height),
	
	        backgroundColor:'#d9d9d9',
	
	    });
	    	
     var commentTable = Titanium.UI.createTableView({
	 	data:tableData,
	 	top:(10+sigLine.top),
	 	left:20,
	 	right:20,
	 	height:"auto",
	 	//font:{fontSize:25, fontWeight: 'bold'} 	
	 })
   		
   		view.add(sigLine);
   		view.add(commentTable);
	 
	
	if (Ti.Platform.osname !== 'mobileweb') {
		commentLineText.appearance    = Titanium.UI.KEYBOARD_APPEARANCE_ALERT;
		commentLineText.keyboardType  = Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION;
		commentLineText.returnKeyType = Titanium.UI.RETURNKEY_EMERGENCY_CALL;
	}
	commentLine.add(commentLineText);
	 
	 return view;
	
}




module.exports = CommentTableView;