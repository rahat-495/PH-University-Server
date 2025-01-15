"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.offeredCourseValidations = void 0;
const zod_1 = require("zod");
const offeredCourse_constants_1 = require("./offeredCourse.constants");
const createOfferedCourseValidation = zod_1.z.object({
    body: zod_1.z.object({
        semesterRegistration: zod_1.z.string(),
        academicFaculty: zod_1.z.string(),
        academicDepartment: zod_1.z.string(),
        course: zod_1.z.string(),
        faculty: zod_1.z.string(),
        maxCapacity: zod_1.z.number(),
        section: zod_1.z.number(),
        days: zod_1.z.array(zod_1.z.enum([...offeredCourse_constants_1.Days])),
        startTime: zod_1.z.string().refine((time) => {
            const regex = /^(?:[01]\d|2[0-3])\s*:\s*[0-5]\d$/;
            return regex.test(time);
        }, {
            message: "Invalid Time Format Expected 'HH:MM' !",
        }),
        endTime: zod_1.z.string().refine((time) => {
            const regex = /^(?:[01]\d|2[0-3])\s*:\s*[0-5]\d$/;
            return regex.test(time);
        }, {
            message: "Invalid Time Format Expected 'HH:MM' !"
        }),
    }).refine((body) => {
        const start = new Date(`2007-03-05T${body.startTime}:00`);
        const end = new Date(`2007-03-05T${body.endTime}:00`);
        return end > start;
    }, {
        message: `Start time should be before End Time !`
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
