const path = require("path");
const CompressionWebpackPlugin = require("compression-webpack-plugin");

const productionGzipExtensions = ["js", "css"];
const TerserPlugin = require("terser-webpack-plugin");

// css压缩
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// function resolve (dir) {
//     return path.join(__dirname, './', dir);
// }

module.exports = {
  productionSourceMap: false, // 生产环境的 source map
  // CSS 相关选项
  css: {
    extract: true,

    sourceMap: false,

    // 为预处理器的 loader 传递自定义选项。比如传递给
    loaderOptions: {
      // less: {
      //   modifyVars: {
      //     blue: '#3962f5',
      //     hack: `true; @import "${path.join(__dirname, './src/assets/less.less')}";`
      //   }
      // }
    }
  },
  // 引入全局公共样式变量 需安装style-resources-loader和vue-cli-plugin-style-resources-loader
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [path.resolve(__dirname, "./src/global/variable.less")]
    }
  },

  // 压缩插件
  configureWebpack: config => {
    config.plugins.push(
      new CompressionWebpackPlugin({
        filename: "[path].gz[query]",
        algorithm: "gzip",
        test: new RegExp(`\\.(${productionGzipExtensions.join("|")})$`),
        threshold: 10240,
        minRatio: 0.8
      })
    );

    // 代码压缩
    config.plugins.push(
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        terserOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true
          }
        }
      })
    );

    // 忽略：导入css顺序不一致警告 // !!没有效果？？？
    // config.plugins.push(
    //   new MiniCssExtractPlugin({
    //     ignoreOrder: true
    //   })
    // );
  },

  chainWebpack: config => {
    // 移除 prefetch 插件
    config.plugins.delete("prefetch");
    // 移除 preload 插件
    config.plugins.delete("preload");
    // 图片压缩
    config.module
      .rule("images")
      .use("image-webpack-loader")
      .loader("image-webpack-loader")
      .options({ bypassOnDebug: true })
      .end();

    const svgRule = config.module.rule("svg"); // 找到 svg-loader
    svgRule.uses.clear(); // 清除已有的 loader, 如果不这样做会添加在此loader之后
    svgRule.exclude.add(/node_modules/); // 正则匹配排除 node_modules 目录
    svgRule // 添加 svg 新的 loader 处理
      .test(/\.svg$/)
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      });

    // 使用 webpack4 新特性来拆分代码
    config.optimization.splitChunks({
      chunks: "all",
      cacheGroups: {
        libs: {
          name: "chunk-libs",
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: "initial" // 只打包初始时依赖的第三方
        },
        vant: {
          name: "chunk-vant", // 单独将 vant 拆包
          priority: 20, // 权重要大于 libs 和 app 不然会被打包进 libs 或者 app
          test: /[\\/]node_modules[\\/]vant[\\/]/
        },
        commons: {
          name: "chunk-commons",
          test: path.resolve(__dirname, "./src/components"), // 可自定义拓展你的规则
          minChunks: 3, // 最小公用次数
          priority: 5,
          reuseExistingChunk: true
        }
      }
    });
    config.optimization.runtimeChunk("single");
  },
  lintOnSave: true,
  assetsDir: "static",
  devServer: {
    proxy: "http://ms.yidaiyun.com.cn/api/v1.0"
  }
};
