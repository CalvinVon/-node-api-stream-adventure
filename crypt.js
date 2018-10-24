const passphrase = process.argv[2];
const crypto = require('crypto');
const stream = crypto.createDecipher('aes256', passphrase);

process.stdin
    .pipe(stream)
    .pipe(process.stdout);
