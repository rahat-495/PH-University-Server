"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.semesterRegistrationsModel = void 0;
const mongoose_1 = require("mongoose");
const semesterRegistration_constant_1 = require("./semesterRegistration.constant");
const semesterRegistrationSchema = new mongoose_1.Schema({
    academicSemester: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "academicSemester",
        required: true,
        unique: true,
    },
    status: {
        type: String,
        default: "UPCOMING",
        enum: semesterRegistration_constant_1.semesterRegistrationStatus,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    minCredit: {
        type: Number,
        default: 3,
    },
    maxCredit: {
        type: Number,
        default: 15,
    },
}, {
    timestamps: true,
});
exports.semesterRegistrationsModel = (0, mongoose_1.model)("semesterRegistration", semesterRegistrationSchema);
