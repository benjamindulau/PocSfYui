YUI.add('poc-photo', function (Y) {

var Photo;

Photo = Y.Base.create('photo', Y.Model, [], {

});

Y.namespace('POC').Photo = Photo;

}, '0.0.1', {
    requires: [
        'model'
    ]
});