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
exports.studentsModel = void 0;
const mongoose_1 = require("mongoose");
const AppErrors_1 = __importDefault(require("../../errors/AppErrors"));
const nameSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required!"],
    },
    middleName: {
        type: String,
        required: false,
    },
    lastName: {
        type: String,
        required: [true, "Last name is required!"],
    },
});
const guardianSchema = new mongoose_1.Schema({
    fatherName: {
        type: String,
        required: [true, "father name is required!"],
    },
    fatherContactNo: {
        type: String,
        required: [true, "father contact no is required!"],
    },
    fatherOccupation: {
        type: String,
        required: [true, "father occupation no is required!"],
    },
    motherName: {
        type: String,
        required: [true, "mother name no is required!"],
    },
    motherContactNo: {
        type: String,
        required: [true, "mother contact no is required!"],
    },
    motherOccupation: {
        type: String,
        required: [true, "mother occupation no is required!"],
    },
});
const localGuardianSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "name is required!"],
    },
    occupation: {
        type: String,
        required: [true, "occupation is required!"],
    },
    contactNo: {
        type: String,
        required: [true, "contactNo is required!"],
    },
    address: {
        type: String,
        required: [true, "address is required!"],
    },
});
const studentSchema = new mongoose_1.Schema({
    id: {
        type: String,
        unique: true,
        required: [true, "ID is required !"],
    },
    user: {
        ref: 'user',
        unique: true,
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, "User Id is required !"],
    },
    name: {
        type: nameSchema,
        required: [true, "Name is required !"],
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    profileImg: {
        type: String,
        default: "",
    },
    permanentAddress: {
        type: String,
        required: [true, "Permanent address is required !"],
    },
    presentAddress: {
        type: String,
        required: [true, "Present address is required !"],
    },
    guardian: {
        type: guardianSchema,
        required: [true, "Guardian is required !"],
    },
    localGuardian: {
        type: localGuardianSchema,
        required: [true, "Guardian is required !"],
    },
    contactNo: {
        type: String,
        required: [true, "contact No is required !"],
    },
    emergencyContactNo: {
        type: String,
        required: [true, "emergency Contact No is required !"],
    },
    email: {
        type: String,
        unique: true,
        required: [true, "email is required !"],
    },
    dateOfBirth: {
        type: String,
        required: [true, "date Of Birth is required !"],
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"],
        required: [true, "gender is required !"],
    },
    admissionSemester: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "academicSemester",
        required: [true, "admissionSemester is required !"],
    },
    academicDepartment: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "academicDepartment",
        required: [true, "admissionSemester is required !"],
    },
    academicFaculty: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "academicFaculty",
        required: [true, "Academic faculty is required !"],
    },
});
studentSchema.pre('findOneAndUpdate', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const student = yield exports.studentsModel.findOne({ id: this.getQuery().id });
        if (!student) {
            throw new AppErrors_1.default(404, "Student not found!");
        }
        next();
    });
});
exports.studentsModel = (0, mongoose_1.model)('student', studentSchema);
