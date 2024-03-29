var secret = "<put-your-secret>"
var repo = "/home/libia/github_action2/"

const http=require('http');
const crypto=require('crypto');
const exec = require('child_process').exec;
http.createServer(function (req, res) {
    req.on('data', function(chunk) {
        let sig = "sha1=" + crypto.createHmac('sha1', secret).update(chunk.toString()).digest('hex');

        if (req.headers['x-hub-signature'] == sig) {
            exec('cd ' + repo + ' && git pull');
        }
    });
    res.end();
}).listen(8000);
