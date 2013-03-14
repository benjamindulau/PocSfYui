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
        var node = null;
        var container = this.get('container');
        
        for (var name in data.fragments) {
            node = container.one('#' + name);
            
            if(node) {
                node.setHTML(data.fragments[name]).setStyle('background', 'yellow');
            }
            else {
                Y.log("Fragments received, '#" + name + "' elements isn't defined")
            }
        }
        
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