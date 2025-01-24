"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.facultyRoutes = void 0;
const express_1 = __importDefault(require("express"));
const faculty_controllers_1 = require("./faculty.controllers");
const validateRequest_1 = __importDefault(require("../middlewares/validateRequest"));
const faculty_validation_1 = require("./faculty.validation");
const auth_1 = __importDefault(require("../middlewares/auth"));
const user_constant_1 = require("../user/user.constant");
const router = express_1.default.Router();
router.delete('/:id', faculty_controllers_1.facultyControllers.deleteFaculty);
router.get('/:id', faculty_controllers_1.facultyControllers.getSpecifiFaculty);
router.get('/', (0, auth_1.default)(user_constant_1.userRole.admin, user_constant_1.userRole.faculty), faculty_controllers_1.facultyControllers.getAlFaculties);
router.patch('/:id', (0, validateRequest_1.default)(faculty_validation_1.facultyValidations.updateFacultyValidationSchema), faculty_controllers_1.facultyControllers.updateFaculty);
exports.facultyRoutes = router;
