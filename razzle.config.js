module.exports = {
  modify: (config, { target, dev }, webpack) => ({
    ...config,
    devtool: dev ? 'cheap-module-source-map' : 'sourcemap'
  })
};
