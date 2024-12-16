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
exports.userService = void 0;
const config_1 = __importDefault(require("../../config"));
const academicSemester_model_1 = __importDefault(require("../academicSemester/academicSemester.model"));
const student_model_1 = require("../student/student.model");
const user_model_1 = require("./user.model");
const user_utils_1 = require("./user.utils");
const createStudnetIntoDb = (password, studentData) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = {};
    userData.role = 'student';
    const academicDetails = yield academicSemester_model_1.default.findById(studentData.admissionSemester);
    userData.id = yield (0, user_utils_1.generateStudentId)(academicDetails);
    userData.password = password || config_1.default.defaultPass;
    const newUser = yield user_model_1.UsersModel.create(userData);
    if (newUser === null || newUser === void 0 ? void 0 : newUser._id) {
        studentData.id = newUser === null || newUser === void 0 ? void 0 : newUser.id;
        studentData.user = newUser === null || newUser === void 0 ? void 0 : newUser._id;
        const newStudent = yield student_model_1.studentsModel.create(studentData);
        return newStudent;
    }
});
exports.userService = {
    createStudnetIntoDb,
};
