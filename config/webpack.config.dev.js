const path = require('path')
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin")
module.exports = {
    // 入口文件
    entry: "./src/index.js",
    // 输出文件
    output: {
        // __dirname 代表当前文件的文件夹目录
        // path: path.resolve(__dirname, 'dist'),// 输出路径，使用绝对路径
        // 入口文件打包输出文件名
        // filename: 'js/index.js',// 输出文件名
        // 自动清空上次打包内容
        // 原理：在打包前，将path 整个目录内容清空：在进行打包
        // clean: true
    },
    // 加载器
    module: {
        rules: [
            {
                oneOf: [
                    // loader 的配置
                    {
                        test: /\.css$/, // 检测以 .css为结尾的文件
                        use: [
                            // 执行顺序： 1.从右向左执行 , 2. 从下向上执行
                            "style-loader", // 讲 js 中 css 通过创建 style 标签添加到Html文件中生效
                            "css-loader"// 将 css 资源 编译成 commonjs 的模块到js 中
                        ]
                    },
                    // 处理less样式资源
                    {
                        test: /\.less$/, // 检测以 .less 为结尾的文件
                        use: [
                            // 执行顺序： 1.从右向左执行 , 2. 从下向上执行
                            "style-loader", // 讲 js 中 css 通过创建 style 标签添加到Html文件中生效
                            "css-loader",// 将 css 资源 编译成 commonjs 的模块到js 中
                            "less-loader"// 将 less 资源 编译成 commonjs 的模块到js 中
                        ]
                    },
                    // 处理sass样式资源
                    {
                        test: /\.s[ac]ss$/, // 检测以 .less 为结尾的文件
                        use: [
                            // 执行顺序： 1.从右向左执行 , 2. 从下向上执行
                            "style-loader", // 讲 js 中 css 通过创建 style 标签添加到Html文件中生效
                            "css-loader",// 将 css 资源 编译成 commonjs 的模块到js 中
                            "sass-loader"// 将 sass 资源 编译成 commonjs 的模块到js 中
                        ]
                    },
                    {
                        test: /\.styl$/,
                        use: [
                            "style-loader",
                            "css-loader",
                            "stylus-loader"
                        ],
                    },
                    // 处理资源
                    {
                        test: /\.(png|jpe?g|gif|webp|svg)$/,
                        type: "asset",
                        parser: {
                            dataUrlCondition: {
                                // 小于10Kb 的图片转base64
                                // 优点：减少请求书，缺点：体积会变大
                                maxSize: 20 * 1024 // 20kb
                            }
                        },
                        generator: {
                            // 输出图片的名称
                            filename: 'static/image/[hash:10][ext][query]'
                        }
                    },
                    // 处理字体资源
                    {
                        test: /\.(ttf|woff2?)$/,
                        type: "asset/resource",
                        generator: {
                            // 输出图片的名称
                            filename: 'static/font/[hash:10][ext][query]'
                        }
                    },
                    // 处理媒体资源
                    {
                        test: /\.(mp3|mp4|wav)$/,
                        type: 'asset/resource',
                        generator: {
                            filename: "static/media/[hash:10][ext][query]"
                        }
                    },
                    {
                        test: /\.m?js$/,
                        exclude: /(node_modules|bower_components)/,  // 排除node_modules （这些文件不处理）
                        loader: 'babel-loader',
                        // use: {
                        //     loader: 'babel-loader',
                        //     options: {
                        //         presets: ['@babel/preset-env']
                        //     }
                        // }
                    }
                ]
            }

        ]
    },
    // 插件
    plugins: [
        // plugins 的配置
        new ESLintPlugin(
            //检测哪些文件
            {
                context: path.resolve(__dirname, "../src")

            }
        ),
        new HtmlWebpackPlugin({
            title: 'My app',
            template: path.resolve(__dirname, "../public/index.html")
        })
    ],
    // 配置 devServer
    devServer: {
        host: 'localhost',//启动服务的主机地址
        port: "8000",// 启动服务的端口号，
        open: true,
        hot: true,//开启hotModuleReplacement模块 （热模块替换）
    },
    // 模式
    mode: 'development',
    // 
    devtool: "cheap-module-source-map",
}