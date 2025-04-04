"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const student_controllers_1 = require("./student.controllers");
const validateRequest_1 = __importDefault(require("../middlewares/validateRequest"));
const student_validation_1 = require("./student.validation");
const auth_1 = __importDefault(require("../middlewares/auth"));
const user_constant_1 = require("../user/user.constant");
const router = express_1.default.Router();
router.get('/', student_controllers_1.studentControllers.getAllStudents);
router.get('/:id', (0, auth_1.default)(user_constant_1.userRole.admin, user_constant_1.userRole.faculty), student_controllers_1.studentControllers.getSpecificStudent);
router.patch('/:id', (0, validateRequest_1.default)(student_validation_1.studentValidations.updateStudentValidationSchema), student_controllers_1.studentControllers.updateAStudent);
router.delete('/:id', student_controllers_1.studentControllers.deleteAStudent);
exports.studentRoutes = router;
