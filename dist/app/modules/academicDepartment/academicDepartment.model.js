"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicDepartmentsModel = void 0;
const mongoose_1 = require("mongoose");
const academicDepartmentSchema = new mongoose_1.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, "Enter the name !"],
    },
    academicFaculty: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "academicFaculty",
        required: [true, "Enter the academic faculty id !"],
    },
}, {
    timestamps: true,
});
exports.academicDepartmentsModel = (0, mongoose_1.model)("academicDepartment", academicDepartmentSchema);
