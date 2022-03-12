module.exports = (api) => {
    api.cache.using(() => process.env.NODE_ENV);
    return {
        presets: [
            '@babel/preset-env',
            // For example, JSX transpiles <App /> to React.createElement(...), so we ask runtime to auto import React
            ['@babel/preset-react', { development: !api.env('production'), runtime: 'automatic' }]
        ],
        ...(!(api.env('production') || api.env('test')) && { plugins: ['react-refresh/babel'] })
    };
};