const fs = require('fs')

const requestLogger = (req, res, next) => {
    const timestamp = new Date().toISOString();
    const messages = `[${timestamp}] ${req.ip} ${req.method} ${req.originalUrl}`
    console.log(messages);
    const accessLog = fs.createWriteStream('logs/access.log', {
        flags: 'a'
    })
    accessLog.write(messages.concat('\r\n'));
    next();
};

module.exports = requestLogger;