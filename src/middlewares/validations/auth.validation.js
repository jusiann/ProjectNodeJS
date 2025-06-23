const joi = require("joi");
const API_ERROR = require("../../utils/errors");

class AuthValidation {
    constructor() {}

    static registerAction = async (req, res, next) => {
        try {
            await joi.object({
                name: joi.string().trim().min(3).max(50).required().messages({
                    "string.base": "Name Field must be normal text",
                    "string.empty": "Name Field cannot be empty!",
                    "string.min": "Name Field must be at least 3 characters",
                    "string.max": "Name Field must be up to 50 characters ",
                    "string.required": "Name Field is necessary!"
                }),
                lastname: joi.string().trim().min(3).max(50).required().messages({
                    "string.base": "Lastname Field must be normal text",
                    "string.empty": "Lastname Field cannot be empty!",
                    "string.min": "Lastname Field must be at least 3 characters",
                    "string.max": "Lastname Field must be up to 50 characters ",
                    "string.required": "Lastname Field is necessary!"
                }),
                email: joi.string().email().trim().min(3).max(50).required().messages({
                    "string.base": "Email Field must be normal text",
                    "string.empty": "Email Field cannot be empty!",
                    "string.email": "Email Field Must be a valid",
                    "string.min": "Email Field must be at least 3 characters",
                    "string.max": "Email Field must be up to 50 characters ",
                    "string.required": "Email Field is necessary!"
                }),
                password: joi.string().trim().min(8).max(32).required().messages({
                    "string.base": "Password Field must be normal text",
                    "string.empty": "Password Field cannot be empty!",
                    "string.min": "Password Field must be at least 8 characters",
                    "string.max": "Password Field must be up to 32 characters ",
                    "string.required": "Password Field is necessary!"
                })
            }).validateAsync(req.body);
        } catch (err) {
            if(err.details && err?.details[0].message)
                throw new API_ERROR(err.details[0].message, 400);
            else
                throw new API_ERROR("Check all validations!!");
        }
        next();
    }

    static loginAction = async (req, res, next) => {
        try {
            await joi.object({
                email: joi.string().email().trim().min(3).max(50).required().messages({
                    "string.base": "Email Field must be normal text",
                    "string.empty": "Email Field cannot be empty!",
                    "string.email": "Email Field Must be a valid",
                    "string.min": "Email Field must be at least 3 characters",
                    "string.max": "Email Field must be up to 50 characters ",
                    "string.required": "Email Field is necessary!"
                }),
                password: joi.string().trim().min(8).max(32).required().messages({
                    "string.base": "Password Field must be normal text",
                    "string.empty": "Password Field cannot be empty!",
                    "string.min": "Password Field must be at least 8 characters",
                    "string.max": "Password Field must be up to 32 characters ",
                    "string.required": "Password Field is necessary!"
                })
            }).validateAsync(req.body);
        } catch (err) {
            if(err.details && err?.details[0].message)
                throw new API_ERROR(err.details[0].message, 400);
            else
                throw new API_ERROR("Check all validations!!");
        }
        next();
    }
}

module.exports = AuthValidation;

