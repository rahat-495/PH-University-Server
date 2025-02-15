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
exports.facultysModel = void 0;
const mongoose_1 = require("mongoose");
const AppErrors_1 = __importDefault(require("../../errors/AppErrors"));
const academicDepartment_model_1 = require("../academicDepartment/academicDepartment.model");
const academicFaculty_model_1 = require("../academicFaculty/academicFaculty.model");
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
const facultySchema = new mongoose_1.Schema({
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
    designation: {
        type: String,
        required: [true, "designation is required !"],
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"],
        required: [true, "gender is required !"],
    },
    academicFaculty: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "academicFaculty",
        required: [true, "academic faculty is required !"],
    },
    academicDepartment: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "academicDepartment",
        required: [true, "academicDepartment is required !"],
    },
});
facultySchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const faculty = this;
        const academicDepartment = yield academicDepartment_model_1.academicDepartmentsModel.findOne({ _id: faculty.academicDepartment });
        if (!academicDepartment) {
            throw new AppErrors_1.default(404, "Academic department not found !");
        }
        const academicFaculty = yield academicFaculty_model_1.academicFacultysModel.findOne({ _id: faculty.academicFaculty });
        if (!academicFaculty) {
            throw new AppErrors_1.default(404, "Academic faculty not found !");
        }
        next();
    });
});
facultySchema.pre("find", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.find({ isDeleted: { $ne: true } });
        next();
    });
});
facultySchema.pre("findOne", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.findOne({ isDeleted: { $ne: true } });
        next();
    });
});
facultySchema.pre('findOneAndUpdate', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const faculty = yield exports.facultysModel.findOne({ id: this.getQuery().id });
        if (!faculty) {
            throw new AppErrors_1.default(404, "faculty not found!");
        }
        next();
    });
});
exports.facultysModel = (0, mongoose_1.model)('faculty', facultySchema);
