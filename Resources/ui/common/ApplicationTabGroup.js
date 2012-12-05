function ApplicationTabGroup(isTablet) {
	//create module instance
	var self = Ti.UI.createTabGroup();
	var Window, ExploreWindow;
	if (isTablet) {
		Window = require('ui/tablet/ApplicationWindow');
	}
	else {
		//Window          = require('ui/handheld/ApplicationWindow');
		ShopListWindow  = require('/ui/handheld/ShopListWindow');
		PerkWindow      = require('/ui/handheld/PerkWindow');
		ExploreWindow   = require('/ui/handheld/ExploreWindow');
	}
	//create app tabs, name the new windows with same names
	var stringShopList    = '店',
	    stringPerkView   = '卷',
	    stringExplore   = '粉';
	    
	
	//create window classes    
	var winExplore = new ExploreWindow(stringExplore);
		winPerk  = new PerkWindow(L(stringPerkView)),
		winShop  = new ShopListWindow(L(stringShopList));
	
	
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
	
	var tabShopView = Ti.UI.createTab({
		title: L(stringShopList),
		icon: '/images/KS_nav_views.png',
		window: winShop
	});
	winShop.containingTab = tabShopView;
	self.addTab(tabShopView);
	self.addTab(tabPerkView);
	self.addTab(tabExplore);
		
	
	return self;
};

module.exports = ApplicationTabGroup;
