"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicSemesterRoutes = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../middlewares/validateRequest"));
const academicsemester_controllers_1 = require("./academicsemester.controllers");
const academicSemester_validation_1 = require("./academicSemester.validation");
const auth_1 = __importDefault(require("../middlewares/auth"));
const router = (0, express_1.Router)();
router.post('/create-academic-semester', (0, validateRequest_1.default)(academicSemester_validation_1.academicSemesterValidations.createAcademicSemesterValidationSchema), academicsemester_controllers_1.academicSemesterControllers.createAcademicSemester);
router.get('/get-all-academic-semester', (0, auth_1.default)('admin'), academicsemester_controllers_1.academicSemesterControllers.getAllAcademicSemester);
router.get('/get-academic-semester/:semesterId', academicsemester_controllers_1.academicSemesterControllers.getAcademicSemester);
router.patch('/update-academic-semester/:semesterId', (0, validateRequest_1.default)(academicSemester_validation_1.academicSemesterValidations.updateAcademicSemesterValidationSchema), academicsemester_controllers_1.academicSemesterControllers.updateAcademicSemester);
exports.academicSemesterRoutes = router;
