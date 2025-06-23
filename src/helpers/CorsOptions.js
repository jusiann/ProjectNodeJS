const whiteList = ["http://localhost:3000"]

const CorsOptions = (req, callback) => {
    let corsOptions;
    console.log(req.header("Origin"));
    if(whiteList.indexOf(req.header("Origin")) !== -1) {
        console.log("true");
        corsOptions = {
            origin: true
        }
    } else {
        console.log("false");
        corsOptions = {
            origin: false
        }
    }
    callback(null, corsOptions);
}

module.exports = CorsOptions;