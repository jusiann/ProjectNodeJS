const API_ERROR = require("../utils/errors");

const ERROR_HANDLER_MIDDLEWARE = (err, req, res, next) => {
    if(err instanceof API_ERROR) {
        return res.status(err.statusCode || 400).json({
            success: false,
            message: err.message
        });
    }
    return res.status(500).json({
        success: false,
        message: "we encountered an error please check the api!"
    });
}
module.exports = ERROR_HANDLER_MIDDLEWARE;