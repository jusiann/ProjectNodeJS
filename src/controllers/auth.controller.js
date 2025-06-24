require("express-async-errors");
const USER = require("../models/user.model");
const bcrypt = require("bcrypt");
const API_ERROR = require("../utils/errors");
const Response = require("../utils/response");
const {createToken} = require("../middlewares/auth");
const crypto = require("crypto");
const sendEmail = require("../utils/send.mail");
const moment = require("moment");

const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await USER.findOne({email});
    if (!user) {
        throw new API_ERROR("Email or Password is wrong!", 401);
    }

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
        throw new API_ERROR("Password is wrong!", 401);
    }

    createToken(user, res);

}
const register = async (req, res) => {
    //req.body.email
    const {email} = req.body;
    const userCheck = await USER.findOne({email});

    if(userCheck) {
        throw new API_ERROR("email exist!!", 401);
    }

    req.body.password = await bcrypt.hash(req.body.password, 10);
    console.log("Hashed Password: ",req.body.password);

    const userSave = new USER(req.body);
    await userSave.save().then((data) => {
        return new Response(data, "Registration Successfully Added!!").createdResponse(res);
        }).catch((err) => {
            throw new API_ERROR("Registration NOT Added!!", 400)
        });
}

const me = async (req, res) => {
    return new Response(req.user).successResponse(res);
}

const forgetPassword = async (req, res) => {
    const {email} = req.body;

    const userInfo = await USER.findOne({email}).select("name lastname email");

    if(!userInfo)
        return new API_ERROR("user not found!", 400);
    console.log("user info: ",userInfo);

    const resetCode = crypto.randomBytes(3).toString("hex");

    await sendEmail({
        from: "adilefe@outlook.com",
        to: userInfo.email,
        subject: "Reset Password",
        text: `Reset Code: ${resetCode}`,
    });

    await USER.updateOne(
        {email},
        {
            reset: {
                code: resetCode,
                time: moment(new Date()).add(15, "minutes").format("YYYY-MM-DD HH:mm:ss")
            }
        }
    );
    return new Response(true, "Check your email box!").successResponse(res);
}

module.exports = {
    login,
    register,
    me,
    forgetPassword
}