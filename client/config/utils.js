const path = require('path');
const fs = require('fs');
const chalk = require('chalk');

function getPageEntry() {
  const dirPath = path.resolve(__dirname, '../pages/');
  const dirList = fs.readdirSync(dirPath);

  const resolve = dirList.reduce((p, dir) => {
    const entryPath = path.join(dirPath, dir, 'main.tsx');
    const stat = fs.existsSync(entryPath);

    if (!stat) {
      chalk.yellowBright(`${entryPath} 入口文件不存在`);
      return p;
    }

    return {
      ...p,
      [dir]: entryPath,
    };
  }, {});

  return resolve;
}

module.exports = {
  getPageEntry,
};
