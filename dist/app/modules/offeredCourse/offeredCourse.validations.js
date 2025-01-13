"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.offeredCourseValidations = void 0;
const zod_1 = require("zod");
const offeredCourse_constants_1 = require("./offeredCourse.constants");
const createOfferedCourseValidation = zod_1.z.object({
    body: zod_1.z.object({
        semesterRegistration: zod_1.z.string(),
        academicSemester: zod_1.z.string(),
        academicFaculty: zod_1.z.string(),
        academicDepartment: zod_1.z.string(),
        course: zod_1.z.string(),
        faculty: zod_1.z.string(),
        maxCapacity: zod_1.z.number(),
        section: zod_1.z.number(),
        days: zod_1.z.enum([...offeredCourse_constants_1.Days]),
        startTime: zod_1.z.string(),
        endTime: zod_1.z.string(),
    })
});
const updateOfferedCourseValidation = zod_1.z.object({
    body: zod_1.z.object({
        faculty: zod_1.z.string().optional(),
        days: zod_1.z.enum([...offeredCourse_constants_1.Days]).optional(),
        maxCapacity: zod_1.z.number().optional(),
        startTime: zod_1.z.string().optional(),
        endTime: zod_1.z.string().optional(),
    })
});
exports.offeredCourseValidations = {
    createOfferedCourseValidation,
    updateOfferedCourseValidation,
};
