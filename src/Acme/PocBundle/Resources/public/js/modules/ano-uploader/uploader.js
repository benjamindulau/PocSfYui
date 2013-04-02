YUI.add('ano-uploader', function (Y) {

    var Lang = Y.Lang;

    function AnoUploader(config) {
        AnoUploader.superclass.constructor.apply(this, arguments);
    }

    AnoUploader.NAME = 'anoUploader';
    AnoUploader.ATTRS = {
    };

    Y.extend(AnoUploader, Y.Base, {

        initializer: function(config) {
            this.fileList = new Y.AnoUploader.FileList();
            this.fileView = new Y.AnoUploader.FileView();
            this.fileListView = new Y.AnoUploader.FileListView({
                container: config.listContainer,
                modelList: this.fileList
            });

            // initialize uploader widget
            var uploader = new Y.Uploader({
                width: "500px",
                height: "40px",
                multipleFiles: true,
                uploadUrl: config.url
            });

            if (Y.Uploader.TYPE == "html5") {
                uploader.set("dragAndDropArea", "#uploader-app");
            }

            // events
            uploader.on('fileselect', this.onAddFile, this);
            uploader.on('uploadprogress', this.onUploadProgress, this);

            // render the uploader
            uploader.render("#uploader-container");

            this.uploader = uploader;
        },

        onAddFile: function(e) {
            var incFiles = e.fileList,
                files = [];

            Y.Array.each(incFiles, function(f) {
                files.push(new Y.AnoUploader.File({
                    fileId: f.get('id'),
                    name: f.get('name'),
                    size: f.get('size'),
                    type: f.get('type')
                }));
            });

            this.fileList.add(files);
            this.uploader.uploadThese(e.fileList);
        },

        onUploadProgress: function(e) {
            var fileItem = e.file,
                fileModel;

            fileModel = this.fileList.getByFileId(fileItem.get('id'));
            fileModel.setAttrs({
                percentUploaded: e.percentLoaded,
                bytesUploaded: fileItem.bytesUploaded
            });
        }

    });

    Y.namespace("AnoUploader").Uploader = AnoUploader;

}, '0.0.1', {
    requires: [
        'base',
        'ano-uploader-file',
        'ano-uploader-file-list',
        'ano-uploader-file-list-view',
        'ano-uploader-file-view'
    ]
});