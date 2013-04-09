YUI.add('ano-uploader-file-view', function (Y) {

var AnoUploader = Y.AnoUploader,
    FileView;

FileView = Y.Base.create('fileView', Y.View, [], {
    template: Y.Handlebars.compile(Y.one('#t-file').getHTML()),

    initializer: function(config) {
        var model = this.get('model');

        // If this view has a model, bubble model events to the view.
        model && model.addTarget(this);

        // If the model gets swapped out, reset targets accordingly.
        this.after('modelChange', function (ev) {
            ev.prevVal && ev.prevVal.removeTarget(this);
            ev.newVal && ev.newVal.addTarget(this);
        });

        // Re-render this view when the model changes.
        this.after('*:change', this.render, this);

        // Automatically destroy this view when the linked model is destroyed.
        this.after('modelDestroy', this.destroy, this);
    },

    render: function() {
        var file = this.get('model').toJSON();

        this.get('container').setHTML(this.template(file));

        return this;
    },

    createDrag: function() {
        var container = this.get('container');

        //Plugin the Drag plugin
        container.plug(Y.Plugin.Drag, {
            offsetNode: false
        });

        //Plug the Proxy into the DD object
        container.dd.plug(Y.Plugin.DDProxy, {
            resizeFrame: false,
            moveOnEnd: false,
            borderStyle: 'none'
        });
    }

});

Y.namespace('AnoUploader').FileView = FileView;

}, '0.0.1', {
    requires: [
        'dd',
        'dd-plugin',
        'handlebars',
        'view'
    ]
});