const { createServer } = require("node:http"); //node.js cung cap thu vien viet san

// const hostname = "127.0.0.1"; //localhost
const hostname = "localhost"; //localhost
const port = 3000;

const server = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World\nThis is the 1st statement");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
