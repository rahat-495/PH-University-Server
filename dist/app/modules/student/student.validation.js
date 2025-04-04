"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentValidations = void 0;
const zod_1 = require("zod");
const createUserNameValidationSchema = zod_1.z.object({
    firstName: zod_1.z.string().max(20).min(1).refine((value) => /^[A-Z]/.test(value), { message: "first name start with capital letter !" }),
    middleName: zod_1.z.string(),
    lastName: zod_1.z.string(),
});
const createGuardianValidationSchema = zod_1.z.object({
    fatherName: zod_1.z.string(),
    fatherOccupation: zod_1.z.string(),
    fatherContactNo: zod_1.z.string(),
    motherName: zod_1.z.string(),
    motherOccupation: zod_1.z.string(),
    motherContactNo: zod_1.z.string(),
});
const createLocalGuardianValidationSchema = zod_1.z.object({
    name: zod_1.z.string(),
    occupation: zod_1.z.string(),
    contactNo: zod_1.z.string(),
    address: zod_1.z.string(),
});
const createStudentValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().max(20).optional(),
        student: zod_1.z.object({
            name: createUserNameValidationSchema,
            gender: zod_1.z.enum(["male", "female", "other"]),
            dateOfBirth: zod_1.z.string(),
            email: zod_1.z.string().email(),
            contactNo: zod_1.z.string(),
            emergencyContactNo: zod_1.z.string(),
            presentAddress: zod_1.z.string(),
            permanentAddress: zod_1.z.string(),
            guardian: createGuardianValidationSchema,
            localGuardian: createLocalGuardianValidationSchema,
            profileImg: zod_1.z.string(),
            isActive: zod_1.z.enum(["active", "blocked"]).default("active"),
            isDeleted: zod_1.z.boolean().optional(),
            admissionSemester: zod_1.z.string(),
            academicDepartment: zod_1.z.string(),
        })
    }),
});
const updateUserNameValidationSchema = zod_1.z.object({
    firstName: zod_1.z.string().max(20).min(1).refine((value) => /^[A-Z]/.test(value), { message: "first name start with capital letter !" }).optional(),
    middleName: zod_1.z.string().optional(),
    lastName: zod_1.z.string().optional(),
});
const updateGuardianValidationSchema = zod_1.z.object({
    fatherName: zod_1.z.string().optional(),
    fatherOccupation: zod_1.z.string().optional(),
    fatherContactNo: zod_1.z.string().optional(),
    motherName: zod_1.z.string().optional(),
    motherOccupation: zod_1.z.string().optional(),
    motherContactNo: zod_1.z.string().optional(),
});
const updateLocalGuardianValidationSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    occupation: zod_1.z.string().optional(),
    contactNo: zod_1.z.string().optional(),
    address: zod_1.z.string().optional(),
});
const updateStudentValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        student: zod_1.z.object({
            name: updateUserNameValidationSchema.optional(),
            gender: zod_1.z.enum(["male", "female", "other"]).optional(),
            dateOfBirth: zod_1.z.string().optional(),
            email: zod_1.z.string().email().optional(),
            contactNo: zod_1.z.string().optional(),
            emergencyContactNo: zod_1.z.string().optional(),
            presentAddress: zod_1.z.string().optional(),
            permanentAddress: zod_1.z.string().optional(),
            guardian: updateGuardianValidationSchema.optional(),
            localGuardian: updateLocalGuardianValidationSchema.optional(),
            profileImg: zod_1.z.string().optional(),
            isActive: zod_1.z.enum(["active", "blocked"]).default("active").optional(),
            isDeleted: zod_1.z.boolean().optional().optional(),
            admissionSemester: zod_1.z.string().optional(),
            academicDepartment: zod_1.z.string().optional(),
        })
    }),
});
exports.studentValidations = {
    createStudentValidationSchema,
    updateStudentValidationSchema,
};
