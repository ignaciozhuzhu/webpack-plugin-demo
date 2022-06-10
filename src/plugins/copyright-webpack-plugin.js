const aaa = require("../../bin/local-packages");
//console.log(444,aaa())

class CopyrightWebpackPlugin {
  constructor(options) {
    console.log(`恭喜: 作者是${options.auth}的插件被您使用了! `);
    //      aaa()
  }
  apply(compiler) {
    compiler.hooks.compile.tap("CopyrightWebpackPlugin", (compilation) => {
      console.log("compileHooks");
    });
    compiler.hooks.emit.tapAsync(
      "CopyrightWebpackPlugin",
      (compilation, callback) => {
        console.log("生成资源到 output 目录之前");
        compilation.assets["Copyright.txt"] = {
          source: function () {
            return "这是一个版权文件: 版权信息版权信息版权信息版权信息版权信息版权信息";
          },
          size: function () {
            return 8;
          },
        };
        callback();
      }
    );
  }
}
module.exports = CopyrightWebpackPlugin;
