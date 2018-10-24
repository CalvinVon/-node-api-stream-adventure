const combiner = require('stream-combiner');
const through = require('through2');
const split = require('split');
const zlib = require("zlib");

module.exports = function () {
    let result = null;

    function write(obj, _, next) {
        if (obj.length === 0) {
            return next();
        }
        const object = JSON.parse(obj);
        if (object.type === 'genre') {
            if (result) {
                this.push(JSON.stringify(result));
                this.push('\n');
                result = null;
            }
            result = {
                name: object.name,
                books: []
            };
        } else {
            result.books.push(object.name);
        }

        next();
    }

    function end(done) {
        if (result) {
            this.push(JSON.stringify(result));
            this.push('\n');
        }
        done();
    }

    return combiner(
        // read newline-separated json,
        // group books into genres,
        // then gzip the output
        split(),
        through.obj(write, end),
        zlib.createGzip()
    );
}
