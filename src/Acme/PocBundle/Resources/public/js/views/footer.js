YUI.add('poc-footer-view', function (Y) {

var POC = Y.POC,
    FooterView;

FooterView = Y.Base.create('footerView', Y.View, [], {
    events: {
        'button': {click: 'handleButtonClick'}
    },

    handleButtonClick: function (e) {
        alert('Footer view!');
    }
}, {
    ATTRS: {
        container: {
            valueFn: function() { return Y.Node.one('#footer'); }
        }
    }
});

Y.namespace('POC').FooterView = FooterView;

}, '0.0.1', {
    requires: [
        'app-base',
        'app-content',
        'app-transitions'
    ]
});