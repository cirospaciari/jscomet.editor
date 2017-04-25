function Column(id) {
    this.id = id;
    this.columnNode = '';
}

Column.prototype.toggle = function () {
    this.columnNode.classList.add('current');
};

Column.prototype.create = function () {
    var column = document.createElement('div');
    var tabsContainer = document.createElement('div');

    column.setAttribute('id', 'code-column-'+this.id+'');
    column.setAttribute('class', 'code-column');
    column.dataset.columnid = this.id;

    tabsContainer.setAttribute('id', 'tabs-container-'+this.id+'');
    tabsContainer.setAttribute('class', 'tabs-container');

    column.appendChild(tabsContainer);
    this.columnNode = column;
    return column;
}
