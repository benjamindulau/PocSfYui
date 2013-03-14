AcmePoc.YuiConfig = {
    "version"  : "3.8.1",
    "debug": true,
    "filter": "raw",
    "groups": {
        "modules": {
            "base": AcmePoc.globalConfig.root + "/modules/",
            "combine": false,
            "comboBase": "/combo?",
            "root": "",
            "modules": {
                "poc-io": {
                    "requires": ["io"]
                },
                "poc-app": {
                    "path"    : "../app.js",
                    "requires": [
                        "app-base",
                        "app-content",
                        "app-transitions"
                    ]
                }
            }
        },
        "views": {
            "base": AcmePoc.globalConfig.root + "/views/",
            "combine": false,
            "comboBase": "/combo?",
            "root": "",
            "modules": {
                "poc-header-view": {
                    "path": "header.js"
                },
                "poc-sidebar-view": {
                    "path": "sidebar.js"
                },
                "poc-main-view": {
                    "path": "main.js"
                },
                "poc-footer-view": {
                    "path": "footer.js"
                },
                "poc-page-view": {
                    "path": "page.js",
                    "requires": [
                        "poc-header-view",
                        "poc-sidebar-view",
                        "poc-main-view",
                        "poc-footer-view"
                    ]
                }
            }
        }
    }
};