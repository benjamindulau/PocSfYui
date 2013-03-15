AcmePoc.YuiConfig = {
    "version"  : "3.8.1",
    "debug": true,
    "filter": "raw",
    "combine": false,
    "comboBase": "/combo?",
    "groups": {
        "app": {
            "base": AcmePoc.globalConfig.root + "/",
            "modules": {
                "poc-app": {
                    "path": "app.js",
                    "requires": [
                        "app-base",
                        "app-content",
                        "app-transitions",
                        "json-parse",
                        "handlebars"
                    ]
                },
                "poc-header-view": {
                    "path": "views/header.js"
                },
                "poc-sidebar-view": {
                    "path": "views/sidebar.js"
                },
                "poc-main-view": {
                    "path": "views/main.js"
                },
                "poc-footer-view": {
                    "path": "views/footer.js"
                },
                "poc-page-view": {
                    "path": "views/page.js",
                    "requires": [
                        "poc-header-view",
                        "poc-sidebar-view",
                        "poc-main-view",
                        "poc-footer-view"
                    ]
                }
            }
        },
        "util": {
            "base": AcmePoc.globalConfig.root + "/modules/",
            "modules": {
                "poc-io": {
                    "requires": ["io"]
                }
            }
        },
        "photos": {
            "base": AcmePoc.globalConfig.root + "/modules/poc-photos/",
            "modules": {
                "poc-photo": {
                    "path": "models/photo.js",
                    "requires": [
                        "model"
                    ]
                },
                "poc-photo-list": {
                    "path": "models/photo-list.js",
                    "requires": [
                        "model-list",
                        "poc-photo"
                    ]
                },
                "poc-photo-list-view": {
                    "path": "views/photo-list.js",
                    "requires": [
                        "model-list",
                        "poc-photo"
                    ]
                }
            }
        }
    }
};