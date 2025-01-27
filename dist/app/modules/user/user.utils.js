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
exports.generateAdminId = exports.generateFacultyId = exports.generateStudentId = void 0;
const user_model_1 = require("./user.model");
const findLastStudentId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastStudentId = yield user_model_1.UsersModel.findOne({ role: "student" }, { id: 1, _id: 0 }).sort({ createdAt: -1 }).lean();
    return (lastStudentId === null || lastStudentId === void 0 ? void 0 : lastStudentId.id) ? lastStudentId.id : undefined;
});
const generateStudentId = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    let currentId = (0).toString();
    const lastUserId = yield findLastStudentId();
    const lastStudentyear = lastUserId === null || lastUserId === void 0 ? void 0 : lastUserId.substring(0, 4);
    const lastStudentSemesterCode = lastUserId === null || lastUserId === void 0 ? void 0 : lastUserId.substring(4, 6);
    const currnetYear = payload === null || payload === void 0 ? void 0 : payload.year;
    const currnetCode = payload === null || payload === void 0 ? void 0 : payload.code;
    if (lastUserId && lastStudentSemesterCode === currnetCode && lastStudentyear === currnetYear) {
        currentId = lastUserId.substring(6);
    }
    let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
    incrementId = `${payload === null || payload === void 0 ? void 0 : payload.year}${payload === null || payload === void 0 ? void 0 : payload.code}${incrementId}`;
    return incrementId;
});
exports.generateStudentId = generateStudentId;
const findLastFacultytId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastStudentId = yield user_model_1.UsersModel.findOne({ role: "faculty" }, { id: 1, _id: 0 }).sort({ createdAt: -1 }).lean();
    return (lastStudentId === null || lastStudentId === void 0 ? void 0 : lastStudentId.id) ? lastStudentId.id : undefined;
});
const generateFacultyId = () => __awaiter(void 0, void 0, void 0, function* () {
    let currentId = (0).toString();
    const lastUserId = yield findLastFacultytId();
    if (lastUserId) {
        currentId = lastUserId.substring(2);
    }
    let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");
    incrementId = `F-${incrementId}`;
    return incrementId;
});
exports.generateFacultyId = generateFacultyId;
const findLastAdmintId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastStudentId = yield user_model_1.UsersModel.findOne({ role: "admin" }, { id: 1, _id: 0 }).sort({ createdAt: -1 }).lean();
    return (lastStudentId === null || lastStudentId === void 0 ? void 0 : lastStudentId.id) ? lastStudentId.id : undefined;
});
const generateAdminId = () => __awaiter(void 0, void 0, void 0, function* () {
    let currentId = (0).toString();
    const lastUserId = yield findLastAdmintId();
    if (lastUserId) {
        currentId = lastUserId.substring(2);
    }
    let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");
    incrementId = `A-${incrementId}`;
    return incrementId;
});
exports.generateAdminId = generateAdminId;
