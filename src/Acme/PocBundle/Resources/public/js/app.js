YUI.add('poc-app', function (Y) {

var POC = Y.POC,
    AcmePoc,
    Templates = Y.namespace('POC').Templates = {};

AcmePoc = Y.Base.create('acmePoc', Y.App, [], {
    // photos
    initPhotos: function(req, res, next) {
        var photoList, photosHTML, fragmentViews;

        // Re-hydrate photo models
        // TODO: Maybe move this to the PhotoListView initializer method ?
        photosHTML = Y.Node.all('#photo-list li');
        photoList = new POC.PhotoList();
        photosHTML.each(function(photoHTML) {
            photoList.add({
                id: photoHTML.getAttribute('data-id'),
                index: photoHTML.getAttribute('data-id'),
                url: photoHTML.one('img').getAttribute('src')
            });
        });

        // TODO: Move that away, don't know where yet ;-)
        fragmentViews  = this.get('activeView').fragmentViews;
        fragmentViews.photoList = new POC.PhotoListView({
            photoTemplate: Templates['photo_item_tpl'],
            modelList: photoList
        });
        fragmentViews.photoList.attachEvents();

        next();
    }

}, {
    ATTRS: {

    }
});

Y.namespace('POC').App = AcmePoc;

}, '0.0.1', {
    requires: [
        'app-base',
        'app-content',
        'app-transitions',
        'poc-photo-list',
        'poc-photo',
        'poc-photo-list-view',
        'json-parse',
        'handlebars'
    ]
});