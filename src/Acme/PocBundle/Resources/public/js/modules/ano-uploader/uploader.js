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
            this._fileIdMap = {};

            this.uploadInfo = new Y.AnoUploader.UploadInfo();
            this.uploadInfoView = new Y.AnoUploader.UploadInfoView({
                model: this.uploadInfo,
                container: Y.Node.one('#uploader-info')
            });

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
            uploader.on('totaluploadprogress', this.onUploadOverallProgress, this);
            this.fileList.after('remove', this.onRemoveFile, this);

            // render the uploader
            uploader.render("#uploader-container");
            this.uploadInfoView.render();

            this.uploader = uploader;
        },

        onAddFile: function(e) {
            var incFiles = e.fileList,
                self = this,
                nextFilePos = this.fileList.size(),
                files = [];

            Y.Array.each(incFiles, function(f) {
                files.push(new Y.AnoUploader.File({
                    fileId: f.get('id'),
                    name: f.get('name'),
                    size: f.get('size'),
                    type: f.get('type'),
                    position: nextFilePos
                }));

                nextFilePos++;

                self._fileIdMap[f.get('id')] = f;
            });

            this.fileList.add(files);
            this.uploadInfo.incTotalFileCount(files.length);
            this.uploader.uploadThese(e.fileList);
        },

        onRemoveFile: function(e) {
            var fileModel = e.model,
                file = this._getFileByFileId(fileModel.get('fileId'));

            if (file && this.uploader.queue) {
                this.uploader.queue.cancelUpload(file);
                // TODO ? this._deleteFileFromUploadList(file);
            }

            this.uploadInfo.decTotalFileCount(1);
        },

        onUploadProgress: function(e) {
            var fileItem = e.file,
                fileModel;

            fileModel = this.fileList.getByFileId(fileItem.get('id'));
            fileModel && fileModel.setAttrs({
                percentUploaded: e.percentLoaded,
                bytesUploaded: fileItem.bytesUploaded
            });
        },

        onUploadOverallProgress: function(e) {
            this.uploadInfo.setAttrs({
                bytesTotal: e.bytesTotal,
                bytesLoaded: e.bytesLoaded
            });
        },

        // private methods
        _getFileByFileId: function(fileId) {
            return this._fileIdMap[fileId] || null;
        },

        _getFileIndex: function(file) {
            var fileList = this.uploader.get('fileList');

            return fileList.indexOf(file);
        },

        _deleteFileFromUploadList: function(file) {
            var fileList = this.uploader.get('fileList'),
                index;

            index = this._getFileIndex(file);
            if (index > -1) {
                delete this.uploader.get('fileList')[index];
                this.uploader.get('fileList').splice(index, 1);
            }
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