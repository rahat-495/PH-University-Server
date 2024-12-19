"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicFacultyRoutes = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../middlewares/validateRequest"));
const academicFaculty_validation_1 = require("./academicFaculty.validation");
const academicFaculty_controllers_1 = require("./academicFaculty.controllers");
const router = (0, express_1.Router)();
router.get('/:id', academicFaculty_controllers_1.academicFacultyControllers.getAcademicFaculty);
router.get('/', academicFaculty_controllers_1.academicFacultyControllers.getAllAcademicFaculties);
router.patch('/:id', (0, validateRequest_1.default)(academicFaculty_validation_1.academicFacultyValidation.academicFacultyValidationSchema), academicFaculty_controllers_1.academicFacultyControllers.updateAcademicFaculty);
router.post('/create-academic-faculty', (0, validateRequest_1.default)(academicFaculty_validation_1.academicFacultyValidation.academicFacultyValidationSchema), academicFaculty_controllers_1.academicFacultyControllers.createAcademicFacultyIntoDb);
exports.academicFacultyRoutes = router;
