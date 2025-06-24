const router = require("express").Router();
const auth = require("./auth.routes");
const upload = require("../middlewares/lib/upload");
const multer = require("multer");
const API_ERROR = require("../utils/errors");
const Response = require("../utils/Response");
router.use(auth);

router.post("/uploads", function (req, res) {
   upload(req, res, function (error) {
       if(error instanceof multer.MulterError)
           throw new API_ERROR("Multer upload error", error);
       else if(error)
           throw new API_ERROR("File upload error", error);
       else
           return new Response(req.savedImages, "Upload successfull!").successResponse(res);
   });
});
module.exports = router;

