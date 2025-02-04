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
const user_validation_1 = require("./user.validation");
const sendImageToCloudinary_1 = require("../../utils/sendImageToCloudinary");
const router = express_1.default.Router();
router.get('/me', (0, auth_1.default)('student', 'faculty', 'admin'), user_controllers_1.userControllers.getMe);
router.post('/change-status/:id', (0, auth_1.default)('admin'), (0, validateRequest_1.default)(user_validation_1.userValidation.changeStatusValidationSchema), user_controllers_1.userControllers.changeStatus);
router.post('/create-admin', sendImageToCloudinary_1.upload.single("file"), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, (0, validateRequest_1.default)(admin_validation_1.adminValidations.createAdminValidationSchema), user_controllers_1.userControllers.createAdmin);
router.post('/create-student', sendImageToCloudinary_1.upload.single("file"), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, (0, validateRequest_1.default)(student_validation_1.studentValidations.createStudentValidationSchema), (0, auth_1.default)('admin'), user_controllers_1.userControllers.createStudent);
router.post('/create-faculty', sendImageToCloudinary_1.upload.single("file"), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, (0, auth_1.default)('admin'), (0, validateRequest_1.default)(faculty_validation_1.facultyValidations.createFacultyValidationSchema), user_controllers_1.userControllers.createFaculty);
exports.userRoutes = router;
