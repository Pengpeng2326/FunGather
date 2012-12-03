function ApplicationTabGroup(isTablet) {
	//create module instance
	var self = Ti.UI.createTabGroup();
	var Window, ExploreWindow;
	if (isTablet) {
		Window = require('ui/tablet/ApplicationWindow');
	}
	else {
		//Window          = require('ui/handheld/ApplicationWindow');
		ExploreWindow   = require('/ui/handheld/ExploreWindow');
		PerkWindow      = require('/ui/handheld/PerkWindow');
		FeedWindow      = require('ui/handheld/FeedWindow');
	}
	//create app tabs, name the new windows with same names
	var stringExplore    = '店',
	    stringPerkView   = '卷',
	    stringFeedView   = '粉';
	    
	
	//create window classes    
	var winExplore = new ExploreWindow(stringExplore);
	var //winExplore = new Window(L(stringExplore)),
		winPerk  = new PerkWindow(L(stringPerkView)),
		winFeed  = new FeedWindow(L(stringFeedView));
	
	
	var tabExplore = Ti.UI.createTab({
		title: L(stringExplore),
		icon: '/images/KS_nav_ui.png',
		window: winExplore
	});
	winExplore.containingTab = tabExplore;
	
	var tabPerkView = Ti.UI.createTab({
		title: L(stringPerkView),
		icon: '/images/KS_nav_views.png',
		window: winPerk
	});
	winPerk.containingTab = tabPerkView;
	
	var tabFeedView = Ti.UI.createTab({
		title: L(stringFeedView),
		icon: '/images/KS_nav_views.png',
		window: winFeed
	});
	winFeed.containingTab = tabFeedView;
	
	self.addTab(tabExplore);
	self.addTab(tabPerkView);
	self.addTab(tabFeedView);	
	
	return self;
};

module.exports = ApplicationTabGroup;
