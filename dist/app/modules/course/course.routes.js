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
router.get("/", course_controllers_1.courseControllers.getAllCourses);
router.get("/:id", course_controllers_1.courseControllers.getSingleCourse);
router.delete("/:id", course_controllers_1.courseControllers.deleteCourse);
router.put('/:courseId/assign-faculties', course_controllers_1.courseControllers.assignFaculties);
router.patch("/:id", (0, validateRequest_1.default)(course_validation_1.courseValidations.updateCourseValidation), course_controllers_1.courseControllers.updateCourse);
router.post("/create-course", (0, validateRequest_1.default)(course_validation_1.courseValidations.createCourseValidation), course_controllers_1.courseControllers.createCourse);
exports.courseRoutes = router;
