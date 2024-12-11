"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicSemesterValidations = void 0;
const zod_1 = require("zod");
const createAcademicSemesterValidationSchema = zod_1.z.object({
    body: zod_1.z.object({}),
});
exports.academicSemesterValidations = {
    createAcademicSemesterValidationSchema,
};
