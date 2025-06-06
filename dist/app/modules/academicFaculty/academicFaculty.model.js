"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicFacultysModel = void 0;
const mongoose_1 = require("mongoose");
const academicFacultySchema = new mongoose_1.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, "Enter the name !"],
    }
}, {
    timestamps: true,
});
exports.academicFacultysModel = (0, mongoose_1.model)("academicFaculty", academicFacultySchema);
