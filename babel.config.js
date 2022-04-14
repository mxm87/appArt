module.exports = {
    presets: ["module:metro-react-native-babel-preset"],
    plugins: [
        [
            "module-resolver",
            {
                root: ["."],
                extensions: [
                    ".ios.js",
                    ".android.js",
                    ".js",
                    ".ts",
                    ".tsx",
                    ".json",
                ],
                alias: {
                    "@api": "./src/api",
                    "@assets": "./src/assets",
                    "@components": "./src/components",
                    "@constants": "./src/constants",
                    "@model": "./src/model",
                    "@navigation": "./src/navigation",
                    "@screens": "./src/screens",
                    "@utils": "./src/utils",
                    "@state": "./src/state",
                    "@contexts": "./src/contexts",
                    "@hooks": "./src/hooks",
                },
            },
        ],
    ],
};
