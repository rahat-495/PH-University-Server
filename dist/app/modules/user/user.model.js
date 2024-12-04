"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModel = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    needsPasswordChange: {
        type: Boolean,
        default: true,
    },
    status: {
        type: String,
        required: true,
        default: "in-progress",
        enum: ["in-progress", "blocked"],
    },
    role: {
        type: String,
        required: true,
        enum: ["admin", "student", "faculty"],
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
exports.UsersModel = (0, mongoose_1.model)('user', userSchema);
