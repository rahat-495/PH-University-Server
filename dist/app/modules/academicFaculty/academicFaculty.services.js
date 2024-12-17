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
exports.studentServices = void 0;
const academicFaculty_model_1 = require("./academicFaculty.model");
const createAacademicFacultyIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicFaculty_model_1.academicFacultysModel.create(payload);
    return result;
});
const getAllAcademicFacultiesFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicFaculty_model_1.academicFacultysModel.find();
    return result;
});
const getSpecificAcademicFacultyFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicFaculty_model_1.academicFacultysModel.findById(id);
    return result;
});
const updateAAcademicFacultyIntoDb = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicFaculty_model_1.academicFacultysModel.updateOne({ _id: id }, { $set: payload });
    return result;
});
exports.studentServices = {
    createAacademicFacultyIntoDb,
    updateAAcademicFacultyIntoDb,
    getAllAcademicFacultiesFromDb,
    getSpecificAcademicFacultyFromDb,
};
