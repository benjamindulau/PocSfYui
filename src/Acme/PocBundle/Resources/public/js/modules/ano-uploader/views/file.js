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
    }

});

Y.namespace('AnoUploader').FileView = FileView;

}, '0.0.1', {
    requires: [
        'handlebars',
        'view'
    ]
});