// const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');
const { default : OnScrollAnimation } = require("./src/animate");

module.exports = {
  entry: {
    main: path.resolve(__dirname, './src/animate.js'),
  },
  output: {
    filename: 'animate.bundle.js',
    library: {
      name: "OnScrollAnimation",
      type: "umd"
    },
    path: path.resolve(__dirname, 'dist')
  }
};