YUI.add('poc-app', function (Y) {

var POC = Y.POC,
    AcmePoc;

AcmePoc = Y.Base.create('acmePoc', Y.App, [], {

    namedRoutes: [
        {name: 'home', callbacks: 'handleFragments'},
        {name: 'profile', callbacks: 'handleFragments'},
        {name: 'photos', callbacks: 'handleFragments'}
    ],

    views: {

    },

    handleFragments: function(req, res, next) {
        //data should be object with this structure
        //data.fragments[':id'] = htmlContent
        var data = Y.JSON.parse(res.ioResponse.responseText);
        
        Y.config.doc.title = data['title'];
        this.showView('page', {
            fragments: data.fragments
        }, {
            update: true,
            render: true
        });
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
        'json-parse'
    ]
});