YUI.add('ano-uploader-file-list-view', function (Y) {

var AnoUploader = Y.AnoUploader,
    FileListView;

FileListView = Y.Base.create('fileListView', Y.View, [], {

    template: Y.Handlebars.compile(Y.one('#t-file-list').getHTML()),
    fileTemplate: Y.Handlebars.compile(Y.one('#t-file').getHTML()),

    initializer: function(config) {
        var fileList = this.get('modelList');
        this.fileViews = new Y.Array();

        if (fileList) {
            fileList.after('add', this.addFile, this);
            fileList.after('remove', this.removeFile, this);
//            fileList.after('*:change', this.render, this);
        }
    },

    events: {
        '.action-delete': {click: 'onDeleteAction'},
        '.file-item': {click: 'onFileItemClick'}
    },

    onFileItemClick: function(e) {
        var fileList = this.get('modelList'),
            fileNode = e.currentTarget,
            file;

        file = fileList.getByClientId(fileNode.getAttribute('data-id'));

        this._selectFileItem(file, e);
    },

    onDeleteAction: function(e) {
        var fileList = this.get('modelList'),
            fileNode = e.currentTarget.ancestor('.file-item'),
            file;

        file = fileList.getByClientId(fileNode.getAttribute('data-id'));
        fileList.remove(file);

        e.preventDefault();
    },

    removeFile: function(e) {
        var file = e.model,
            fileNode;

        fileNode = this.listNode.one('.file-item[data-id="' + file.get('clientId') + '"]');
        this.listNode.removeChild(fileNode);

        file.destroy();
    },

    addFile: function(e) {
        if (!this.listNode) {
            this.render();
        }

        var content = Y.one(Y.config.doc.createDocumentFragment()),
            file = e.model,
            fileView,
            container = this.createFileViewContainer(file);

        fileView = new Y.AnoUploader.FileView({
            model: file,
            container: this.createFileViewContainer(file)
        });
        fileView.addTarget(this);
        fileView.createDrag();
        this.fileViews.push(fileView);

        content.append(fileView.render().get('container'));

        this.listNode.append(content);
    },

    createFileViewContainer: function(file) {
        var container = '<li class="file-item"'
         + ' data-id="' + file.get('clientId') + '"'
         + ' data-file-id="' + file.get('fileId') + '"'
         + ' data-size="' + file.get('size') + '"'
         + ' data-name="' + file.get('name') + '"'
         + ' data-position="' + file.get('position')+ '"></li>';

        return Y.Node.create(container);
    },

    render: function() {
        var fileList = this.get('modelList'),
            content;

        content = this.template({files: fileList.toJSON()});
        this.get('container').setHTML(content);
        this.listNode = this.get('container').one('ul');

        this._initSelectable();
        this._initDrag();

        return this;
    },

    _selectFileItem: function(file, e) {
        // TODO: In the end this should go to some sort of separated "selectable" widget

        file.set('selected', true);
        this.listNode.one('.file-item[data-id="' + file.get('clientId') + '"]').addClass('selected');
    },

    _initSelectable: function() {
        // TODO: In the end this should go to some sort of separated "selectable" widget

        var wrapper = this.listNode;

        Y.delegate('mouseup', function(e) {
            if (!e.shiftKey) {
                //No shift key - remove all selected images
                wrapper.all('.file-item.selected').removeClass('selected');
            }
        }, document, '*');
    },

    _initDrag: function() {
        var self = this;

        Y.DD.DDM.on('drag:start', function(e) {
            e.target.get('node').addClass('selected');

            //How many items are selected
            var count = self.listNode.all('.file-item.selected').size();

            //Set the style on the proxy node
            e.target.get('dragNode').setStyles({
                height: '25px', width: '25px'
            }).set('innerHTML', '<span>' + count + '</span>');

            //Offset the dragNode
            e.target.deltaXY = [25, 5];
        });
    }
});

Y.namespace('AnoUploader').FileListView = FileListView;

}, '0.0.1', {
    requires: [
        'handlebars',
        'view',
        'dd',
        'sortable'
    ]
});