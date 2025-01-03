"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseRoutes = void 0;
const express_1 = require("express");
const course_controllers_1 = require("./course.controllers");
const router = (0, express_1.Router)();
router.post("/create", course_controllers_1.courseControllers.createCourse);
exports.courseRoutes = router;
