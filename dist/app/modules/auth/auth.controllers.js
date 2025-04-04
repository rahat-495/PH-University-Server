"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authControllers = void 0;
const config_1 = __importDefault(require("../../config"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const auth_services_1 = require("./auth.services");
const loginUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_services_1.authServices.loginUser(req.body);
    res.cookie("refreshToken", result.refreshtoken, { secure: config_1.default.nodeEnv === "production", httpOnly: true, sameSite: "strict", maxAge: 1000 * 60 * 60 * 24 * 365 });
    if (result) {
        (0, sendResponse_1.default)(res, { data: result, statusCode: 200, success: true, message: "User Login Successfully !" });
    }
}));
const changePassword = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_services_1.authServices.changePasswordIntoDb(req.user, req.body);
    if (result) {
        (0, sendResponse_1.default)(res, { data: result, statusCode: 200, success: true, message: "User password change Successfully !" });
    }
}));
const refreshToken = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_services_1.authServices.refreshToken(req.cookies.refreshToken);
    if (result) {
        (0, sendResponse_1.default)(res, { data: result, statusCode: 200, success: true, message: "Access token retribed Successfully !" });
    }
}));
const forgetPassword = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_services_1.authServices.forgetPassword(req.body.id);
    res.status(200).json({
        success: true, message: "Reset link is generated Successfully !"
    });
}));
const resetPassword = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_services_1.authServices.resetPassword(req.body, req.headers.authorization);
    if (result) {
        (0, sendResponse_1.default)(res, { data: result, statusCode: 200, success: true, message: "Password Reset Successfully !" });
    }
}));
exports.authControllers = {
    loginUser,
    refreshToken,
    resetPassword,
    changePassword,
    forgetPassword,
};
