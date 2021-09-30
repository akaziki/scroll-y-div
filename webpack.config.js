const path = require("path");

module.exports = {
  entry: path.join(__dirname, "./src/index.jsx"),
  output: {
    path: path.join(__dirname, "./lib"),
    filename: "index.js",
    libraryTarget: "umd", // 采用通用模块定义
    libraryExport: "default", // 兼容 ES6 的模块系统、CommonJS 和 AMD 模块规范
    environment: {
      arrowFunction: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader", // 架桥梁
        options: {
          presets: [
            "@babel/preset-env", // 2. 将ES6语法转成 ES5
            "@babel/preset-react", // 1. 先把react 的jsx 转换成 React.createElement() 普通的js函数调用
          ],
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css/,
        use: [
          require.resolve("style-loader"),
          {
            loader: require.resolve("css-loader"),
            options: {
              modules: true,
              importLoaders: 1,
            },
          },
        ],
      },
    ],
  },
  externals: {
    react: {
      root: "React",
      commonjs2: "react",
      commonjs: "react",
      amd: "react",
    },
    "prop-types": {
      root: "PropTypes",
      commonjs2: "prop-types",
      commonjs: "prop-types",
      amd: "prop-types",
    },
  },
  resolve: {
    extensions: [".jsx"],
  },
};
