const path = require("path");

module.exports = {
    entry: "./src/indexAbuelo.ts",
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["css-loader"],
            },

            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: "file-loader",
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
    cache: {
        type: "filesystem",
    },
    experiments: { topLevelAwait: true },
    optimization: {
        minimize: true,
    },
};
