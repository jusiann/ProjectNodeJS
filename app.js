const express = require("express");
const app = express();

require("dotenv").config();
require("./src/db/database");

const port = process.env.PORT || 5001
const router = require("./src/routers");
const ERROR_HANDLER_MIDDLEWARE = require("./src/middlewares/ErrorHandler");

const cors = require("cors");
const CorsOption = require("./src/helpers/CorsOptions");
const CorsOptions = require("./src/helpers/CorsOptions");
// Middlewares
app.use(express.json());
app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({
        limit: "50mb",
        extended: true,
        parameterLimit: 50000
}));

app.use(cors(CorsOptions));

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