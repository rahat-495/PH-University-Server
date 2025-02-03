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
const faculty_model_1 = require("../faculty/faculty.model");
const admin_model_1 = require("../admin/admin.model");
const createStudnetIntoDb = (password, studentData) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const userData = {};
    userData.role = 'student';
    userData.email = studentData === null || studentData === void 0 ? void 0 : studentData.email;
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
        console.log(error);
        yield session.abortTransaction();
        yield session.endSession();
        throw new AppErrors_1.default(500, 'Failed to create student !');
    }
});
const createFacultyIntoDb = (password, facultyData) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const userData = {};
    userData.role = 'faculty';
    userData.email = facultyData === null || facultyData === void 0 ? void 0 : facultyData.email;
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
        const newFaculty = yield faculty_model_1.facultysModel.create([facultyData], { session });
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
const createAdminIntoDb = (password, adminData) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const userData = {};
    userData.role = 'admin';
    userData.email = adminData === null || adminData === void 0 ? void 0 : adminData.email;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        userData.id = yield (0, user_utils_1.generateAdminId)();
        userData.password = password;
        const newUser = yield user_model_1.UsersModel.create([userData], { session });
        if (!(newUser === null || newUser === void 0 ? void 0 : newUser.length)) {
            throw new AppErrors_1.default(500, 'Failed to create user');
        }
        adminData.id = (_a = newUser[0]) === null || _a === void 0 ? void 0 : _a.id;
        adminData.user = (_b = newUser[0]) === null || _b === void 0 ? void 0 : _b._id;
        const newAdmin = yield admin_model_1.adminsModel.create([adminData], { session });
        if (!(newAdmin === null || newAdmin === void 0 ? void 0 : newAdmin.length)) {
            throw new AppErrors_1.default(500, 'Failed to create admin');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return newAdmin;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new AppErrors_1.default(500, 'Failed to create admin');
    }
});
const getMeFromDb = (userId, role) => __awaiter(void 0, void 0, void 0, function* () {
    let result = null;
    if (role === "admin") {
        result = yield admin_model_1.adminsModel.findOne({ id: userId }).populate("user");
    }
    if (role === "faculty") {
        result = yield faculty_model_1.facultysModel.findOne({ id: userId }).populate("user");
    }
    if (role === "student") {
        result = yield student_model_1.studentsModel.findOne({ id: userId }).populate("user");
    }
    return result;
});
const changeStatusIntoDb = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UsersModel.findByIdAndUpdate(id, payload, { new: true });
    return result;
});
exports.userService = {
    getMeFromDb,
    createAdminIntoDb,
    changeStatusIntoDb,
    createStudnetIntoDb,
    createFacultyIntoDb,
};
