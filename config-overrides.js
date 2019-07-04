module.exports = function override(config, env) {
  config.module.rules = config.module.rules.map(rule => {
    if (rule.oneOf instanceof Array) {
      return {
        ...rule,
        oneOf: [
          {
            test: /\.styl$/, 
            loader: 'style-loader!css-loader!stylus-loader' 
          },
          ...rule.oneOf
        ]
      };
    }
    return rule;
  });

  return config;
}