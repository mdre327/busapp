const logger = require('../logger.js');

//DEFINE ERROR HANDLER
exports.handleError = function(err, res) {
    logger.error(err);
    res.status(500);
    res.send(err);
}