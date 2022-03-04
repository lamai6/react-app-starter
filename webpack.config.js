const path = require('path');
const isDevelopment = process.env.NODE_ENV !== 'production';
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
    mode: isDevelopment ? 'development' : 'production',
    entry: './src/app.js',
    output: {
        filename: 'app.bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: require.resolve('babel-loader'),
                        options: {
                            presets: ["@babel/preset-env", "@babel/preset-react"],
                            plugins: [isDevelopment && require.resolve('react-refresh/babel')].filter(Boolean)
                        }

                    }
                ]
            },
            {
                test: /\.s?css$/i,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/template.html'
        }),
        isDevelopment && new ReactRefreshWebpackPlugin()
    ].filter(Boolean),
    devServer: {
        static: './dist',
        open: true,
        hot: true
    }
};