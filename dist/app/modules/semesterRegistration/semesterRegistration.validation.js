"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.semesterRegistrationValidations = void 0;
const zod_1 = require("zod");
const createSemesterRegistrationValidationSchema = zod_1.z.object({
    body: zod_1.z.object({}),
});
const updateSemesterRegistrationValidationSchema = zod_1.z.object({
    body: zod_1.z.object({}),
});
exports.semesterRegistrationValidations = {
    createSemesterRegistrationValidationSchema,
    updateSemesterRegistrationValidationSchema,
};
