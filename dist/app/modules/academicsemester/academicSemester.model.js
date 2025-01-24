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
const mongoose_1 = require("mongoose");
const academicSemester_constant_1 = require("./academicSemester.constant");
const academicSemesterSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        enum: academicSemester_constant_1.academicSemesterName,
    },
    year: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
        enum: academicSemester_constant_1.academicSemesterCode,
    },
    startMonth: {
        enum: academicSemester_constant_1.months,
        type: String,
        required: true,
    },
    endMonth: {
        enum: academicSemester_constant_1.months,
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
academicSemesterSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const isSemesterAxist = yield academicSemestersModel.findOne({ name: this.name, year: this.year });
        if (isSemesterAxist) {
            throw new mongoose_1.Error("Semester already axist !");
        }
        next();
    });
});
const academicSemestersModel = (0, mongoose_1.model)("academicSemester", academicSemesterSchema);
exports.default = academicSemestersModel;
