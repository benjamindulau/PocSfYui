YUI.add('poc-plugin-form-validation', function(Y) {
    function FormValidationPlugin(config) {
        FormValidationPlugin.superclass.constructor.apply(this, arguments);
    }

    FormValidationPlugin.NAME = 'formValidationPlugin';
    FormValidationPlugin.NS = 'validation';
    FormValidationPlugin.ATTRS = {
        url: {}
    };

    Y.extend(FormValidationPlugin, Y.Plugin.Base, {
        initializer : function(config) {
            this.onHostEvent("blur", this._onHostBlurEvent);             
        },

        _onHostBlurEvent: function(e) {
            var target = e.target;
            var value = target.get('value');
            var name = target.get('name');
            var field = name.substring(name.indexOf('[') + 1, name.indexOf(']'));

            Y.io(this.get('url'), {
                on: {
                    complete: function(id, e) {
                        var responseData = JSON.parse(e.responseText);

                        if('success' === responseData.status) {
                            target.setStyle('background', '#8AE429');
                        }
                        else {
                            target.setStyle('background', '#FF4E50');
                            Y.Node.one('#message').setHTML(responseData.message);
                        }
                    }
                },
                data: {
                    field: field,
                    value: value
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    });

    Y.namespace("Plugin.FormValidation").FormValidationPlugin = FormValidationPlugin;

}, '0.1.0', {requires:['plugin', 'node', 'event-focus', 'io-base']});