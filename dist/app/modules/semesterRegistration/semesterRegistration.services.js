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
const AppErrors_1 = __importDefault(require("../../errors/AppErrors"));
const semesterRegistration_constant_1 = require("./semesterRegistration.constant");
const semesterRegistration_model_1 = require("./semesterRegistration.model");
const createSemesterRegistrationIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isAnySemesterUpcomingOrOngoing = yield semesterRegistration_model_1.semesterRegistrationsModel.findOne({ $or: [{ status: semesterRegistration_constant_1.registrationStatus.UPCOMING }, { status: semesterRegistration_constant_1.registrationStatus.ONGOING }] });
    if (isAnySemesterUpcomingOrOngoing) {
        throw new AppErrors_1.default(400, `There is already a ${isAnySemesterUpcomingOrOngoing.status} registrered semester !`);
    }
    const result = yield semesterRegistration_model_1.semesterRegistrationsModel.create(payload);
    return result;
});
const getAllSemesterRegistrationFromDb = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const semesterRegistratoinQuery = new QueryBuilder_1.default(semesterRegistration_model_1.semesterRegistrationsModel.find().populate("academicSemester"), query).filter().sort().paginate().fields();
    const result = yield semesterRegistratoinQuery.modelQuery;
    return result;
});
const getSingleSemesterRegistrationFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield semesterRegistration_model_1.semesterRegistrationsModel.findById(id).populate("academicSemester");
    return result;
});
const updateSemesterRegistrationIntoDb = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isSemesterRegistrationAxist = yield semesterRegistration_model_1.semesterRegistrationsModel.findById(id);
    if (!isSemesterRegistrationAxist) {
        throw new AppErrors_1.default(404, "Semester registration not found !");
    }
    const currentSemesterStatus = isSemesterRegistrationAxist === null || isSemesterRegistrationAxist === void 0 ? void 0 : isSemesterRegistrationAxist.status;
    const requestedStatus = payload === null || payload === void 0 ? void 0 : payload.status;
    if (currentSemesterStatus === "ENDED") {
        throw new AppErrors_1.default(400, `This semeter already ${currentSemesterStatus} !`);
    }
    if (currentSemesterStatus === "UPCOMING" && requestedStatus === "ENDED") {
        throw new AppErrors_1.default(400, `You can't directly change status from ${currentSemesterStatus} to ${requestedStatus}`);
    }
    if (currentSemesterStatus === "ONGOING" && requestedStatus === "UPCOMING") {
        throw new AppErrors_1.default(400, `You can't directly change status from ${currentSemesterStatus} to ${requestedStatus}`);
    }
    const result = yield semesterRegistration_model_1.semesterRegistrationsModel.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
    return result;
});
exports.semesterRegistrationServices = {
    createSemesterRegistrationIntoDb,
    getAllSemesterRegistrationFromDb,
    updateSemesterRegistrationIntoDb,
    getSingleSemesterRegistrationFromDb,
};
