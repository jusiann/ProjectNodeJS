const mongoose = require("mongoose");

const USER_SCHEMA = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    reset: {
        code: {
            type: String,
            default: null,
        },
        time: {
            type: Date,
            default: null
        }
    }
}, {
    timestamps: true
});

const USER = mongoose.model("users", USER_SCHEMA);

module.exports = USER;