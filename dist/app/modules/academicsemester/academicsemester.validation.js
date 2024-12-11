"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicSemesterValidations = void 0;
const zod_1 = require("zod");
const academicSemester_constant_1 = require("./academicSemester.constant");
const createAcademicSemesterValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.enum([...academicSemester_constant_1.academicSemesterName]),
        year: zod_1.z.date(),
        code: zod_1.z.enum([...academicSemester_constant_1.academicSemesterCode]),
        startMonth: zod_1.z.enum([...academicSemester_constant_1.months]),
        endMonth: zod_1.z.enum([...academicSemester_constant_1.months]),
    }),
});
exports.academicSemesterValidations = {
    createAcademicSemesterValidationSchema,
};
