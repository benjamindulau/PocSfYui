YUI.add('poc-header-view', function (Y) {

var POC = Y.POC,
    HeaderView;

HeaderView = Y.Base.create('headerView', Y.View, [], {
    events: {
        'button': {click: 'handleButtonClick'}
    },

    handleButtonClick: function (e) {
        alert('Header view!');
    }
}, {
    ATTRS: {
        container: {
            valueFn: function() { return Y.Node.one('#header'); }
        }
    }
});

Y.namespace('POC').HeaderView = HeaderView;

}, '0.0.1', {
    requires: [
        'app-base',
        'app-content',
        'app-transitions'
    ]
});