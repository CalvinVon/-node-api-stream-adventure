const crypto = require('crypto');
const gunzip = require('zlib').createGunzip();
const Parser = require('tar');
const through = require('through2');

const decipher = crypto.createDecipher(process.argv[2], process.argv[3]);

const parser = new Parser.Parse();

parser.on('entry', function (e) {
    if (e.type !== 'File') {
        return;
    }
    const hasher = crypto.createHash('md5', {
        encoding: 'hex'
    });
    e.pipe(hasher).pipe(through(null, function (done) {
        done(' ' + e.path + '\n');
    }))
});

process.stdin
    .pipe(decipher)
    .pipe(gunzip)
    .pipe(parser)
    .pipe(process.stdout)