YUI.add('poc-page-view', function (Y) {

var POC = Y.POC,
    BasePageView,
    Page2colLeftView;

BasePageView = Y.Base.create('basePageView', Y.View, [], {
});

Y.namespace('POC').BasePageView = BasePageView;

Page2colLeftView = Y.Base.create('page2colLeftView', Y.POC.BasePageView, [], {
    initializer: function (config) {
        this.fragmentViews = {};
        this.fragmentViews.sidebar = new Y.POC.SidebarView();
        this.fragmentViews.main = new Y.POC.MainView();
        
        //IMHO, Something is missing... 
        this.fragmentViews.sidebar.attachEvents();
        this.fragmentViews.main.attachEvents();
    },

    render: function () {
        var fragments = this.get('fragments');
        var fragmentViews = this.fragmentViews;
        
        Y.Object.each(fragments, function(value, name) {
            if(fragmentViews.hasOwnProperty(name)) {
                fragmentViews[name].get('container').setHTML(value).setStyle('background', 'yellow');
            }
        });

        return this;
    }
});

Y.namespace('POC').Page2colLeftView = Page2colLeftView;


}, '0.0.1', {
    requires: [
        'app-base',
        'app-content',
        'app-transitions',
        'poc-header-view',
        'poc-sidebar-view',
        'poc-main-view',
        'poc-footer-view'
    ]
});