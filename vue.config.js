const pkg = require('./package.json');

module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? `https://cdn.jsdelivr.net/npm/${pkg.name}@${pkg.version}/dist/` : undefined
};
