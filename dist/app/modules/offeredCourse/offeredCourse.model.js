"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.offeredCoursesModel = void 0;
const mongoose_1 = require("mongoose");
const offeredCourseSchema = new mongoose_1.Schema({});
exports.offeredCoursesModel = (0, mongoose_1.model)("offeredCourse", offeredCourseSchema);
