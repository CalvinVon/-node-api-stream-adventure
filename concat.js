const concat = require('concat-stream');
const writer = concat(buf => {
  console.log(buf.toString().split('').reverse().join(''))
})
process.stdin
  .pipe(writer)
