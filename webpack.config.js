const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');
const { default : Animation } = require("./src/animate");

module.exports = {
  entry: {
    main: path.resolve(__dirname, './src/animate.js'),
  },
  output: {
    filename: 'animate.bundle.js',
    library: {
      name: "Animation",
      type: "umd"
    },
    path: path.resolve(__dirname, 'dist')
  }
};