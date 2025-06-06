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
exports.academicSemesterControllers = void 0;
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const academicSemester_services_1 = require("./academicSemester.services");
const createAcademicSemester = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicSemester_services_1.academicSemesterServices.createacademicSemesterIntoDb(req.body);
    (0, sendResponse_1.default)(res, { success: true, message: "Academic semester created success fully !", statusCode: 200, data: result });
}));
const getAllAcademicSemester = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicSemester_services_1.academicSemesterServices.getAllAcademicSemesterFromDb();
    (0, sendResponse_1.default)(res, { success: true, message: "Academic semesters retrive success fully !", statusCode: 200, data: result });
}));
const getAcademicSemester = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicSemester_services_1.academicSemesterServices.getAcademicSemesterFromDb(req.params.semesterId);
    if (result) {
        (0, sendResponse_1.default)(res, { success: true, message: "Academic semester retrive success fully !", statusCode: 200, data: result });
    }
}));
const updateAcademicSemester = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicSemester_services_1.academicSemesterServices.updateAcademicSemesterIntoDb(req.params.semesterId, req.body);
    (0, sendResponse_1.default)(res, { success: true, message: "Academic semester updated success fully !", statusCode: 200, data: result });
}));
exports.academicSemesterControllers = {
    getAcademicSemester,
    createAcademicSemester,
    getAllAcademicSemester,
    updateAcademicSemester,
};
