
// SUBMENU DROPDOWN
$(function(){
    $('.dropdown-button-custom')
    .on('mouseenter', function() {
        var target =  '#' + $(this).data('activates');
        $(target).fadeIn();
    })
    .on('mouseleave', function() {
        var target =  '#' + $(this).data('activates');
        $(target).fadeOut();
    });
});


// LAYOUT MULTICOLUNA E ABAS
(function(){
    var columnsContainer = document.getElementById('code-columns-container');
    var btnToggleColumn = document.getElementsByClassName('toggle-columns');
    var btnAddTab = document.getElementById('add-tab');

    var mainColumns = new ColumnsContainer(columnsContainer);
    var columns = [];
    var tabsContainer = [];
    var tabs = [];

    for (var i = 0; i < btnToggleColumn.length; i++) {
        btnToggleColumn[i].addEventListener('click', function(ev){
            ev.preventDefault();

            var cols = mainColumns.columns.length;
            var btId = eval(this.dataset.column);

            if (btId < cols) {
                removeColumn(cols, btId);
            }
            else if(btId > cols){
                addColumn(cols, btId);
            }
        })
    }

    function removeColumn(cols, btId) {
        for (var i = cols; i > btId; i--) {
            mainColumns.removeColumn(i-1);
        }
    }

    function addColumn(cols, btId) {
        for (var i = cols; i < btId; i++) {
            columns[i] = new Column(i);
            mainColumns.addColumn(columns[i]);

            mainColumns.columns[i].columnNode.addEventListener('click', function() {
                var columnId = parseInt(this.dataset.columnid);
                mainColumns.changeColumn(columnId);
            });

            var tabsContainerContents = columns[i].columnNode;
            var tabsContainerLinks = columns[i].columnNode.querySelector('.tabs-container');
            tabsContainer[i] = new TabsContainer(tabsContainerContents, tabsContainerLinks);
        }
    }

    btnAddTab.addEventListener('click', function(ev){
        ev.preventDefault();

        var containerIndex = mainColumns.currentColumnIndex;
        var currentTabsContainer = tabsContainer[containerIndex];

        var i = currentTabsContainer.tabs.length;

        tabs[i] = new Tab();
        currentTabsContainer.addTab(tabs[i]);
        currentTabsContainer.renderInElem();
        currentTabsContainer.changeTab(i);



        // console.log(tabs[i].contentNode.id);
        setEditor(tabs[i].contentNode);

        var allTriggers = currentTabsContainer.containerLinks.querySelectorAll('.tab-trigger');
        allTriggers[i].addEventListener('click', function() {
            var tabId = parseInt(this.dataset.tabid);
            currentTabsContainer.changeTab(tabId);
        });

        var closeTabBtn = currentTabsContainer.containerLinks.querySelectorAll('.icon-cross');
        closeTabBtn[i].addEventListener('click', function(ev){
            var tabId = parseInt(this.parentNode.dataset.tabid);
            currentTabsContainer.removeTab(tabId);
            ev.stopPropagation();
        });
    });

    addColumn(0, 1);


})();
