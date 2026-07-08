const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 8000;
// Dossier racine servi : tout chemin résolu en dehors est refusé.
const ROOT = __dirname;

http
  .createServer((req, res) => {
    // On isole le chemin (sans query string) et on le décode avant de le
    // résoudre, pour empêcher toute sortie du dossier du projet via des
    // séquences comme "/../../..." ou leurs variantes encodées.
    let requestedPath;
    try {
      requestedPath = decodeURIComponent(req.url.split("?")[0]);
    } catch (err) {
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end("400 Bad Request");
      return;
    }
    if (requestedPath === "/") requestedPath = "/index.html";

    const filePath = path.normalize(path.join(ROOT, requestedPath));

    // Protection contre le path traversal : le fichier résolu doit rester
    // à l'intérieur de ROOT.
    if (filePath !== ROOT && !filePath.startsWith(ROOT + path.sep)) {
      res.writeHead(403, { "Content-Type": "text/plain" });
      res.end("403 Forbidden");
      return;
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeTypes = {
      ".html": "text/html",
      ".js": "text/javascript",
      ".css": "text/css",
      ".json": "application/json",
      ".png": "image/png",
      ".jpg": "image/jpg",
      ".gif": "image/gif",
      ".svg": "image/svg+xml",
      ".wav": "audio/wav",
      ".mp4": "video/mp4",
      ".woff": "application/font-woff",
      ".ttf": "application/font-ttf",
      ".eot": "application/vnd.ms-fontobject",
      ".otf": "application/font-otf",
      ".wasm": "application/wasm",
    };

    const contentType = mimeTypes[extname] || "application/octet-stream";

    fs.readFile(filePath, (error, content) => {
      if (error) {
        if (error.code == "ENOENT") {
          res.writeHead(404, { "Content-Type": "text/html" });
          res.end("404 Not Found", "utf-8");
        } else {
          res.writeHead(500);
          res.end(
            "Sorry, check with the site admin for error: " +
              error.code +
              " ..\n"
          );
        }
      } else {
        res.writeHead(200, { "Content-Type": contentType });
        res.end(content, "utf-8");
      }
    });
  })
  .listen(PORT);

console.log(`Serveur lancé sur http://localhost:${PORT}`);
