class Response {
    constructor(data = null, message = null) {
        this.data = data;
        this.message = message;
    }

    successResponse(res) {
        return res.status(200).json({
            success: true,
            data: this.data,
            message: this.message ?? "Process Successful!!"
        });
    }

    createdResponse(res) {
        return res.status(201).json({
            success: true,
            data: this.data,
            message: this.message ?? "Process Successful!!"
        });
    }

    error500Response(res) {
        return res.status(500).json({
            success: false,
            data: this.data,
            message: this.message ?? "Process Not Successful!!"
        });
    }

    error400Response(res) {
        return res.status(400).json({
            success: false,
            data: this.data,
            message: this.message ?? "Process Not Successful!!"
        });
    }

    error401Response(res) {
        return res.status(401).json({
            success: false,
            data: this.data,
            message: this.message ?? "Auth is Not Successful!!"
        });
    }

    error404Response(res) {
        return res.status(404).json({
            success: false,
            data: this.data,
            message: this.message ?? "Not Found!!"
        });
    }

    error429Response(res) {
        return res.status(429).json({
            success: false,
            data: this.data,
            message: this.message ?? "Too Many Request!!"
        });
    }
}

module.exports = Response;