YUI.add('poc-app', function (Y) {

var POC = Y.POC,
    AcmePoc,
    Templates = Y.namespace('POC').Templates = {};

AcmePoc = Y.Base.create('acmePoc', Y.App, [], {
    getPathInfo: function(path) {
        var routeInfo = null;
        var routesMeta = this.routesMeta;
        
        Y.Object.each(routesMeta, function(item, key) {
            if(item.path === path) {
                routeInfo = item;
                routeInfo.name = key;
                return;
            }
        });
        
        return routeInfo;
    },
    
    handlePjaxLike: function(req, res, next) {
        var routeInfo = this.getPathInfo(req.path);
        var data = Y.JSON.parse(res.ioResponse.responseText);
        
        this.showContent(Y.Node.create(data.fragments.main), {
            view: routeInfo.name
        });
        
        if (data.hasOwnProperty('title')) {
            Y.config.doc.title = data['title'];
        }

        Y.one('#sidebar').setHTML(data.fragments.sidebar);
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
        'poc-io',
        'json-parse'
    ]
});