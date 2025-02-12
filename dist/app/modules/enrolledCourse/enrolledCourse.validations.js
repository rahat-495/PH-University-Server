"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enrolledCourseValidations = void 0;
const zod_1 = require("zod");
const createEnrolledCourseValidationSchema = zod_1.z.object({
    body: zod_1.z.object({ offeredCourse: zod_1.z.string() })
});
const updateEnrolledCourseMarksValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        semesterRegistration: zod_1.z.string(),
        offeredCourse: zod_1.z.string(),
        student: zod_1.z.string(),
        courseMarks: zod_1.z.object({
            classTest1: zod_1.z.number(),
            midTerm: zod_1.z.number(),
            classTest2: zod_1.z.number(),
            finelTerm: zod_1.z.number(),
        })
    })
});
exports.enrolledCourseValidations = {
    createEnrolledCourseValidationSchema,
    updateEnrolledCourseMarksValidationSchema,
};
