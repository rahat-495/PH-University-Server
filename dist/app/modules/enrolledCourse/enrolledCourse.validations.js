"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enrolledCourseValidations = void 0;
const zod_1 = require("zod");
const createEnrolledCourseValidationSchema = zod_1.z.object({
    body: zod_1.z.object({ offeredCourse: zod_1.z.string() })
});
exports.enrolledCourseValidations = {
    createEnrolledCourseValidationSchema,
};
