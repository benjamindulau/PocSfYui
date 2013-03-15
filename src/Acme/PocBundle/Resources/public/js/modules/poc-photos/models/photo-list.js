YUI.add('poc-photo-list', function (Y) {

var POC = Y.POC,
    PhotoList;

PhotoList = Y.Base.create('photoList', Y.ModelList, [], {
    model: POC.Photo
});

Y.namespace('POC').PhotoList = PhotoList;

}, '0.0.1', {
    requires: [
        'model-list',
        'poc-photo'
    ]
});