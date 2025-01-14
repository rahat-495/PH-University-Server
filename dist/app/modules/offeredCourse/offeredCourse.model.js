"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.offeredCoursesModel = void 0;
const mongoose_1 = require("mongoose");
const offeredCourse_constants_1 = require("./offeredCourse.constants");
const offeredCourseSchema = new mongoose_1.Schema({
    academicDepartment: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "academicDepartment",
    },
    academicFaculty: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "academicFaculty",
    },
    academicSemester: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "academicSemester",
    },
    semesterRegistration: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "semesterRegistration",
    },
    course: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "course",
    },
    faculty: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "faculty",
    },
    maxCapacity: {
        type: Number,
        default: 10,
        required: true,
    },
    section: {
        type: Number,
        required: true,
    },
    days: [{
            type: String,
            required: true,
            enum: offeredCourse_constants_1.Days,
        }],
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
exports.offeredCoursesModel = (0, mongoose_1.model)("offeredCourse", offeredCourseSchema);
