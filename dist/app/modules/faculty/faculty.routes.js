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
const router = express_1.default.Router();
router.get('/', faculty_controllers_1.facultyControllers.getAlFaculties);
router.get('/:facultyId', faculty_controllers_1.facultyControllers.getSpecifiFaculty);
router.patch('/:facultyId', (0, validateRequest_1.default)(faculty_validation_1.facultyValidations.updateFacultyValidationSchema), faculty_controllers_1.facultyControllers.updateFaculty);
router.delete('/:facultyId', faculty_controllers_1.facultyControllers.deleteFaculty);
exports.facultyRoutes = router;
