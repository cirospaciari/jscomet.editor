//perfect Scrollbar

var sidebar = document.getElementById('project-list');
var modalScrollR = document.getElementById('scroll-right');
var modalScrollL = document.getElementById('scroll-left');

Ps.initialize(sidebar, {
    maxScrollbarLength: 700,
});

Ps.initialize(modalScrollR);
Ps.initialize(modalScrollL);

//modal
$('.modal-trigger').leanModal();

//forms
 $('select').material_select();

// CodeMirror
function setEditor(id) {
    var myCodeMirror = CodeMirror(id, {
        value:
    'function findSequence(goal) {\n\
        function find(start, history) {\n\
            if (start == goal)\n\
                return history;\n\
            else if (start > goal)\n\
                return null;\n\
            else\n\
                return find(start + 5, "(" + history + " + 5)") ||\n\
                find(start * 3, "(" + history + " * 3)");\n\
        }\n\
        return find(1, "1");\n\
    }',
        mode:  "javascript",
        lineNumbers: true,
        styleActiveLine: true,
        matchBrackets: true,
        scrollbarStyle: 'overlay',
        theme: 'material'
    });

    // SETAR TEMA
    $('.change-theme').on('click', function(e){
        e.preventDefault();
        var codeTheme = $(this).data('theme');
        myCodeMirror.setOption("theme", codeTheme);
        $('body').removeClass();
        $('body').addClass(codeTheme);
    });


    // SETAR SYNTAX HIGHLIGHT
    $('.changeSyntax').on('click', function(e){
        e.preventDefault();
        var codeSyntax = $(this).data('syntax');
        myCodeMirror.setOption("mode", codeSyntax);
    });
};

$(function () {
    $('#modal-tree-view').jstree();

})

// jsTree
$(function () {
    $('#project-list')
        .jstree({
            'core' : {
                'data' : {
                    //'url' : 'jstree.json',
                    'url' : 'root.json',
                    'data' : function (node) {
                        return { 'id' : node.id };
                    }
                },
                'check_callback' : function(o, n, p, i, m) {
                    if(m && m.dnd && m.pos !== 'i') { return false; }
                    if(o === "move_node" || o === "copy_node") {
                        if(this.get_node(n).parent === this.get_node(p).id) { return false; }
                    }
                    return true;
                },
                'force_text' : false,
                'themes' : {
                    //'responsive' : false,
                    //'variant' : 'small',
                    'stripes' : false,
                    'dots': false
                }
            },
            'sort' : function(a, b) {
                return this.get_type(a) === this.get_type(b) ? (this.get_text(a) > this.get_text(b) ? 1 : -1) : (this.get_type(a) >= this.get_type(b) ? 1 : -1);
            },
            'contextmenu' : {
                'items' : function(node) {
                    var tmp = $.jstree.defaults.contextmenu.items();
                    // menu rename
                    tmp.rename.label = "Rename";
                    tmp.rename.icon = "i";

                    // menu delete
                    tmp.remove.label = "Delete";
                    tmp.remove.icon = "icon-delete";

                    // menu edit
                    tmp.ccp.label = "Edit";

                    // submenu edit cut
                    tmp.ccp.submenu.cut.label = "Cut";
                    tmp.ccp.submenu.cut.icon = "icon-cut";

                    // submenu edit copy
                    tmp.ccp.submenu.copy.label = "Copy";
                    tmp.ccp.submenu.copy.icon = "icon-copy";

                    // submenu edit paste
                    tmp.ccp.submenu.paste.label = "Paste";
                    tmp.ccp.submenu.paste.icon = "icon-paste";

                    delete tmp.create.action;
                    tmp.create.label = "New";
                    tmp.create.submenu = {
                        "create_folder" : {
                            "separator_after"   : true,
                            "label"             : "Folder",
                            "icon"              : "icon-folder",
                            "action"            : function (data) {
                                var inst = $.jstree.reference(data.reference),
                                    obj = inst.get_node(data.reference);
                                inst.create_node(obj, { type : "default" }, "last", function (new_node) {
                                    setTimeout(function () { inst.edit(new_node); },0);
                                });
                            }
                        },
                        "create_file" : {
                            "label"             : "File",
                            "icon"              : "icon-file",
                            "action"            : function (data) {
                                var inst = $.jstree.reference(data.reference),
                                    obj = inst.get_node(data.reference);
                                inst.create_node(obj, { type : "file" }, "last", function (new_node) {
                                    setTimeout(function () { inst.edit(new_node); },0);
                                });
                            }
                        }
                    };
                    if(this.get_type(node) === "file") {
                        delete tmp.create;
                    }
                    return tmp;
                }
            },
            'types' : {
                'default' : { 'icon' : 'icon-folder' },
                'file' : { 'valid_children' : [], 'icon' : 'icon-file' }
            },
            'unique' : {
                'duplicate' : function (name, counter) {
                    return name + ' ' + counter;
                }
            },
            'plugins' : ['state','dnd','sort','types','contextmenu','unique', 'wholerow']
        })
        .on('ready.jstree', function(){
            $('#jstree-loading').hide();
        })
        .on('load_node.jstree', function(){
            $('#jstree-loading').show();
        })
        .on('delete_node.jstree', function (e, data) {
            $.get('?operation=delete_node', { 'id' : data.node.id })
                .fail(function () {
                    data.instance.refresh();
                });
        })
        .on('create_node.jstree', function (e, data) {
            $.get('?operation=create_node', { 'type' : data.node.type, 'id' : data.node.parent, 'text' : data.node.text })
                .done(function (d) {
                    data.instance.set_id(data.node, d.id);
                })
                .fail(function () {
                    data.instance.refresh();
                });
        })
        .on('rename_node.jstree', function (e, data) {
            $.get('?operation=rename_node', { 'id' : data.node.id, 'text' : data.text })
                .done(function (d) {
                    data.instance.set_id(data.node, d.id);
                })
                .fail(function () {
                    data.instance.refresh();
                });
        })
        .on('move_node.jstree', function (e, data) {
            $.get('?operation=move_node', { 'id' : data.node.id, 'parent' : data.parent })
                .done(function (d) {
                    //data.instance.load_node(data.parent);
                    data.instance.refresh();
                    $('#jstree-loading').hide();
                })
                .fail(function () {
                    data.instance.refresh();
                    $('#jstree-loading').hide();
                });
        })
        .on('copy_node.jstree', function (e, data) {
            $.get('?operation=copy_node', { 'id' : data.original.id, 'parent' : data.parent })
                .done(function (d) {
                    //data.instance.load_node(data.parent);
                    data.instance.refresh();
                })
                .fail(function () {
                    data.instance.refresh();
                });
        })
        .on('changed.jstree', function (e, data) {
            if(data && data.selected && data.selected.length) {
                $.get('?operation=get_content&id=' + data.selected.join(':'), function (d) {
                    if(d && typeof d.type !== 'undefined') {
                        $('#code-editor-1 .content').hide();
                        switch(d.type) {
                            case 'text':
                            case 'txt':
                            case 'md':
                            case 'htaccess':
                            case 'log':
                            case 'sql':
                            case 'php':
                            case 'js':
                            case 'json':
                            case 'css':
                            case 'html':
                                $('#code-editor #code').show();
                                $('#code').val(d.content);
                                break;
                            case 'png':
                            case 'jpg':
                            case 'jpeg':
                            case 'bmp':
                            case 'gif':
                                $('code-editor .image img').one('load', function () { $(this).css({'marginTop':'-' + $(this).height()/2 + 'px','marginLeft':'-' + $(this).width()/2 + 'px'}); }).attr('src',d.content);
                                $('code-editor .image').show();
                                break;
                            default:
                                $('code-editor .default').html(d.content).show();
                                break;
                        }
                    }
                });
            }
            else {
                $('code-editor-1 .content').hide();
                $('code-editor-1 .default').html('Select a file from the tree.').show();
            }
        });
});
