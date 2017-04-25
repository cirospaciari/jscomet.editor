function ColumnsContainer(containerNode) {
    this.columns = [];
    this.currentColumnIndex = 1;
    this.containerNode = containerNode;
}

ColumnsContainer.prototype.addColumn = function (column) {
    this.columns.push(column);
    this.renderInElem(column);
    this.changeColumn(column.id);
};

ColumnsContainer.prototype.removeColumn = function (column) {
    this.columns[column].columnNode.parentNode.removeChild(this.columns[column].columnNode);
    this.columns.splice(column, 1);
};

ColumnsContainer.prototype.changeColumn = function (id) {
    for (var i = 0; i < this.columns.length; i++) {
        this.columns[i].columnNode.classList.remove('current');
    };

    this.currentColumnIndex = id;
    var currentColumn = this.columns[this.currentColumnIndex];

    currentColumn.toggle();
};
ColumnsContainer.prototype.renderInElem = function () {
    var lastColumn = this.columns[this.columns.length - 1];

    this.containerNode.appendChild(lastColumn.create());
};
