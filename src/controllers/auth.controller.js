require("express-async-errors");
const user = require("../models/user.model");
const bcrypt = require("bcrypt");
const API_ERROR = require("../utils/errors");
const Response = require("../utils/response");

const login = async (req, res) => {
    console.log(req.body);
    return res.json(req.body);
}
const register = async (req, res) => {
    //req.body.email
    const {email} = req.body;
    const userCheck = await user.findOne({email});

    if(userCheck) {
        throw new API_ERROR("email exist!!", 401);
    }

    req.body.password = await bcrypt.hash(req.body.password, 10);
    console.log("Hashed Password: ",req.body.password);

    const userSave = new user(req.body);

    await userSave.save().then((data) => {
        return new Response(data, "Registration Successfully Added!!").createdResponse(res);
        }).catch((err) => {
            throw new API_ERROR("Registration NOT Added!!", 400)
        })

}

module.exports = {
    login,
    register
}