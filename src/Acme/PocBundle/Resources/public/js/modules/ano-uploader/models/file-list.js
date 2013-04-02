YUI.add('ano-uploader-file-list', function (Y) {

var AnoUploader = Y.AnoUploader,
    FileList;

FileList = Y.Base.create('fileList', Y.ModelList, [], {
    model: AnoUploader.File,

    initializer: function(config) {
        this._fileIdMap = {};

        this.after('add', this._addFile, this);
        this.after('remove', this._removeFile, this);
    },

    getByFileId: function(fileId) {
        return this._fileIdMap[fileId] || null;
    },

    // internals

    _addFile: function(e) {
        var model = e.model;

        this._fileIdMap[model.get('fileId')] = model;
    },

    _removeFile: function(e) {
        var model = e.model;

        delete this._fileIdMap[model.get('fileId')];
    }
});

Y.namespace('AnoUploader').FileList = FileList;

}, '0.0.1', {
    requires: [
        'model-list',
        'ano-uploader-file'
    ]
});