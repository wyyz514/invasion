module.exports = {
    entry: "./invasion.js",
    output: {
        path: "/lib",
        filename:"bundle.js"
    },
    module: {
        loaders: [
            {
                test: /.js$/, exclude: "node_modules", loader: "babel-loader"
            },
            {
                test: /.css$/, loader: "style-loader!css-loader"
            }
        ]
    }
}