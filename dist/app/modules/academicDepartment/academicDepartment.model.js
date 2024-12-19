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
exports.academicDepartmentsModel = void 0;
const mongoose_1 = require("mongoose");
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
            throw new Error("Academic department name is already axist !");
        }
        next();
    });
});
exports.academicDepartmentsModel = (0, mongoose_1.model)("academicDepartment", academicDepartmentSchema);
