const path = require('path');

module.exports = {
  publicPath: path.resolve(__dirname, '../local'),
  versionJs: path.resolve(__dirname, './version_js.json'),
  versionCss: path.resolve(__dirname, './version_css.json'),
};
