"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const academicSemesterName = ["Autumn", "Summer", "Fall"];
const academicSemesterCode = ["01", "02", "03"];
const academicSemesterSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        enum: academicSemesterName,
    },
    year: {
        type: Date,
        required: true,
    },
    code: {
        type: String,
        required: true,
        enum: academicSemesterCode,
    },
    startMonth: {
        enum: months,
        type: String,
        required: true,
    },
    endMonth: {
        enum: months,
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
const academicSemestersModel = (0, mongoose_1.model)("academicSemester", academicSemesterSchema);
exports.default = academicSemestersModel;
