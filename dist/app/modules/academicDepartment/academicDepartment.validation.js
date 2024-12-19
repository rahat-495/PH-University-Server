"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicDepartmentValidations = void 0;
const zod_1 = require("zod");
const createAcademicDepartmentValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ invalid_type_error: "Academic Department name must be string !", required_error: "name is required !" }),
        academicFaculty: zod_1.z.string({ invalid_type_error: "Academic faculty must be string !", required_error: "academic faculty is required !" }),
    })
});
const updateAcademicDepartmentValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ invalid_type_error: "Academic Department name must be string !", required_error: "name is required !" }),
        academicFaculty: zod_1.z.string({ invalid_type_error: "Academic faculty must be string !", required_error: "academic faculty is required !" }),
    })
});
exports.academicDepartmentValidations = {
    createAcademicDepartmentValidationSchema,
    updateAcademicDepartmentValidationSchema,
};
