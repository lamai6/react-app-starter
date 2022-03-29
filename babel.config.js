module.exports = (api) => {
  api.cache.using(() => process.env.NODE_ENV);
  return {
    presets: [
      '@babel/preset-env',
      // JSX transpiles <App /> to React.createElement(...), so we ask runtime to auto import React
      [
        '@babel/preset-react',
        { development: !api.env('production'), runtime: 'automatic' },
      ],
    ],
    plugins: [
      '@babel/plugin-transform-runtime',
      'macros',
      !(api.env('production') || api.env('test')) && 'react-refresh/babel',
    ].filter(Boolean),
  };
};
