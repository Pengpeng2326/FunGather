// implements all the server-client communication protocols
Ti.include('Requests.js');
Ti.include('config.js');

var Communication = {
	salt:"[$G1=MPO",
	//var cookie = getCookie(),
	baseUrl : conf.effectServer,
	protocols : {
		peekAccount : { url: 'peek', method: 'POST'},
		signUp : { url : 'register', method : 'POST'},
		login  : { url : 'login', method : 'POST'},
	}
}

function processPeekAccount(obj) {
	if (obj["type"] == 1) {
		// login
        // Ti.API.info("will login");
        // TODO if the session expired, there would be another request before this request, should login and then process that request 
		login(obj["salt"]);
	} else if (obj["type"] == 0) {
		// signup
		signUp(obj["salt"]);
	}
}

function peekAccount(async) {
    Ti.App.Properties.setBool("loggedIn", false);
    // Ti.API.info("peek it!");
    if (Titanium.Facebook.uid) {
        var data = new peekAccountRequest(Titanium.Facebook.uid);
        process('peekAccount', data, processPeekAccount, null, false);
    } else {
        // Ti.API.info("facebook id is empty!!!");
    }
	// show loading
};

function signUp(secureCode) {
	var data = new signUpRequest(Titanium.Facebook.uid, Titanium.Facebook.accessToken, Ti.Utils.md5HexDigest(Ti.Facebook.uid + Communication.salt + secureCode));
	process('signUp', data, function(data){
		Ti.App.fireEvent("loggedin", data);
	}, null, false);
};

function login(secureCode) {
	var data = new loginRequest(Ti.Facebook.uid, Ti.Utils.md5HexDigest(Ti.Facebook.uid + Communication.salt + secureCode));
	// Ti.API.info(data);
	process('login', data, function(data){
		Ti.App.fireEvent("loggedin", data);
	}, null, false);
};

function rateTerm(targetKeyString, termKeyString, rating, content, isAnonymous, callback){
	var data = new rateTermRequest(targetKeyString, termKeyString, rating, content, isAnonymous);
	process('rateTerm', data, callback);
};
function processPromoCode(promoCode, callback){
	var data = new promoCodeRequest(promoCode);
	process('processPromoCode', data, callback);
};

function getProfile(fbId, page, callback){
	var rq = new fetchSingleProfileRequest(fbId, page);
	process('getProfile', rq, callback);
};


function getActivity(fbId, page, callback) {
	var rq = new getActivityRequest(fbId, page);
	process('getActivities', rq, callback);
}
function addImpression(isAnonymous, targetKeyString, targetFbIdString, words, rating, callback){
	// var data = new createTermRequest(false, null, "3433832", "pretty");
	var data = new addImpressionRequest(isAnonymous, targetKeyString, targetFbIdString, words, rating);
	process('addImpression', data, callback);
};
function getImpression(impressionId, page, callback, errorCallback){
	var data = new getImpressionRequest(impressionId, page);
	process('getImpression', data, callback, errorCallback);
};
function getTermForProfile(profileKey, page, sortBy, firstName, lastName, callback, name){
	var data = new getTermForProfileRequest(profileKey, page, sortBy, firstName, lastName, name);
	process('getTermForProfile', data, callback);	
};
function addComment(isAnonymous, impressionKey, words, callback, errorCallback) {
	var data = new addCommentRequest(isAnonymous, impressionKey, words);
	process('addComment', data, callback, errorCallback);
};
function getProfileShortStats(profileKey, type, callback){
	var data = new getProfileShortStatsRequest(profileKey, type);
	process('getProfileShortStats', data, callback);
};
function getSingleProfile(profileKey, page, callback){
	var data = new getSingleProfileRequest(profileKey, page);
	process('getSingleProfile', data, callback);
};
function getNewsFeed(page, callback){
	var data = new getNewsFeedRequest(page);
	process('getNewsFeed', data, callback);
};
function getGlobalNewsFeed(page, callback){
	var data = new getNewsFeedRequest(page);
	process('getGlobalNewsFeed', data, callback);
};
function getCredit(callback){
	var data = new getCreditRequest();
	process('getCredit', {'a':0}, callback, null, false);
};
function getFriendsProfile(callback){
    process('getFriendsProfile', {'a':0}, callback, null, false);
};
function verifyReceipt(receipt, callback, errorCallback){
    process('verifyReceipt', {'receipt': receipt}, callback, errorCallback, false);
};
function removeImpression(termKey, callback, errorCallback){
    process('removeImpression', {'key': termKey}, callback, errorCallback, true);
};
function removeComment(commentKey, callback, errorCallback){
    process('removeComment', {'commentId': commentKey}, callback, errorCallback, true);
};
function likeImpression(impressionKey, callback, errorCallback) {
	process('likeImpression', {'iId': impressionKey}, callback, errorCallback, false);
};
function unLikeImpression(impressionKey, callback, errorCallback) {
	process('unlikeImpression', {'iId': impressionKey}, callback, errorCallback, false);
};
function flagContent(objectId, objectType, callback) {
	process('flagContent', {'objectId': objectId, 'objectType': objectType}, callback);
};
function getReferCode(callback, errorCallback) {
	process('getReferCode', {}, callback);
};
function applyCode(code, callback, errorCallback) {
	process('applyCode', {'code': code}, callback, errorCallback, false);
}


function getConnection(method, url, async){
    // Ti.API.info("async " + async);
	var conn = Ti.Network.createHTTPClient({enableKeepAlive:false});
	conn.timeout = 20000;
	if (async == null || typeof async == 'undefined') {
		state = true;
	} else {
		state = false;
	}
	// Ti.API.info(state);
	conn.open(method, Communication.baseUrl.server + url, state);
	
	conn.setRequestHeader("content-type", "application/json; charset=UTF-8");
	// conn.open("GET", "http://www.google.com");
	return conn;
};

function processErrorMsg(msg) {
	var obj = eval("(" + msg + ")");
	if (obj['message'] != undefined) {
	   alert(obj['message']);
    }
};

function process(funcName, data, callback, errorCallback, async) {
    // Ti.API.info(data);
    Ti.App.fireEvent('show_indicator', {'msg':'Loading...'});
	var conn = getConnection(Communication.protocols[funcName].method, Communication.protocols[funcName].url, async);
	var cookie = getCookie();
	conn.onload = function(e) {
	    // Ti.API.info(this.responseText);
	    Ti.App.fireEvent('hide_indicator', {});
		obj = JSON.parse(this.responseText);
		if (obj["status"] == 2) {
			peekAccount(false);
			process(funcName, data, callback, errorCallback, async);
		}else
		if (obj["status"] == 1) {
			peekAccount(false);
			process(funcName, data, callback, errorCallback, async);
		}else 
		if (obj["status"] == 0) {
			if (callback != null) {
	        	callback(obj["result"]);
	        }
       	}else
       	if (obj["status"] == 10) {
       		if (errorCallback != null) {
       			errorCallback(obj['error']);
       		}
       	}
    }
    conn.onerror = function(e) {
        Ti.App.fireEvent('hide_indicator', {});
    	if (this.status == 400) {
    		processErrorMsg(this.responseText);
    	} else {
    	    alert("Please check your network connection!");
    	}
    }
    conn.send({'content':JSON.stringify(data)});
}

