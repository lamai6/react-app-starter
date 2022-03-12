const path = require('path');
const isDevelopment = process.env.NODE_ENV !== 'production';
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
    mode: isDevelopment ? 'development' : 'production',
    entry: './src/index.js',
    output: {
        filename: 'app.bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@fonts': path.resolve(__dirname, 'src/assets/fonts'),
            '@images': path.resolve(__dirname, 'src/assets/images'),
            '@components': path.resolve(__dirname, 'src/components')
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                exclude: /node_modules/,
                use: [
                    {
                        loader: require.resolve('babel-loader')
                    }
                ]
            },
            {
                test: /\.s?css$/i,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[hash][ext][query]'
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[hash][ext][query]'
                }
            }
        ]
    },
    plugins: [
        isDevelopment && new ReactRefreshWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'React App',
            inject: false,
            templateContent: ({htmlWebpackPlugin}) => `
                <html>
                    <head>
                        <title>${htmlWebpackPlugin.options.title}</title>
                        ${htmlWebpackPlugin.tags.headTags}
                    </head>
                    <body>
                        <div id='app'></div>
                        ${htmlWebpackPlugin.tags.bodyTags}
                    </body>
                </html>
            `
        })
    ].filter(Boolean),
    devServer: {
        static: './dist',
        open: true,
        hot: true
    }
};