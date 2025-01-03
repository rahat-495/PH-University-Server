"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseRoutes = void 0;
const express_1 = require("express");
const course_controllers_1 = require("./course.controllers");
const validateRequest_1 = __importDefault(require("../middlewares/validateRequest"));
const course_validation_1 = require("./course.validation");
const router = (0, express_1.Router)();
router.post("/create", (0, validateRequest_1.default)(course_validation_1.courseValidations.createCourseValidation), course_controllers_1.courseControllers.createCourse);
exports.courseRoutes = router;
