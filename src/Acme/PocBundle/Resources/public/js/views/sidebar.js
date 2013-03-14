YUI.add('poc-sidebar-view', function (Y) {

var POC = Y.POC,
    SidebarView;

SidebarView = Y.Base.create('sidebarView', Y.View, [], {
    events: {
        'button': {click: 'handleButtonClick'}
    },

    handleButtonClick: function (e) {
        alert('Sidebar view!');
    }
}, {
    ATTRS: {
        container: {
            valueFn: function() { return Y.Node.one('#sidebar'); }
        }
    }
});

Y.namespace('POC').SidebarView = SidebarView;

}, '0.0.1', {
    requires: [
        'app-base',
        'app-content',
        'app-transitions'
    ]
});