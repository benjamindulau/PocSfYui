YUI.add('poc-photo', function (Y) {

var Photo;

Photo = Y.Base.create('photo', Y.Model, [], {

}, {
    ATTRS: {
        id: {value: null},
        index: {value: null},
        title: {value: null},
        url: {value: null}
    }
});

Y.namespace('POC').Photo = Photo;

}, '0.0.1', {
    requires: [
        'model'
    ]
});