const multer = require("multer");
const path = require("path");
const fs = require("fs");

const fileFilter = (req, file, callback) => {
    const allowMimeTypes = ["image/png", "image/jpeg", "image/gif", "image/jpg"];

    if(!allowMimeTypes.includes(file.mimetype)) {
        return callback(new Error("Invalid file type!!"), false);
    }
    callback(null, true);
}

const storage = new multer.diskStorage({
    destination: function (req, file, callback) {
        const rootDir = path.dirname(require.main.filename);
        console.log("file: ",require.main.filename);
        fs.mkdirSync(path.join(rootDir, "/public/uploads"), { recursive: true });
        callback(null, path.join(rootDir, "/public/uploads"));
    },
    filename: function (req, file, callback) {
        const extension = file.mimetype.split("/")[1];

        if(!req.savedImages) req.savedImages = [];

        const uniqueSuffix = Date.now() + "-" + Math.random(Math.round() * 1E9);
        let url = `image_${uniqueSuffix}.${extension}`;
        req.savedImages = [...req.savedImages, path.join(url)];
        callback(null, url);
    }
})

const upload = multer({storage, fileFilter}).array("images");

module.exports = upload;