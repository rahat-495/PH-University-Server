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
exports.authServices = void 0;
const config_1 = __importDefault(require("../../config"));
const AppErrors_1 = __importDefault(require("../../errors/AppErrors"));
const user_model_1 = require("../user/user.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const http_status_1 = __importDefault(require("http-status"));
const auth_utils_1 = require("./auth.utils");
const sendEmail_1 = require("../../utils/sendEmail");
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.UsersModel.isUserAxistByCustomId(payload === null || payload === void 0 ? void 0 : payload.id);
    if (!user) {
        throw new AppErrors_1.default(404, "The user is not found !");
    }
    const isDeleted = user === null || user === void 0 ? void 0 : user.isDeleted;
    if (isDeleted) {
        throw new AppErrors_1.default(400, "The user is deleted !");
    }
    const userStatus = user === null || user === void 0 ? void 0 : user.status;
    if (userStatus === "blocked") {
        throw new AppErrors_1.default(400, "The user is already blocked !");
    }
    if (!(yield user_model_1.UsersModel.isPasswordMatched(payload === null || payload === void 0 ? void 0 : payload.password, user === null || user === void 0 ? void 0 : user.password))) {
        throw new AppErrors_1.default(400, "The password is not matched !");
    }
    const jwtPayload = { userId: user === null || user === void 0 ? void 0 : user.id, role: user === null || user === void 0 ? void 0 : user.role };
    const accesstoken = yield (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwtAccessSecret, "1d");
    const refreshtoken = yield (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwtRefreshSecret, "365d");
    return { accesstoken, refreshtoken, needsPasswordChange: user === null || user === void 0 ? void 0 : user.needsPasswordChange };
});
const changePasswordIntoDb = (userData, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.UsersModel.isUserAxistByCustomId(userData === null || userData === void 0 ? void 0 : userData.userId);
    if (!user) {
        throw new AppErrors_1.default(404, "The user is not found !");
    }
    const isDeleted = user === null || user === void 0 ? void 0 : user.isDeleted;
    if (isDeleted) {
        throw new AppErrors_1.default(400, "The user is deleted !");
    }
    const userStatus = user === null || user === void 0 ? void 0 : user.status;
    if (userStatus === "blocked") {
        throw new AppErrors_1.default(400, "The user is already blocked !");
    }
    if (!(yield user_model_1.UsersModel.isPasswordMatched(payload === null || payload === void 0 ? void 0 : payload.oldPassword, user === null || user === void 0 ? void 0 : user.password))) {
        throw new AppErrors_1.default(400, "The password is not matched !");
    }
    const newHashedPassword = yield bcryptjs_1.default.hash(payload === null || payload === void 0 ? void 0 : payload.newPassword, Number(config_1.default.bcryptSaltRounds));
    const result = yield user_model_1.UsersModel.findOneAndUpdate({ id: user === null || user === void 0 ? void 0 : user.id, role: userData === null || userData === void 0 ? void 0 : userData.role }, { password: newHashedPassword, needsPasswordChange: false, passwordChangeAt: new Date() }, { new: true });
    return result;
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwtRefreshSecret);
    const user = yield user_model_1.UsersModel.isUserAxistByCustomId(decoded === null || decoded === void 0 ? void 0 : decoded.userId);
    if (!user) {
        throw new AppErrors_1.default(404, "The user is not found !");
    }
    const isDeleted = user === null || user === void 0 ? void 0 : user.isDeleted;
    if (isDeleted) {
        throw new AppErrors_1.default(400, "The user is deleted !");
    }
    const userStatus = user === null || user === void 0 ? void 0 : user.status;
    if (userStatus === "blocked") {
        throw new AppErrors_1.default(400, "The user is already blocked !");
    }
    if ((user === null || user === void 0 ? void 0 : user.passwordChangeAt) && user_model_1.UsersModel.isJWTIssuedBeforePasswordChange(user === null || user === void 0 ? void 0 : user.passwordChangeAt, decoded.iat)) {
        throw new AppErrors_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized !");
    }
    const jwtPayload = { userId: user === null || user === void 0 ? void 0 : user.id, role: user === null || user === void 0 ? void 0 : user.role };
    const accessToken = yield (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwtAccessSecret, "1d");
    return { accessToken };
});
const forgetPassword = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.UsersModel.isUserAxistByCustomId(userId);
    if (!user) {
        throw new AppErrors_1.default(404, "The user is not found !");
    }
    const isDeleted = user === null || user === void 0 ? void 0 : user.isDeleted;
    if (isDeleted) {
        throw new AppErrors_1.default(400, "The user is deleted !");
    }
    const userStatus = user === null || user === void 0 ? void 0 : user.status;
    if (userStatus === "blocked") {
        throw new AppErrors_1.default(400, "The user is already blocked !");
    }
    const jwtPayload = { userId: user === null || user === void 0 ? void 0 : user.id, role: user === null || user === void 0 ? void 0 : user.role };
    const resetToken = yield (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwtAccessSecret, "10m");
    const resetUiLink = `${config_1.default.resetPassUILink}?id=${user === null || user === void 0 ? void 0 : user.id}&token=${resetToken}`;
    (0, sendEmail_1.sendEmail)(user === null || user === void 0 ? void 0 : user.email, resetUiLink);
});
const resetPassword = (id, token, pass) => __awaiter(void 0, void 0, void 0, function* () {
    return null;
});
exports.authServices = {
    loginUser,
    refreshToken,
    resetPassword,
    forgetPassword,
    changePasswordIntoDb,
};
