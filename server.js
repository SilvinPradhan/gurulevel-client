const express = require("express");
const next = require("next");
const { createProxyMiddleware } = require("http-proxy-middleware");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();
    // proxy to dev mode
    if (dev) {
      server.use(
        "/api",
        createProxyMiddleware({
          target: "http://localhost:8000",
          changeOrigin: true,
        })
      );
    }
    server.all("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(3000, (err) => {
      if (err) throw err;
      console.log("Ready on PORT 8000");
    });
  })
  .catch((err) => {
    console.log("Error preparing the server", err);
  });
