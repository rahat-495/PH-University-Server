"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const academicSemester_constant_1 = require("./academicSemester.constant");
const academicSemesterSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        enum: academicSemester_constant_1.academicSemesterName,
    },
    year: {
        type: Date,
        required: true,
    },
    code: {
        type: String,
        required: true,
        enum: academicSemester_constant_1.academicSemesterCode,
    },
    startMonth: {
        enum: academicSemester_constant_1.months,
        type: String,
        required: true,
    },
    endMonth: {
        enum: academicSemester_constant_1.months,
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
const academicSemestersModel = (0, mongoose_1.model)("academicSemester", academicSemesterSchema);
exports.default = academicSemestersModel;
