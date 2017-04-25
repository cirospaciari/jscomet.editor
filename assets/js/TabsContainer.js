function TabsContainer (tabsContainerContents, tabsContainerLinks) {
    this.tabs = [];
    this.currentTabIndex = 0;
    this.indicatorBar = '';
    this.containerContents = tabsContainerContents;
    this.containerLinks = tabsContainerLinks;
}

TabsContainer.prototype.addTab = function(tab) {
    var i = this.tabs.length;
    tab.id = i;
    this.tabs.push(tab);
    this.currentTabIndex = i;
};

TabsContainer.prototype.removeTab = function(tab) {
    this.tabs[tab].linkNode.parentNode.removeChild(this.tabs[tab].linkNode);
    this.tabs[tab].contentNode.parentNode.removeChild(this.tabs[tab].contentNode);

    this.tabs.splice(tab, 1);

    for (var i = 0; i < this.tabs.length; i++) {
        this.tabs[i].id = i;
        this.tabs[i].linkNode.dataset.tabid = i;
        this.tabs[i].contentNode.dataset.tabid = i;
    };

    if (tab <= this.currentTabIndex) {
        var newTabIndex = this.currentTabIndex - 1;
        if (newTabIndex >= 0) {
            this.changeTab(newTabIndex);
        }else{
            this.indicatorBar.parentNode.removeChild(this.indicatorBar);
            this.indicatorBar = null;
        };
    };

};

TabsContainer.prototype.changeTab = function(id) {
    var prevIndex = this.currentTabIndex;
    this.currentTabIndex = id;
    var index = this.currentTabIndex;

    var indicator = this.indicatorBar;
    var tabsWidth = this.containerLinks.clientWidth;
    var tabWidth = this.containerLinks.querySelector('.tab-trigger').clientWidth;


    if ((index - prevIndex) >= 0) {
      $(indicator).velocity({"right": tabsWidth - ((index + 1) * tabWidth)}, { duration: 300, queue: false, easing: 'easeOutQuad'});
      $(indicator).velocity({"left": (index) * tabWidth}, {duration: 300, queue: false, easing: 'easeOutQuad', delay: 90});

    }
    else {
      $(indicator).velocity({"left": (index) * tabWidth}, { duration: 300, queue: false, easing: 'easeOutQuad'});
      $(indicator).velocity({"right": tabsWidth - ((index + 1) * tabWidth)}, {duration: 300, queue: false, easing: 'easeOutQuad', delay: 90});
    }

    for (var i = 0; i < this.tabs.length; i++) {
        this.tabs[i].linkNode.classList.remove('active');
        this.tabs[i].contentNode.classList.remove('active');
    };

    var currentTab = this.tabs[this.currentTabIndex];
    currentTab.toggle();
};

TabsContainer.prototype.createIndicator = function() {
    var tabsWidth = this.containerLinks.clientWidth;
    var tabWidth = this.containerLinks.querySelector('.tab-trigger').clientWidth;
    var index = this.currentTabIndex;

    var indicator = document.createElement('div');
    indicator.setAttribute('class', 'indicator');

    indicator.style.right = ''+tabsWidth - ((index + 1) * tabWidth)+'px';
    indicator.style.left = ''+index * tabWidth+'px';

    this.indicatorBar = indicator;
    return indicator;
};

TabsContainer.prototype.renderInElem = function() {
    var lastTab = this.tabs[this.tabs.length - 1];
    var hasIndicator = this.indicatorBar;

    this.containerLinks.appendChild(lastTab.createTabLink());
    this.containerContents.appendChild(lastTab.createTabContent());

    if (!hasIndicator) {
        this.containerLinks.appendChild(this.createIndicator());
    }
};
