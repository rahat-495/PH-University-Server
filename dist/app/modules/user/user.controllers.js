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
exports.userControllers = void 0;
const user_services_1 = require("./user.services");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const createStudent = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, student: studentData } = req.body;
    const result = yield user_services_1.userService.createStudnetIntoDb(req.file, password, studentData);
    if (!result) {
        return;
    }
    (0, sendResponse_1.default)(res, { success: true,
        message: "student created success fully !",
        statusCode: 200, data: result });
}));
const createFaculty = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, faculty } = req.body;
    const result = yield user_services_1.userService.createFacultyIntoDb(req.file, password, faculty);
    if (!result) {
        return;
    }
    (0, sendResponse_1.default)(res, { success: true,
        message: "Faculty created success fully !",
        statusCode: 200, data: result });
}));
const createAdmin = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, admin } = req.body;
    const result = yield user_services_1.userService.createAdminIntoDb(req.file, password, admin);
    if (!result) {
        return;
    }
    (0, sendResponse_1.default)(res, { success: true,
        message: "Admin created success fully !",
        statusCode: 200, data: result });
}));
const getMe = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_services_1.userService.getMeFromDb(req.user.userId, req.user.role);
    if (!result) {
        return;
    }
    (0, sendResponse_1.default)(res, { success: true,
        message: "User is retrived success fully !",
        statusCode: 200, data: result });
}));
const changeStatus = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_services_1.userService.changeStatusIntoDb(req.params.id, req.body);
    if (!result) {
        return;
    }
    (0, sendResponse_1.default)(res, { success: true,
        message: "User status updated success fully !",
        statusCode: 200, data: result });
}));
exports.userControllers = {
    getMe,
    createAdmin,
    changeStatus,
    createStudent,
    createFaculty,
};
