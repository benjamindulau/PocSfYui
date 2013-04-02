YUI.add('ano-uploader-file', function (Y) {

var AnoUploader = Y.AnoUploader,
    File;

File = Y.Base.create('file', Y.Model, [], {

}, {
    ATTRS: {
        id: {value: null},
        fileId: {value: null},
        name: {value: null},
        size: {value: null},
        type: {value: null},
        bytesUploaded: {value: 0},
        percentUploaded: {value: 0},
        thumbnail: {value: null}
    }
});

Y.namespace('AnoUploader').File = File;

}, '0.0.1', {
    requires: [
        'model'
    ]
});