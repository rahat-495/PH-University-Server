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
const student_model_1 = require("../student/student.model");
const user_model_1 = require("./user.model");
const user_utils_1 = require("./user.utils");
const AppErrors_1 = __importDefault(require("../../errors/AppErrors"));
const faculty_model_1 = require("../faculty/faculty.model");
const admin_model_1 = require("../admin/admin.model");
const sendImageToCloudinary_1 = require("../../utils/sendImageToCloudinary");
const academicsemester_model_1 = __importDefault(require("../academicsemester/academicsemester.model"));
const http_status_1 = __importDefault(require("http-status"));
const academicDepartment_model_1 = require("../academicDepartment/academicDepartment.model");
const createStudnetIntoDb = (file, password, studentData) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const userData = {};
    userData.role = 'student';
    userData.email = studentData === null || studentData === void 0 ? void 0 : studentData.email;
    const academicDetails = yield academicsemester_model_1.default.findById(studentData.admissionSemester);
    if (!academicDetails) {
        throw new AppErrors_1.default(http_status_1.default.NOT_FOUND, "Academic semester not found !");
    }
    const academicDepartment = yield academicDepartment_model_1.academicDepartmentsModel.findById(studentData.academicDepartment);
    if (!academicDepartment) {
        throw new AppErrors_1.default(http_status_1.default.NOT_FOUND, "Academic department not found !");
    }
    studentData.academicFaculty = academicDepartment === null || academicDepartment === void 0 ? void 0 : academicDepartment.academicFaculty;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        userData.id = yield (0, user_utils_1.generateStudentId)(academicDetails);
        userData.password = password || config_1.default.defaultPass;
        if (file) {
            const path = file === null || file === void 0 ? void 0 : file.path;
            const imageName = `${userData === null || userData === void 0 ? void 0 : userData.id}${(_a = studentData === null || studentData === void 0 ? void 0 : studentData.name) === null || _a === void 0 ? void 0 : _a.firstName}`;
            const { secure_url } = yield (0, sendImageToCloudinary_1.sendImageToCloudinary)(imageName, path);
            studentData.profileImg = secure_url;
        }
        const newUser = yield user_model_1.UsersModel.create([userData], { session });
        if (!(newUser === null || newUser === void 0 ? void 0 : newUser.length)) {
            throw new AppErrors_1.default(500, 'Failed to create user');
        }
        studentData.id = (_b = newUser[0]) === null || _b === void 0 ? void 0 : _b.id;
        studentData.user = (_c = newUser[0]) === null || _c === void 0 ? void 0 : _c._id;
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
const createFacultyIntoDb = (file, password, facultyData) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const userData = {};
    userData.role = 'faculty';
    userData.email = facultyData === null || facultyData === void 0 ? void 0 : facultyData.email;
    const academicDepartment = yield academicDepartment_model_1.academicDepartmentsModel.findById(facultyData.academicDepartment);
    if (!academicDepartment) {
        throw new AppErrors_1.default(http_status_1.default.NOT_FOUND, "Academic department not found !");
    }
    facultyData.academicFaculty = academicDepartment === null || academicDepartment === void 0 ? void 0 : academicDepartment.academicFaculty;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        userData.id = yield (0, user_utils_1.generateFacultyId)();
        userData.password = password;
        if (file) {
            const path = file === null || file === void 0 ? void 0 : file.path;
            const imageName = `${userData === null || userData === void 0 ? void 0 : userData.id}${(_a = facultyData === null || facultyData === void 0 ? void 0 : facultyData.name) === null || _a === void 0 ? void 0 : _a.firstName}`;
            const { secure_url } = yield (0, sendImageToCloudinary_1.sendImageToCloudinary)(imageName, path);
            facultyData.profileImg = secure_url;
        }
        const newUser = yield user_model_1.UsersModel.create([userData], { session });
        if (!(newUser === null || newUser === void 0 ? void 0 : newUser.length)) {
            throw new AppErrors_1.default(500, 'Failed to create user');
        }
        facultyData.id = (_b = newUser[0]) === null || _b === void 0 ? void 0 : _b.id;
        facultyData.user = (_c = newUser[0]) === null || _c === void 0 ? void 0 : _c._id;
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
const createAdminIntoDb = (file, password, adminData) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const userData = {};
    userData.role = 'admin';
    userData.email = adminData === null || adminData === void 0 ? void 0 : adminData.email;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        userData.id = yield (0, user_utils_1.generateAdminId)();
        userData.password = password;
        if (file) {
            const path = file === null || file === void 0 ? void 0 : file.path;
            const imageName = `${userData === null || userData === void 0 ? void 0 : userData.id}${(_a = adminData === null || adminData === void 0 ? void 0 : adminData.name) === null || _a === void 0 ? void 0 : _a.firstName}`;
            const { secure_url } = yield (0, sendImageToCloudinary_1.sendImageToCloudinary)(imageName, path);
            adminData.profileImg = secure_url;
        }
        const newUser = yield user_model_1.UsersModel.create([userData], { session });
        if (!(newUser === null || newUser === void 0 ? void 0 : newUser.length)) {
            throw new AppErrors_1.default(500, 'Failed to create user');
        }
        adminData.id = (_b = newUser[0]) === null || _b === void 0 ? void 0 : _b.id;
        adminData.user = (_c = newUser[0]) === null || _c === void 0 ? void 0 : _c._id;
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
