const http = require('http');
const fs = require('fs');
const through = require('through2');

http.createServer((req, res) => {
  if (req.method === 'POST') {
    // req.pipe(fs.createWriteStream('post.txt', {
    //   flags: 'a+'
    // }));
    req
      .pipe(through(function (buf, _, next) {
        this.push(buf.toString().toUpperCase());
        next();
      }))
      .pipe(res)
  }
}).listen(process.argv[2])