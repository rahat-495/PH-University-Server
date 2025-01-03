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
exports.courseControllers = void 0;
const course_services_1 = require("./course.services");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const createCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_services_1.courseServices.createCourseIntoDb(req.body);
    (0, sendResponse_1.default)(res, { data: result, statusCode: 200, success: true, message: "Course Created Successfully !" });
});
const getAllCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_services_1.courseServices.getAllCourseFromDb();
    (0, sendResponse_1.default)(res, { data: result, statusCode: 200, success: true, message: "All courses are retrive Successfully !" });
});
const getSingleCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_services_1.courseServices.getSingleCourseFromDb();
    (0, sendResponse_1.default)(res, { data: result, statusCode: 200, success: true, message: "Courses are retrive Successfully !" });
});
const deleteCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_services_1.courseServices.deleteCourseIntoDb(req.params.id);
    if (result) {
        (0, sendResponse_1.default)(res, { data: result, statusCode: 200, success: true, message: "Courses are deleted Successfully !" });
    }
});
exports.courseControllers = {
    deleteCourse,
    createCourse,
    getAllCourses,
    getSingleCourse,
};
