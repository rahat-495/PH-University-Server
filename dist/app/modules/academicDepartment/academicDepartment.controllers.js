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
exports.academicDepartmentControllers = void 0;
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const academicDepartment_services_1 = require("./academicDepartment.services");
const createAcademicDepartmentIntoDb = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicDepartment_services_1.academicDepartmentServices.createAacademicDepartmentIntoDb(req.body);
    (0, sendResponse_1.default)(res, { success: true, message: "Academic faculty created success fully !", statusCode: 200, data: result });
}));
const getAllAcademicDepartment = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicDepartment_services_1.academicDepartmentServices.getAllAcademicDepartmentFromDb();
    (0, sendResponse_1.default)(res, { success: true, message: "Academic faculties retrive success fully !", statusCode: 200, data: result });
}));
const getAcademicDepartment = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicDepartment_services_1.academicDepartmentServices.getSpecificAcademicDepartmentFromDb(req.params.id);
    if (result) {
        (0, sendResponse_1.default)(res, { success: true, message: "Academic faculty retrive success fully !", statusCode: 200, data: result });
    }
}));
const updateAcademicDepartment = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicDepartment_services_1.academicDepartmentServices.updateAcademicDepartmentIntoDb(req.params.id, req.body);
    (0, sendResponse_1.default)(res, { success: true, message: "Academic faculty updated success fully !", statusCode: 200, data: result });
}));
exports.academicDepartmentControllers = {
    getAcademicDepartment,
    updateAcademicDepartment,
    getAllAcademicDepartment,
    createAcademicDepartmentIntoDb,
};
