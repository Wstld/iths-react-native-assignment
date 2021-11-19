module.exports = function(api) {
  api.cache(true);
  return {
    presets: [
      'babel-preset-expo'
     ],
     "plugins": [["module:react-native-dotenv", {
      "envName": "APP_ENV",
      "moduleName": "@env",
      "path": "src/config/.env",
      "blocklist": null,
      "allowlist": null,
      "safe": false,
      "allowUndefined": true,
      "verbose": false
    }]

    ]
   
  };
};
