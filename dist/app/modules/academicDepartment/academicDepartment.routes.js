"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicDepartmentRoutes = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../middlewares/validateRequest"));
const academicDepartment_controllers_1 = require("./academicDepartment.controllers");
const academicDepartment_validation_1 = require("./academicDepartment.validation");
const router = (0, express_1.Router)();
router.get('/:id', academicDepartment_controllers_1.academicDepartmentControllers.getAcademicDepartment);
router.get('/', academicDepartment_controllers_1.academicDepartmentControllers.getAllAcademicDepartment);
router.patch('/:id', (0, validateRequest_1.default)(academicDepartment_validation_1.academicDepartmentValidations.updateAcademicDepartmentValidationSchema), academicDepartment_controllers_1.academicDepartmentControllers.updateAcademicDepartment);
router.post('/create-academic-department', (0, validateRequest_1.default)(academicDepartment_validation_1.academicDepartmentValidations.createAcademicDepartmentValidationSchema), academicDepartment_controllers_1.academicDepartmentControllers.createAcademicDepartmentIntoDb);
exports.academicDepartmentRoutes = router;
