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
exports.academicFacultyControllers = void 0;
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const academicFaculty_services_1 = require("./academicFaculty.services");
const createAcademicFacultyIntoDb = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicFaculty_services_1.academicFacultyServices.createAacademicFacultyIntoDb(req.body);
    (0, sendResponse_1.default)(res, { success: true, message: "Academic faculty created success fully !", statusCode: 200, data: result });
}));
const getAllAcademicFaculties = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicFaculty_services_1.academicFacultyServices.getAllAcademicFacultiesFromDb();
    (0, sendResponse_1.default)(res, { success: true, message: "Academic faculties retrive success fully !", statusCode: 200, data: result });
}));
const getAcademicFaculty = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicFaculty_services_1.academicFacultyServices.getSpecificAcademicFacultyFromDb(req.params.id);
    if (result) {
        (0, sendResponse_1.default)(res, { success: true, message: "Academic faculty retrive success fully !", statusCode: 200, data: result });
    }
}));
const updateAcademicFaculty = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicFaculty_services_1.academicFacultyServices.updateAcademicFacultyIntoDb(req.params.id, req.body);
    (0, sendResponse_1.default)(res, { success: true, message: "Academic faculty updated success fully !", statusCode: 200, data: result });
}));
exports.academicFacultyControllers = {
    getAcademicFaculty,
    updateAcademicFaculty,
    getAllAcademicFaculties,
    createAcademicFacultyIntoDb,
};
