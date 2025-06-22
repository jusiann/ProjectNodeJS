require("express-async-errors");
const user = require("../models/user.model");
const bcrypt = require("bcrypt");
const API_ERROR = require("../utils/errors");

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

    try {
        const userSave = new user(req.body);

        await userSave.save().then((response) => {
            return res.status(201).json({
                success: true,
                data: response
            });
        }).catch((err) => {
            console.log(err);
        })
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    login,
    register
}