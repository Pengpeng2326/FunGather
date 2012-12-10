displayCount = 0;

var indWin = Titanium.UI.createWindow({
    height:50,
    width:130
});

var indView = Titanium.UI.createView({
    height:40,
    // width:120,
    backgroundColor:'#000',
    borderRadius:5,
    opacity:0.5
});
indWin.add(indView);;
var actInd = Titanium.UI.createActivityIndicator({
    style:Titanium.UI.iPhone && Titanium.UI.iPhone.ActivityIndicatorStyle.DARK,
    height:10,
    width:10,
    left: 10,
});        

indWin.add(actInd);

// message
var message = Titanium.UI.createLabel({
    text:'',
    color:'#fff',
    width:'auto',
    height:'auto',
    font:{fontSize:16,fontWeight:'bold', fontFamily:'Helvetica Neue'},
    left: 40,
});
indWin.add(message);
actInd.show();

function showIndicator(msg)
{
    displayCount ++;
    message.text = msg;
    if (displayCount == 1) {
        indWin.open();
    }
    /*
     * fix for loading table showing too long
     */
    setTimeout(function() {
        hideIndicator();
    }, 5000);
}

function hideIndicator()
{
    displayCount --;
    if (displayCount <= 0) {
        displayCount = 0;
        indWin.close({opacity:0,duration:300});
    }
}