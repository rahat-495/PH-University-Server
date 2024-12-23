"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globalErrorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "some thing wen't wrong";
    return res.status(statusCode).json({
        success: false,
        message,
        error: err,
    });
};
exports.default = globalErrorHandler;
