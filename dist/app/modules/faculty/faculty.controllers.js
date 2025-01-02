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
exports.facultyControllers = void 0;
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const faculty_services_1 = require("./faculty.services");
const getAlFaculties = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield faculty_services_1.facultyServices.getAllFacultiesFromDb(req.query);
    (0, sendResponse_1.default)(res, { data: result, statusCode: 200, success: true, message: "All faculties are retrived !" });
}));
const getSpecifiFaculty = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = yield faculty_services_1.facultyServices.getSpecificFacultyFromDb(id);
    if (data) {
        (0, sendResponse_1.default)(res, { data, statusCode: 200, success: true, message: "Specific faculties are retrived !" });
    }
    else {
        (0, sendResponse_1.default)(res, { data: {}, statusCode: 200, success: true, message: "Can't Get Any Faculty !" });
    }
}));
const updateFaculty = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield faculty_services_1.facultyServices.updateAFacultyIntoDb(id, req.body.faculty);
    if (result) {
        (0, sendResponse_1.default)(res, { data: result, statusCode: 200, success: true, message: "Faculty details udpated success fully !" });
    }
}));
const deleteFaculty = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { facultyId } = req.params;
    const result = yield faculty_services_1.facultyServices.deleteAFacultyFromDb(facultyId);
    if (result) {
        (0, sendResponse_1.default)(res, { data: result, statusCode: 200, success: true, message: "Specific faculties are deleted !" });
    }
}));
exports.facultyControllers = {
    getAlFaculties,
    deleteFaculty,
    updateFaculty,
    getSpecifiFaculty,
};
