"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controllers_1 = require("./user.controllers");
const validateRequest_1 = __importDefault(require("../middlewares/validateRequest"));
const student_validation_1 = require("../student/student.validation");
const faculty_validation_1 = require("../faculty/faculty.validation");
const admin_validation_1 = require("../admin/admin.validation");
const auth_1 = __importDefault(require("../middlewares/auth"));
const user_constant_1 = require("./user.constant");
const router = express_1.default.Router();
router.post('/create-student', (0, auth_1.default)(user_constant_1.userRole.admin), (0, validateRequest_1.default)(student_validation_1.studentValidations.createStudentValidationSchema), user_controllers_1.userControllers.createStudent);
router.post('/create-faculty', (0, auth_1.default)(user_constant_1.userRole.admin), (0, validateRequest_1.default)(faculty_validation_1.facultyValidations.createFacultyValidationSchema), user_controllers_1.userControllers.createFaculty);
router.post('/create-admin', (0, validateRequest_1.default)(admin_validation_1.adminValidations.createAdminValidationSchema), user_controllers_1.userControllers.createAdmin);
exports.userRoutes = router;
