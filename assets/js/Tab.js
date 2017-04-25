function Tab () {
    this.id = '';
    this.title = '';
    this.contentNode = '';
    this.linkNode = '';
}

Tab.prototype.toggle = function() {
    this.linkNode.classList.add('active');
    this.contentNode.classList.add('active');
};

Tab.prototype.createTabLink = function() {
    var tabLink = document.createElement('span');
    var tabTitle = document.createTextNode('untitled-'+this.id+'');
    var tabClose = document.createElement('i');

    tabLink.setAttribute('class', 'tab-trigger');
    tabLink.dataset.tabid = this.id;

    tabClose.setAttribute('class', 'icon-cross');

    tabLink.appendChild(tabTitle);
    tabLink.appendChild(tabClose);

    this.linkNode = tabLink;
    return tabLink;
};

Tab.prototype.createTabContent = function() {
    var tabContent = document.createElement('div');
    //var tabTitle = document.createTextNode('untitled-'+this.id+'');

    tabContent.setAttribute('id', 'code-'+this.id+'');
    tabContent.setAttribute('class', 'tab-target');
    tabContent.dataset.tabid = this.id;

    //tabContent.appendChild(tabTitle);

    this.contentNode = tabContent;
    return tabContent;
};
