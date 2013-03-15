YUI.add('poc-photo-list-view', function (Y) {

var POC = Y.POC,
    PhotoListView;

PhotoListView = Y.Base.create('photoListView', Y.View, [], {

    photoTemplate: null,

    initializer: function(config) {
        var photoList = this.get('modelList');

        photoList.after('add', this.addPhoto, this);
        this.listNode = this.get('container').one('ul');
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