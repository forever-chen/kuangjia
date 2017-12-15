const path = require("path");
const webpack = require("webpack");
const htmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry:{
        a:'./src/container/index1.js',
        b: './src/container/index2.js',
    },
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'js/[name]-[hash].js',
        publicPath: 'http://cdn.com'
    },
    module:{
        loaders:[
            {
                test:/\.html/,
                loader:'html-loader'
            },
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader",
                },
                exclude: /node_modules/,
                include:'/src/'
            },
            {
                test: /\.css$/,
                loaders: ['style-loader','css-loader?importLoaders=1','postcss-loader'],  // !对两个loader进行串联，经过css处理过的文件，style-loader会给页面中添加一堆style标签
                // mudule=true表示类名加上hash值，importLoaders=1表示import属性引入的css在css-loader之后的1个模块也解析
                
            },
            {
                test: /\.less$/,
                loaders: ['style-loader','css-loader','postcss-loader','less-loader'],  // !对两个loader进行串联，经过css处理过的文件，style-loader会给页面中添加一堆style标签
                // mudule=true表示类名加上hash值，importLoaders=1表示import属性引入的css在css-loader之后的1个模块也解析
                // less-loader可以处理import引入的文件等同于ImpostLoader的作用
            },
            {
                test: /\.(scss|sass)$/,
                loaders: ['style-loader','css-loader','postcss-loader','scss-loader'],  // !对两个loader进行串联，经过css处理过的文件，style-loader会给页面中添加一堆style标签
                // mudule=true表示类名加上hash值，importLoaders=1表示import属性引入的css在css-loader之后的1个模块也解析
                // less-loader可以处理import引入的文件等同于ImpostLoader的作用
            },{
                test:/\/(png|jpg|gif|svg)$/i,
                loader:'file-loader'
            },{
                test:/\/(png|jpg|gif|svg)$/i,
                loaders:[
                    'file-loader',
                    'url-loader?limit=20000&name=assets/[name]-[hash:5].[ext]',
                    'image-loader'
                ]
            }
        ]
    },
    plugins:[
        new htmlWebpackPlugin({
            template:'./template/index.html',
            filename:'a-[hash].html',
            inject:false,
            title:'this is a.html',
            excludeChunks:['b'],
            data:[1,0,3,7,4,5],
            minify:{
                removeComments:true,    // 删除注释
                removeEmptyAttributes:true, //移除空属性
                collapseWhitespace:true     //移除空格
            }
        })
    ]
 
}