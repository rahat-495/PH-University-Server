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
exports.studentControllers = void 0;
const student_services_1 = require("./student.services");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const getAllStudents = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield student_services_1.studentServices.getAllStudentsFromDb(req.query);
    (0, sendResponse_1.default)(res, { data: result, statusCode: 200, success: true, message: "All students are retrived !" });
}));
const getSpecificStudent = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = yield student_services_1.studentServices.getSpecificStudentFromDb(id);
    if (data) {
        (0, sendResponse_1.default)(res, { data, statusCode: 200, success: true, message: "Specific students are retrived !" });
    }
    else {
        (0, sendResponse_1.default)(res, { data: {}, statusCode: 200, success: true, message: "Can't Get Any student !" });
    }
}));
const updateAStudent = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield student_services_1.studentServices.updateAStudentIntoDb(id, req.body.student);
    if (result) {
        (0, sendResponse_1.default)(res, { data: result, statusCode: 200, success: true, message: "Student details udpated success fully !" });
    }
}));
const deleteAStudent = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield student_services_1.studentServices.deleteAStudentFromDb(id);
    if (result) {
        (0, sendResponse_1.default)(res, { data: result, statusCode: 200, success: true, message: "Specific students are deleted !" });
    }
}));
exports.studentControllers = {
    getAllStudents,
    deleteAStudent,
    updateAStudent,
    getSpecificStudent,
};
