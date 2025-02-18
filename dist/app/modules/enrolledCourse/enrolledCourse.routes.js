"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.enrolledCourseRoutes = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../middlewares/validateRequest"));
const enrolledCourse_validations_1 = require("./enrolledCourse.validations");
const enrolledCourse_controllers_1 = require("./enrolledCourse.controllers");
const auth_1 = __importDefault(require("../middlewares/auth"));
const router = (0, express_1.Router)();
router.get('/my-enrolled-courses', (0, auth_1.default)("student"), enrolledCourse_controllers_1.enrolledCourseControllers.getMyEnrolledCourses);
router.post('/create-enrolled-course', (0, auth_1.default)("student"), (0, validateRequest_1.default)(enrolledCourse_validations_1.enrolledCourseValidations.createEnrolledCourseValidationSchema), enrolledCourse_controllers_1.enrolledCourseControllers.createEnrolledCourse);
router.post('/update-enrolled-course-marks', (0, auth_1.default)("faculty"), (0, validateRequest_1.default)(enrolledCourse_validations_1.enrolledCourseValidations.updateEnrolledCourseMarksValidationSchema), enrolledCourse_controllers_1.enrolledCourseControllers.updateEnrolledCourseMarks);
exports.enrolledCourseRoutes = router;
