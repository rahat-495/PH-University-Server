"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.coursesModel = void 0;
const mongoose_1 = require("mongoose");
const preRequisiteCoursesSchema = new mongoose_1.Schema({
    course: { type: mongoose_1.Schema.Types.ObjectId, ref: "course" },
    isDeleter: { type: Boolean, default: false },
});
const courseSchema = new mongoose_1.Schema({
    title: {
        trim: true,
        type: String,
        unique: true,
        required: [true, "Title is required !"],
    },
    prefix: {
        trim: true,
        type: String,
        required: [true, "prefix is required !"],
    },
    code: {
        trim: true,
        type: Number,
        required: [true, "code is required !"],
    },
    credits: {
        trim: true,
        type: Number,
        required: [true, "credits is required !"],
    },
    preRequisiteCourses: [preRequisiteCoursesSchema],
});
exports.coursesModel = (0, mongoose_1.model)("course", courseSchema);
