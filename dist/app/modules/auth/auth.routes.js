"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../middlewares/validateRequest"));
const auth_validation_1 = require("./auth.validation");
const auth_controllers_1 = require("./auth.controllers");
const auth_1 = __importDefault(require("../middlewares/auth"));
const user_constant_1 = require("../user/user.constant");
const router = (0, express_1.Router)();
router.post('/login', (0, validateRequest_1.default)(auth_validation_1.authValidations.loginValidationSchema), auth_controllers_1.authControllers.loginUser);
router.post('/refresh-token', (0, validateRequest_1.default)(auth_validation_1.authValidations.refreshTokenValidationSchema), auth_controllers_1.authControllers.refreshToken);
router.post('/change-password', (0, auth_1.default)(user_constant_1.userRole.admin, user_constant_1.userRole.faculty, user_constant_1.userRole.student), (0, validateRequest_1.default)(auth_validation_1.authValidations.changePasswordValidationSchema), auth_controllers_1.authControllers.changePassword);
exports.authRoutes = router;
