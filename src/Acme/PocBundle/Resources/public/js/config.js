AcmePoc.YuiConfig = {
    "version"  : "3.8.1",
    "debug": true,
    "filter": "raw",
    "groups": {
        "poc": {
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
        }
    }
};