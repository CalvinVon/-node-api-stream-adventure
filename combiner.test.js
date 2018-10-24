const stream = require('stream');
const combiner = require('./combiner');

class MyReader extends stream.Readable {
    constructor(dataSource, opt) {
        super(opt);
        this.dataSource = dataSource;
    }

    _read() {
        this.push(this.dataSource);
    }
}

new MyReader(`{"type":"genre","name":"cyberpunk"}
{"type":"book","name":"Neuromancer"}
{"type":"book","name":"Snow Crash"}
{"type":"genre","name":"space opera"}
{"type":"book","name":"A Deepness in the Sky"}
{"type":"book","name":"Void"}
`)
    .pipe(combiner())
    .pipe(process.stdout)
