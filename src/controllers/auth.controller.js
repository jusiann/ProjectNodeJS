require("express-async-errors");
const USER = require("../models/user.model");
const bcrypt = require("bcrypt");
const API_ERROR = require("../utils/errors");
const Response = require("../utils/response");
const {createToken} = require("../middlewares/auth");

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

module.exports = {
    login,
    register,
    me
}