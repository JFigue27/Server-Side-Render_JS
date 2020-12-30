import express from "express";
import devEnv from "dotenv";
import webpack from "webpack";

devEnv.config();

const { ENV, PORT } = process.env;
const app = express();

if (ENV === "development") {
  console.log("Development Config!");

  const webpackConfig = require("../../webpack.config");
  const webpackDevMiddleware = require("webpack-dev-middleware");
  const webpackHotMiddleware = require("webpack-hot-middleware");
  const compiler = webpack(webpackConfig);
  // const serverConfig = { port: PORT, hot: true };
  const { publicPath } = webpackConfig.output;
  const serverConfig = { serverSideRender: true, publicPath };

  app.use(webpackDevMiddleware(compiler, serverConfig));
  app.use(webpackHotMiddleware(compiler));
}

app.get("*", (req, res) => {
  res.send(`
  <!DOCTYPE html>
  <html>
  <head>
      <link href="assets/app.css" rel="stylesheet" src="" type="text/css" ></>
      <title>Platzi Video</title>
    </head>
    <body>
      <div id="app"></div>
      <script src="assets/app.js" type="text/javascript"></script>
    </body>
</html>`);
});

app.listen(PORT, (error) => {
  if (error) console.log(error);
  else console.log(`Server is running on http://localhost:${PORT}`);
});