const replacePath  = require("../../bin/local-packages");

class ReplacePackageWebpackPlugin {
  constructor(options) {
    console.log(`恭喜: package.json路径替换插件被您使用了! `);
    replacePath()
  }
}
module.exports = ReplacePackageWebpackPlugin;
