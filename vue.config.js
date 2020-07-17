const CompressionWebpackPlugin = require('compression-webpack-plugin');
const path = require('path');
const productionGzipExtensions = ['js', 'css'];

module.exports = {
    publicPath: '/',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        proxy: {
            '/merchant':{
                target: 'http://xxx.xxx',
                changeOrigin:true
            },
        }
    },

    // 引入全局样式公共变量
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [
                path.resolve(__dirname, 'src/global/variable.less'),
            ]
        }
    },

    configureWebpack: (config) => {
        config.plugins.push(
            new CompressionWebpackPlugin({
                filename: '[path].gz[query]',
                algorithm: 'gzip',
                test: new RegExp(`\\.(${productionGzipExtensions.join('|')})$`),
                threshold: 10240,
                minRatio: 0.8,
            }),
        );
    },

    chainWebpack: (config) => {
        // 移除 prefetch 插件
        config.plugins['delete']('prefetch');
        // 移除 preload 插件
        config.plugins['delete']('preload');
        // 图片压缩
        config.module
            .rule('images')
            .use('image-webpack-loader')
            .loader('image-webpack-loader')
            .options({ bypassOnDebug: true })
            .end();

        const svgRule = config.module.rule('svg'); // 找到 svg-loader
        svgRule.uses.clear(); // 清除已有的 loader, 如果不这样做会添加在此loader之后
        svgRule.exclude.add(/node_modules/); // 正则匹配排除 node_modules 目录
        svgRule // 添加 svg 新的 loader 处理
            .test(/\.svg$/)
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]',
            });

        // 使用 webpack4 新特性来拆分代码
        config.optimization.splitChunks({
            chunks: 'all',
            cacheGroups: {
                libs: {
                    name: 'chunk-libs',
                    test: /[\\/]node_modules[\\/]/,
                    priority: 10,
                    chunks: 'initial', // 只打包初始时依赖的第三方
                },
                elementUI: {
                    name: 'chunk-ele', // 单独将 element-ui 拆包
                    priority: 20, // 权重要大于 libs 和 app 不然会被打包进 libs 或者 app
                    test: /[\\/]node_modules[\\/]element-ui[\\/]/,
                },
            },
        });
        config.optimization.runtimeChunk('single');
    },
}