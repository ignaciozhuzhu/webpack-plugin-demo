class CopyrightWebpackPlugin {
    constructor (options) {
      console.log('插件被使用了')
      console.log(options)
    }
    apply (compiler) {
        compiler.hooks.emit.tapAsync('CopyrightWebpackPlugin', (compilation, callback) => {
            console.log('生成资源到 output 目录之前')
            compilation.assets['Copyright.txt'] = {
                source: function () {
                    return '这是一个版权文件: 版权信息版权信息版权信息版权信息版权信息版权信息'
                },
                size: function () {
                    return 8
                }
            }
            callback()
        })
    }
}
module.exports = CopyrightWebpackPlugin