"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.facultyValidations = void 0;
const zod_1 = require("zod");
const createUserNameValidationSchema = zod_1.z.object({
    firstName: zod_1.z.string().max(20).min(1).refine((value) => /^[A-Z]/.test(value), { message: "first name start with capital letter !" }),
    middleName: zod_1.z.string(),
    lastName: zod_1.z.string(),
});
const createFacultyValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().max(20),
        faculty: zod_1.z.object({
            name: createUserNameValidationSchema,
            gender: zod_1.z.enum(["male", "female", "other"]),
            dateOfBirth: zod_1.z.string(),
            email: zod_1.z.string().email(),
            contactNo: zod_1.z.string(),
            emergencyContactNo: zod_1.z.string(),
            presentAddress: zod_1.z.string(),
            permanentAddress: zod_1.z.string(),
            profileImg: zod_1.z.string(),
            isActive: zod_1.z.enum(["active", "blocked"]).default("active"),
            isDeleted: zod_1.z.boolean().optional(),
            academicDepartment: zod_1.z.string(),
            academicFaculty: zod_1.z.string(),
            designation: zod_1.z.string(),
        })
    }),
});
const updateUserNameValidationSchema = zod_1.z.object({
    firstName: zod_1.z.string().max(20).min(1).refine((value) => /^[A-Z]/.test(value), { message: "first name start with capital letter !" }).optional(),
    middleName: zod_1.z.string().optional(),
    lastName: zod_1.z.string().optional(),
});
const updateFacultyValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        faculty: zod_1.z.object({
            name: updateUserNameValidationSchema.optional(),
            gender: zod_1.z.enum(["male", "female", "other"]).optional(),
            dateOfBirth: zod_1.z.string().optional(),
            email: zod_1.z.string().email().optional(),
            contactNo: zod_1.z.string().optional(),
            emergencyContactNo: zod_1.z.string().optional(),
            presentAddress: zod_1.z.string().optional(),
            permanentAddress: zod_1.z.string().optional(),
            profileImg: zod_1.z.string().optional(),
            isActive: zod_1.z.enum(["active", "blocked"]).default("active").optional(),
            isDeleted: zod_1.z.boolean().optional().optional(),
            academicDepartment: zod_1.z.string().optional(),
            academicFaculty: zod_1.z.string().optional(),
            designation: zod_1.z.string().optional(),
        })
    }),
});
exports.facultyValidations = {
    createFacultyValidationSchema,
    updateFacultyValidationSchema,
};
