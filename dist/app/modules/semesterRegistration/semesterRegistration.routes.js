"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.semesterRegistrationRoutes = void 0;
const express_1 = require("express");
const semesterRegistration_controllers_1 = require("./semesterRegistration.controllers");
const validateRequest_1 = __importDefault(require("../middlewares/validateRequest"));
const semesterRegistration_validation_1 = require("./semesterRegistration.validation");
const router = (0, express_1.Router)();
router.get('/', semesterRegistration_controllers_1.semesterRegistrationControllers.getAllSemesterRegistration);
router.get('/:id', semesterRegistration_controllers_1.semesterRegistrationControllers.getSingleSemesterRegistration);
router.delete('/:id', semesterRegistration_controllers_1.semesterRegistrationControllers.deleteSemesterRegistration);
router.patch('/:id', (0, validateRequest_1.default)(semesterRegistration_validation_1.semesterRegistrationValidations.updateSemesterRegistrationValidationSchema), semesterRegistration_controllers_1.semesterRegistrationControllers.updateSemesterRegistration);
router.post('/create-semester-registration', (0, validateRequest_1.default)(semesterRegistration_validation_1.semesterRegistrationValidations.createSemesterRegistrationValidationSchema), semesterRegistration_controllers_1.semesterRegistrationControllers.createSemesterRegistration);
exports.semesterRegistrationRoutes = router;
