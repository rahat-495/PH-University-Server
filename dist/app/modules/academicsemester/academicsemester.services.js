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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicSemesterServices = void 0;
const academicSemester_constant_1 = require("./academicSemester.constant");
const academicSemester_model_1 = __importDefault(require("./academicSemester.model"));
const createacademicSemesterIntoDb = (data) => __awaiter(void 0, void 0, void 0, function* () {
    if ((data === null || data === void 0 ? void 0 : data.name) && (data === null || data === void 0 ? void 0 : data.code) && academicSemester_constant_1.academicSemesterNameCodeMapper[data === null || data === void 0 ? void 0 : data.name] !== (data === null || data === void 0 ? void 0 : data.code)) {
        throw new Error("Invalid Semester Code !");
    }
    const newAcademicSemester = yield academicSemester_model_1.default.create(data);
    return newAcademicSemester;
});
const getAllAcademicSemesterFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const academicSemesters = yield academicSemester_model_1.default.find();
    return academicSemesters;
});
const getAcademicSemesterFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const academicSemester = yield academicSemester_model_1.default.findById(id);
    return academicSemester;
});
const updateAcademicSemesterIntoDb = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    if ((data === null || data === void 0 ? void 0 : data.name) && (data === null || data === void 0 ? void 0 : data.code) && academicSemester_constant_1.academicSemesterNameCodeMapper[data === null || data === void 0 ? void 0 : data.name] !== (data === null || data === void 0 ? void 0 : data.code)) {
        throw new Error("Invalid Semester Code !");
    }
    const academicSemester = yield academicSemester_model_1.default.updateOne({ _id: id }, { $set: data });
    return academicSemester;
});
exports.academicSemesterServices = {
    getAcademicSemesterFromDb,
    createacademicSemesterIntoDb,
    getAllAcademicSemesterFromDb,
    updateAcademicSemesterIntoDb,
};
