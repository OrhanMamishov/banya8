const path = require("path");
const autoprefixer = require("autoprefixer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const fs = require("fs");
const NODE_ENV = process.env.NODE_ENV;
const BUILD = process.env.BUILD;
const IS_DEV = NODE_ENV === "development";
const IS_PROD = NODE_ENV === "production";
const PAGES_DIR = path.join(__dirname, "./src/public");
const PAGES = fs
  .readdirSync(PAGES_DIR)
  .filter((fileName) => fileName.endsWith(".html"));

function setupDevtool() {
  if (IS_DEV) {
    return "eval";
  }
  if (IS_PROD) {
    return false;
  }
}

module.exports = {
  entry: {
    index: "./src/public/scripts/pages/index.js",
    price: "./src/public/scripts/pages/price.js",
    oferta: "./src/public/scripts/pages/oferta.js",
    arendatoram: "./src/public/scripts/pages/arendatoram.js",
    about: "./src/public/scripts/pages/about.js",
    gallery: "./src/public/scripts/pages/gallery.js",
    blog: "./src/public/scripts/pages/blog.js",
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    publicPath: BUILD === "dev" ? "../" : "/",
    filename: "[name]/[name].bundle.js",
    chunkFilename: "[id].bundle_[chunkhash].js",
  },
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, "./pages/index"),
    },
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  autoprefixer({
                    overrideBrowserslist: ["last 4 version"],
                  }),
                ],
              },
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|avif|webp|svg)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/img/[name][ext]",
        },
      },
      {
        test: /\.(woff|woff2|ttf|otf|eot)$/,
        type: "asset/resource",
        generator: {
          filename: "assets/fonts/[name][ext]",
        },
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
    ],
  },
  devtool: setupDevtool(),
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name]/[name].css",
    }),
    ...PAGES.map(
      (page) =>
        new HtmlWebpackPlugin({
          // favicon: "src/assets/img/favicon.svg",
          filename: `/${page.replace(".html", "")}/index.html`,
          template: path.resolve(
            __dirname,
            `./src/public/${page.replace(/\.pug/, ".html")}`
          ),
          chunks: [page.replace(".html", "")],
          inject: "head",
          scriptLoading: "blocking",
        })
    ),
    new CleanWebpackPlugin(),
  ],
};
