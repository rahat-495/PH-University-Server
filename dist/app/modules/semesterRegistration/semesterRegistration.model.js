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
exports.semesterRegistrationsModel = void 0;
const mongoose_1 = require("mongoose");
const semesterRegistration_constant_1 = require("./semesterRegistration.constant");
const AppErrors_1 = __importDefault(require("../../errors/AppErrors"));
const academicsemester_model_1 = __importDefault(require("../academicsemester/academicsemester.model"));
const semesterRegistrationSchema = new mongoose_1.Schema({
    academicSemester: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "academicSemester",
        required: true,
        unique: true,
    },
    status: {
        type: String,
        default: "UPCOMING",
        enum: semesterRegistration_constant_1.semesterRegistrationStatus,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    minCredit: {
        type: Number,
        default: 3,
    },
    maxCredit: {
        type: Number,
        default: 15,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true,
});
semesterRegistrationSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const payload = this;
        const isAcademicSemesterAxist = yield academicsemester_model_1.default.findOne({ _id: payload.academicSemester });
        if (!isAcademicSemesterAxist) {
            throw new AppErrors_1.default(400, "Academic Semester Ins't Axist !");
        }
        const isSemesterRegistrationAxist = yield exports.semesterRegistrationsModel.findOne({ academicSemester: payload.academicSemester });
        if (isSemesterRegistrationAxist) {
            throw new AppErrors_1.default(400, "Semester registration already axist !");
        }
        next();
    });
});
exports.semesterRegistrationsModel = (0, mongoose_1.model)("semesterRegistration", semesterRegistrationSchema);
