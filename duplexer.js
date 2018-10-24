const spawn = require('child_process').spawn;
const duplexer2 = require('duplexer2');

module.exports = function (cmd, args) {
    // spawn the process and return a single stream
    // joining together the stdin and stdout here
    var c = spawn(cmd, args)
    return duplexer2(c.stdin, c.stdout)
};
