const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");

const config = {
  entry: {
    app: "./src/index.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    filename: "[name].[hash].js",
  },

  resolve: {
    extensions: [".ts", ".js", ".json", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: [
            "@babel/preset-react",
            {
              plugins: ["@babel/plugin-proposal-class-properties"],
            },
          ],
        },
      },
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: { allowTsInNodeModules: true },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader", // translates CSS into CommonJS
          },
          {
            loader: "less-loader", // compiles Less to CSS
            options: {
              javascriptEnabled: true,
            },
          },
        ],
      },
      {
        // Now we apply rule for images
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            // Using file-loader for these files
            loader: "file-loader",
            // In options we can set different things like format
            // and directory to save
            options: {
              name: "[path][name].[ext]",
              outputPath: "images",
            },
          },
        ],
      },
      {
        // Apply rule for fonts files
        test: /\.(woff|woff2|ttf|otf|eot)$/,
        use: [
          {
            // Using file-loader too
            loader: "file-loader",
            options: {
              outputPath: "fonts",
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new Dotenv(),
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "bundle.css",
    }),
    new HtmlWebpackPlugin({
      title: "LightFront",
      template: "./src/index.html",
      chunks: ["app"],
    }),
    new FaviconsWebpackPlugin("./src/assets/media/favicon.png"),
  ],
};

module.exports = (env, argv) => {
  if (argv.mode === "development") {
    config.devtool = "source-map";
    config.devServer = {
      hot: true,
      historyApiFallback: true,
    };
    config.mode = "development";
  }

  if (argv.mode === "production") {
    config.mode = "production";
    config.optimization = {
      splitChunks: {
        chunks: "all",
      },
      minimize: true,
      minimizer: [
        new TerserPlugin({
          cache: true,
        }),
      ],
    };
  }

  return config;
};
