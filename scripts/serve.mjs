import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { resolve, sep, extname } from "node:path";

const root = resolve("out");
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
  ".txt": "text/plain",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".woff2": "font/woff2",
  ".ico": "image/x-icon",
};
const server = createServer(async (request, response) => {
  try {
    const path = decodeURIComponent(
      new URL(request.url, "http://localhost").pathname,
    );
    let file = resolve(root, `.${path}`);
    if (file !== root && !file.startsWith(root + sep))
      throw new Error("Invalid path");
    if ((await stat(file)).isDirectory()) file = resolve(file, "index.html");
    response.writeHead(200, {
      "Content-Type": types[extname(file)] || "application/octet-stream",
      "X-Content-Type-Options": "nosniff",
    });
    response.end(await readFile(file));
  } catch {
    response.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    response.end(await readFile(resolve(root, "404.html")));
  }
});
server.listen(3000, "127.0.0.1", () =>
  console.log("Local: http://127.0.0.1:3000"),
);
