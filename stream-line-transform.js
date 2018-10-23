const through = require('through2');
const split = require('split');
const stream = through(write, end);

let num = 0;

function write(buffer, encoding, next) {
  if (num++ % 2 === 1) {
    this.push(buffer.toString().toUpperCase() + '\n');
  } else {
    this.push(buffer.toString().toLowerCase() + '\n');
  }
  next();
}

function end(done) {
  done();
}

process.stdin
  .pipe(split())
  .pipe(stream)
  .pipe(process.stdout);