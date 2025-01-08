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
exports.semesterRegistrationServices = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const semesterRegistration_model_1 = require("./semesterRegistration.model");
const createSemesterRegistrationIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield semesterRegistration_model_1.semesterRegistrationsModel.create(payload);
    return result;
});
const getAllSemesterRegistrationFromDb = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const courseQuery = new QueryBuilder_1.default(semesterRegistration_model_1.semesterRegistrationsModel.find().populate("academicSemester"), query).filter().sort().paginate().fields();
    const result = yield courseQuery.modelQuery;
    return result;
});
const getSingleSemesterRegistrationFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield semesterRegistration_model_1.semesterRegistrationsModel.findById(id).populate("academicSemester");
    return result;
});
const updateSemesterRegistrationIntoDb = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    return {};
});
exports.semesterRegistrationServices = {
    createSemesterRegistrationIntoDb,
    getAllSemesterRegistrationFromDb,
    updateSemesterRegistrationIntoDb,
    getSingleSemesterRegistrationFromDb,
};
