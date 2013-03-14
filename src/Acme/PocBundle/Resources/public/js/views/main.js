YUI.add('poc-main-view', function (Y) {

var POC = Y.POC,
    MainView;

MainView = Y.Base.create('mainView', Y.View, [], {
    events: {
        'button': {click: 'handleButtonClick'}
    },

    handleButtonClick: function (e) {
        alert('Main view!');
    }
}, {
    ATTRS: {
        container: {
            valueFn: function() { return Y.Node.one('#main'); }
        }
    }
});

Y.namespace('POC').MainView = MainView;

}, '0.0.1', {
    requires: [
        'app-base',
        'app-content',
        'app-transitions'
    ]
});