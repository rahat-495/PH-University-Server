"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicSemesterValidations = void 0;
const zod_1 = require("zod");
const academicSemester_constant_1 = require("./academicSemester.constant");
const createAcademicSemesterValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.enum([...academicSemester_constant_1.academicSemesterName]),
        year: zod_1.z.string(),
        code: zod_1.z.enum([...academicSemester_constant_1.academicSemesterCode]),
        startMonth: zod_1.z.enum([...academicSemester_constant_1.months]),
        endMonth: zod_1.z.enum([...academicSemester_constant_1.months]),
    }),
});
const updateAcademicSemesterValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.enum([...academicSemester_constant_1.academicSemesterName]).optional(),
        year: zod_1.z.string().optional(),
        code: zod_1.z.enum([...academicSemester_constant_1.academicSemesterCode]).optional(),
        startMonth: zod_1.z.enum([...academicSemester_constant_1.months]).optional(),
        endMonth: zod_1.z.enum([...academicSemester_constant_1.months]).optional(),
    }),
});
exports.academicSemesterValidations = {
    createAcademicSemesterValidationSchema,
    updateAcademicSemesterValidationSchema,
};
