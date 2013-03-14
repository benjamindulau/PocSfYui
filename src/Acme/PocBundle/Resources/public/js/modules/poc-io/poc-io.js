YUI.add('poc-io', function (Y) {
    Y.PocIo = {};

    Y.PocIo.loadContentFragments = function (req, res, next) {
        var url = req.url;

        // If there's an outstanding request, abort it.
        if (this._request) {
            this._request.abort();
        }

        // Send a request.
        this._request = Y.io(url, {
            'arguments': {
                route: {
                    req : req,
                    res : res,
                    next: next
                },

                url: url
            },
            context: this,
            headers: {'Accept': 'x-application/content-fragmented'},
            timeout: this.get('timeout'),
            on: {
                complete: function (id, ioResponse, details) {
                    var route   = details.route,
                        req     = route.req,
                        res     = route.res;

                    // Put the URL requested through `Y.io` on the route's `req` object.
                    req.ioURL = details.url;

                    // Put the parsed content and `Y.io` response object on the route's
                    // `res` object.
                    res.ioResponse = ioResponse;

                    route.next();
                },
                end     : function () {
                    this._request = null;
                }
            }
        });
    }
}, '0.0.1', {
   requires: ['io']
});