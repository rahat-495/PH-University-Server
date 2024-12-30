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
const router = express_1.default.Router();
router.post('/create-student', (0, validateRequest_1.default)(student_validation_1.studentValidations.createStudentValidationSchema), user_controllers_1.userControllers.createStudent);
router.post('/create-faculty', (0, validateRequest_1.default)(faculty_validation_1.facultyValidations.createFacultyValidationSchema), user_controllers_1.userControllers.createFaculty);
exports.userRoutes = router;
