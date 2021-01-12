var path = require("path");

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        path: path.resolve("public"),
        filename: "bundle.js",
    },
    module: {
        // loaders: [
        //     {
        //         test: /\.json$/,
        //         loader: "json-loader"
        //     },
        //     {
        //         test: /\.js$/,
        //         loader: "babel-loader"
        //     }
        // ]
        rules: [
          
            {
                test: /\.json$/,
                exclude: /node_modules/,
                use: {
                    loader: "json-loader",
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                }
            },
        ]
    }
};