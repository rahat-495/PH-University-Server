"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globalErrorHandler = (err, req, res, next) => {
    return res.status(500).json({
        success: false,
        message: err.message || "some thing wen't wrong",
        error: err,
    });
};
exports.default = globalErrorHandler;
