YUI.add('ano-uploader-upload-info', function (Y) {

var AnoUploader = Y.AnoUploader,
    UploadInfo;

UploadInfo = Y.Base.create('uploadInfo', Y.Model, [], {

    initializer: function(config) {
        this.after('bytesLoadedChange', this.refreshOverallPercentProgress, this);
    },

    incTotalFileCount: function(inc) {
        var totalFileCount = this.get('totalFileCount');
        this.set('totalFileCount', totalFileCount + inc);
    },

    decTotalFileCount: function(dec) {
        var totalFileCount = this.get('totalFileCount');
        this.set('totalFileCount', totalFileCount - dec);
    },

    refreshOverallPercentProgress: function(e) {
        var bytesLoaded = this.get('bytesLoaded'),
            bytesTotal = this.get('bytesTotal'),
            percent;

        percent = Math.min(100, Math.round(10000*bytesLoaded/bytesTotal) / 100);

        this.set('overallPercentProgress', percent);
    }

}, {
    ATTRS: {
        id: {value: null},
        totalFileCount: {value: 0},
        bytesLoaded: {value: 0},
        bytesTotal: {value: 0},
        overallPercentProgress: {value: 0}
    }
});

Y.namespace('AnoUploader').UploadInfo = UploadInfo;

}, '0.0.1', {
    requires: [
        'model'
    ]
});