"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enrolledCoursesModel = void 0;
const mongoose_1 = require("mongoose");
const enrolledCourse_constand_1 = require("./enrolledCourse.constand");
const courseMarksSchema = new mongoose_1.Schema({
    classTest1: {
        type: Number,
        min: 0,
        max: 10,
        default: 0,
    },
    midTerm: {
        type: Number,
        min: 0,
        max: 30,
        default: 0,
    },
    classTest2: {
        type: Number,
        min: 0,
        max: 10,
        default: 0,
    },
    finelTerm: {
        type: Number,
        min: 0,
        max: 50,
        default: 0,
    },
});
const enrolledCourseSchema = new mongoose_1.Schema({
    academicDepartment: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "academicDepartment",
    },
    offeredCourse: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "offeredCourse",
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
    student: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "student",
    },
    courseMarks: {
        type: courseMarksSchema,
        default: {},
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
    isEnrolled: {
        type: Boolean,
        default: false,
    },
    grade: {
        type: String,
        enum: enrolledCourse_constand_1.grade,
        default: "NA",
    },
    gradePoints: {
        type: Number,
        min: 0,
        max: 4,
        default: 0,
    },
}, {
    timestamps: true,
});
exports.enrolledCoursesModel = (0, mongoose_1.model)("enrolledCourse", enrolledCourseSchema);
