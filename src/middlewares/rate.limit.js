const rateLimit = require("express-rate-limit");

const allowList = ["::1"]

const apiLimiter = rateLimit({
    windowMs: 15*60*1000,
    max: (req, res) => {
        console.log("api.url: ", req.url);
        console.log("api.ip: ", req.ip);
        if (req.url === "/login" || req.url === "/register")
            return 5
        else
            return 100
    },
    message: {
        success: false,
        message: "You have made too many requests!"
    },
    skip: (req, res) => allowList.includes(req.ip),
    standardHeaders: true,
    legacyHeaders: false
});

module.exports = apiLimiter;