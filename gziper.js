const zlib = require('zlib');
const fs = require('fs');
const path = require('path');

const pwd = process.cwd();
const filename = process.argv[2];

fs
    .createReadStream(path.resolve(pwd, filename))
    .pipe(zlib.createGzip())
    .pipe(fs.createWriteStream(path.resolve(pwd, filename + '.gz')))
