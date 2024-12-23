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
exports.academicDepartmentsModel = void 0;
const mongoose_1 = require("mongoose");
const AppErrors_1 = __importDefault(require("../../errors/AppErrors"));
const academicDepartmentSchema = new mongoose_1.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, "Enter the name !"],
    },
    academicFaculty: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "academicFaculty",
        required: [true, "Enter the academic faculty id !"],
    },
}, {
    timestamps: true,
});
academicDepartmentSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const academicDepartment = yield exports.academicDepartmentsModel.findOne({ name: this.name });
        if (academicDepartment) {
            throw new AppErrors_1.default(500, "Academic department name is already axist !");
        }
        next();
    });
});
academicDepartmentSchema.pre("updateOne", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = this.getQuery();
        const academicDepartment = yield exports.academicDepartmentsModel.findOne(query);
        if (!academicDepartment) {
            throw new AppErrors_1.default(404, "Academic department id is not axist !");
        }
        next();
    });
});
exports.academicDepartmentsModel = (0, mongoose_1.model)("academicDepartment", academicDepartmentSchema);
