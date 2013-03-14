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
        var data = Y.JSON.parse(res.ioResponse.responseText);

        Y.Node.one('#main').setHTML(data['main']).setStyle('background', 'yellow');
        Y.Node.one('#sidebar').setHTML(data['sidebar']).setStyle('background', 'yellow');
        Y.config.doc.title = data['title'];
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