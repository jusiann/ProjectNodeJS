require("dotenv").config();
const express = require("express");
const app = express();

require("./src/db/database");

const port = process.env.PORT || 5001
const router = require("./src/routers");
const ERROR_HANDLER_MIDDLEWARE = require("./src/middlewares/ErrorHandler");

const cors = require("cors");
const CorsOptions = require("./src/helpers/CorsOptions");

const mongoSanitize = require("express-mongo-sanitize");
const path = require("path");
const apiLimiter = require("./src/middlewares/rate.limit");

// Middlewares
app.use(express.json());
app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({
        limit: "50mb",
        extended: true,
        parameterLimit: 50000
}));

app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(__dirname));
app.use(cors(CorsOptions));

app.use("/api", apiLimiter);

app.use(mongoSanitize({
    replaceWith: "_"
}));

app.use("/api", router);

app.get("/", (req, res) => {
    res.json({
        message: "Welcome"
    })
});

// Catch Errors
app.use(ERROR_HANDLER_MIDDLEWARE);

app.listen(port, ()=> {
    console.log(`Server: ${port}`);
});