YUI.add('poc-app', function (Y) {

var POC = Y.POC,
    AcmePoc,
    Templates = Y.namespace('POC').Templates = {};

AcmePoc = Y.Base.create('acmePoc', Y.App, [], {
    /*
    render: function() {
        var routeInfo = this.getPathInfo(this.getPath());
        Y.log('render: ' + routeInfo.view);
        Y.log(Y.one('#main'));
        this.showContent(Y.one('#main'), {
            view: routeInfo.view
        });
    },
    */
    
    getPathInfo: function(path) {
        var routeInfo = null;
        var routesMeta = this.routesMeta;
        
        Y.Object.each(routesMeta, function(item) {
            if(item.path === path) {
                routeInfo = item;
                return;
            }
        });
        
        return routeInfo;
    },
    
    handlePjaxLike: function(req, res, next) {
        var routeInfo = this.getPathInfo(req.path);
        var data = Y.JSON.parse(res.ioResponse.responseText);
        
        this.showContent(Y.Node.create(data.fragments.main), {
            view: routeInfo.view
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
        'poc-photo-list',
        'poc-io',
        'poc-photo',
        'poc-photo-list-view',
        'json-parse',
        'handlebars'
    ]
});