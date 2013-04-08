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
        "plugins": {
            "base": AcmePoc.globalConfig.root + "/plugins/",
            "modules": {
                "poc-plugin-form-validation": {
                    "path": "poc-plugin-form-validation.js"
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
        },
        "uploader": {
            "base": AcmePoc.globalConfig.root + "/modules/ano-uploader/",
            "modules": {
                "ano-uploader": {
                    "path": "uploader.js",
                    "requires": [
                        "base",
                        "ano-uploader-upload-info",
                        "ano-uploader-file",
                        "ano-uploader-file-list",
                        "ano-uploader-upload-info-view",
                        "ano-uploader-file-view",
                        "ano-uploader-file-list-view"
                    ]
                },
                "ano-uploader-upload-info": {
                    "path": "models/upload-info.js",
                    "requires": [
                        "model"
                    ]
                },
                "ano-uploader-file": {
                    "path": "models/file.js",
                    "requires": [
                        "model"
                    ]
                },
                "ano-uploader-file-list": {
                    "path": "models/file-list.js",
                    "requires": [
                        "ano-uploader-file",
                        "model-list"
                    ]
                },
                "ano-uploader-upload-info-view": {
                    "path": "views/upload-info.js",
                    "requires": [
                        "handlebars",
                        "view"
                    ]
                },
                "ano-uploader-file-list-view": {
                    "path": "views/file-list.js",
                    "requires": [
                        "handlebars",
                        "view"
                    ]
                },
                "ano-uploader-file-view": {
                    "path": "views/file.js",
                    "requires": [
                        "handlebars",
                        "view"
                    ]
                }
            }
        }
    }
};