"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicDepartmentServices = void 0;
const academicDepartment_model_1 = require("./academicDepartment.model");
const createAacademicDepartmentIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicDepartment_model_1.academicDepartmentsModel.create(payload);
    return result;
});
const getAllAcademicDepartmentFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicDepartment_model_1.academicDepartmentsModel.find().populate("academicFaculty");
    return result;
});
const getSpecificAcademicDepartmentFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicDepartment_model_1.academicDepartmentsModel.findById(id).populate("academicFaculty");
    return result;
});
const updateAcademicDepartmentIntoDb = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicDepartment_model_1.academicDepartmentsModel.updateOne({ _id: id }, { $set: payload });
    return result;
});
exports.academicDepartmentServices = {
    updateAcademicDepartmentIntoDb,
    createAacademicDepartmentIntoDb,
    getAllAcademicDepartmentFromDb,
    getSpecificAcademicDepartmentFromDb,
};
