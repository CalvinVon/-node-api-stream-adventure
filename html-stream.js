/**
 * 分支管道
 * 这个例子将输入管道中 html包含 loud class 的元素放入另一个管道进行大写操作，然后最后合并成输出
 */
const trumpet = require('trumpet')();
const through = require('through2');
const stream = trumpet.selectAll('.loud').createStream();
const upper = through(function (buf, _, next) {
    this.push(buf.toString().toUpperCase());
    next();
});

stream
    .pipe(upper)
    .pipe(stream);

process.stdin
    .pipe(trumpet)
    .pipe(process.stdout);
    