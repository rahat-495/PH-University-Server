"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const nameSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required!"],
    },
    middleName: {
        type: String,
        required: false,
    },
    lastName: {
        type: String,
        required: [true, "Last name is required!"],
    },
});
const studentSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: [true, "ID is required !"],
    },
    user: {
        ref: 'user',
        unique: true,
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, "User Id is required !"],
    },
    name: {
        type: nameSchema,
        required: [true, "Name is required !"],
    },
});
