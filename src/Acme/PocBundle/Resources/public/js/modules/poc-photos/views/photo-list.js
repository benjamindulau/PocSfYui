YUI.add('poc-photo-list-view', function (Y) {

var POC = Y.POC,
    PhotoListView;

PhotoListView = Y.Base.create('photoListView', Y.View, [], {

    photoTemplate: null,

    initializer: function(config) {
        var photoList = this.get('modelList');

        if(photoList) {
            photoList.after('add', this.addPhoto, this);
            this.listNode = this.get('container').one('ul');    
        }
    },
    
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
    },

    events: {
        '#add-photo': {click: 'addSinglePhoto'}
    },

    addSinglePhoto: function(e) {
        var id = Math.floor((Math.random() * 100) + 1);

        this.get('modelList').add({
            id: id,
            index: id,
            url: 'http://farm1.cosplay-it.com/photos/0/2025_4c42ffd890260_l.jpg'
        });
    },

    addPhoto: function (e) {
        var fragment = Y.one(Y.config.doc.createDocumentFragment()),
            template = this.get('photoTemplate');

        fragment.append(template(e.model.toJSON()));
        this.listNode.append(fragment);
    }

}, {
    ATTRS: {
        container: {
            valueFn: function() { return Y.Node.one('#photo-list-container'); }
        }
    }
});

Y.namespace('POC').PhotoListView = PhotoListView;

}, '0.0.1', {
    requires: [
        'view'
    ]
});