YUI.add('poc-page-view', function (Y) {

var POC = Y.POC,
    BasePageView,
    Page2colLeftView;

BasePageView = Y.Base.create('basePageView', Y.View, [], {
});

Y.namespace('POC').BasePageView = BasePageView;

Page2colLeftView = Y.Base.create('page2colLeftView', Y.POC.BasePageView, [], {
    initializer: function (config) {
        this.set('header', new Y.POC.HeaderView());
        this.set('sidebar', new Y.POC.SidebarView());
        this.set('main', new Y.POC.MainView());
        this.set('footer', new Y.POC.FooterView());

        // TODO: maybe find something else than this lovely hack :p
        // without these calls, views don't get initialized, weird stuff
        // Note that views get correctly initialized when calling render() on them, but
        // we can't do that since we don't want to render the views the first time (rendered by the server)
        this.get('header').get('container');
        this.get('sidebar').get('container');
        this.get('main').get('container');
        this.get('footer').get('container');
    },

    render: function () {
        var container = this.get('container');

        container.get('children').remove();
        container.append(this.get('header').get('container'));
        container.append(this.get('sidebar').get('container'));
        container.append(this.get('main').get('container'));
        container.append(this.get('footer').get('container'));

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