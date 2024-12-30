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
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../../config"));
const academicSemester_model_1 = __importDefault(require("../academicSemester/academicSemester.model"));
const student_model_1 = require("../student/student.model");
const user_model_1 = require("./user.model");
const user_utils_1 = require("./user.utils");
const AppErrors_1 = __importDefault(require("../../errors/AppErrors"));
const createStudnetIntoDb = (password, studentData) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const userData = {};
    userData.role = 'student';
    const academicDetails = yield academicSemester_model_1.default.findById(studentData.admissionSemester);
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        userData.id = yield (0, user_utils_1.generateStudentId)(academicDetails);
        userData.password = password || config_1.default.defaultPass;
        const newUser = yield user_model_1.UsersModel.create([userData], { session });
        if (!(newUser === null || newUser === void 0 ? void 0 : newUser.length)) {
            throw new AppErrors_1.default(500, 'Failed to create user');
        }
        studentData.id = (_a = newUser[0]) === null || _a === void 0 ? void 0 : _a.id;
        studentData.user = (_b = newUser[0]) === null || _b === void 0 ? void 0 : _b._id;
        const newStudent = yield student_model_1.studentsModel.create([studentData], { session });
        if (!(newStudent === null || newStudent === void 0 ? void 0 : newStudent.length)) {
            throw new AppErrors_1.default(500, 'Failed to create student');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return newStudent;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new AppErrors_1.default(500, 'Failed to create student');
    }
});
const createFacultyIntoDb = (password, facultyData) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const userData = {};
    userData.role = 'faculty';
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        userData.id = yield (0, user_utils_1.generateFacultyId)();
        userData.password = password;
        const newUser = yield user_model_1.UsersModel.create([userData], { session });
        if (!(newUser === null || newUser === void 0 ? void 0 : newUser.length)) {
            throw new AppErrors_1.default(500, 'Failed to create user');
        }
        facultyData.id = (_a = newUser[0]) === null || _a === void 0 ? void 0 : _a.id;
        facultyData.user = (_b = newUser[0]) === null || _b === void 0 ? void 0 : _b._id;
        const newFaculty = yield student_model_1.studentsModel.create([facultyData], { session });
        if (!(newFaculty === null || newFaculty === void 0 ? void 0 : newFaculty.length)) {
            throw new AppErrors_1.default(500, 'Failed to create faculty');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return newFaculty;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new AppErrors_1.default(500, 'Failed to create faculty');
    }
});
exports.userService = {
    createStudnetIntoDb,
    createFacultyIntoDb,
};
