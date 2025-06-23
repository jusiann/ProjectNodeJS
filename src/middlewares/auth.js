const jwt = require("jsonwebtoken");
const API_ERROR = require("../utils/errors");
const USER = require("../models/user.model");
const createToken = async (user, res) => {
    const payload = {
        sub: user.id,
        name: user.name
    }

    const token = await jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        algorithm: "HS512",
        expiresIn: process.env.JWT_EXPIRES_IN,
    });

    return res.status(201).json({
        success: true,
        token: token,
        message: "Authentication successful!"
    });
}

const checkToken = async (req, res, next) => {
    const headerToken = req.headers.authorization && req.headers.authorization.startsWith("Bearer ");

    if (!headerToken) {
        throw new API_ERROR("No token provided!!", 401);
    }

    const token = req.headers.authorization.split(" ")[1];

    await jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
        if(err) {
            throw new API_ERROR("Failed to verify token", 401);
        }

        const user = await USER.findById(decoded.sub)
            .select("_id name lastname email");


        if(!user) {
            throw new API_ERROR("Failed to verify token", 401);
        }

        req.user = user;
        next();
    })
}

module.exports = {
    createToken,
    checkToken
};