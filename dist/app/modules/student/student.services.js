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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const student_model_1 = require("./student.model");
const AppErrors_1 = __importDefault(require("../../errors/AppErrors"));
const user_model_1 = require("../user/user.model");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const student_constand_1 = require("./student.constand");
const getAllStudentsFromDb = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const queryObj = Object.assign({}, query);
    let searchTerm = "";
    if (query.searchTerm) {
        searchTerm = query.searchTerm;
    }
    const searchQuery = student_model_1.studentsModel.find({
        $or: student_constand_1.studentsSearchAbleFields.map((field) => ({ [field]: { $regex: searchTerm, $options: "i" } }))
    });
    const excludeFields = ["searchTerm", "page", "limit", "sort", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);
    const filterQuery = searchQuery.find(queryObj).populate("admissionSemester").populate({ path: "academicDepartment", populate: { path: "academicFaculty" } });
    let sort = '-createdAt';
    if (query.sort) {
        sort = query.sort;
    }
    const sortQuery = filterQuery.sort(sort);
    let limit = 1;
    let page = 1;
    let skip = 0;
    if (query.limit) {
        limit = Number(query.limit);
    }
    if (query.page) {
        page = Number(query.page);
        skip = (page - 1) * limit;
    }
    const paginateQuery = sortQuery.skip(skip);
    const limitQuery = paginateQuery.limit(limit);
    let fields = "-__v";
    if (query.fields) {
        fields = query.fields.split(",").join(" ");
    }
    const finalQuery = yield limitQuery.select(fields);
    // return finalQuery ;
    const studentQuery = new QueryBuilder_1.default(student_model_1.studentsModel.find(), query).search(student_constand_1.studentsSearchAbleFields).filter().sort().paginate().fields();
});
const getSpecificStudentFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield student_model_1.studentsModel.findOne({ id }).populate("admissionSemester").populate({ path: "academicDepartment", populate: { path: "academicFaculty" } });
    return result;
});
const updateAStudentIntoDb = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, guardian, localGuardian } = payload, remainingStudentData = __rest(payload, ["name", "guardian", "localGuardian"]);
    const modifiedUpdateData = Object.assign({}, remainingStudentData);
    if (name && Object.keys(name).length) {
        for (const [key, value] of Object.entries(name)) {
            modifiedUpdateData[`name.${key}`] = value;
        }
    }
    if (guardian && Object.keys(guardian).length) {
        for (const [key, value] of Object.entries(guardian)) {
            modifiedUpdateData[`guardian.${key}`] = value;
        }
    }
    if (localGuardian && Object.keys(localGuardian).length) {
        for (const [key, value] of Object.entries(localGuardian)) {
            modifiedUpdateData[`localGuardian.${key}`] = value;
        }
    }
    console.log(modifiedUpdateData);
    const result = yield student_model_1.studentsModel.findOneAndUpdate({ id }, modifiedUpdateData, { new: true, runValidators: true });
    return result;
});
const deleteAStudentFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const deletedUser = yield user_model_1.UsersModel.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, session });
        if (!deletedUser) {
            throw new AppErrors_1.default(400, "Failed to delete user");
        }
        const deletedStudent = yield student_model_1.studentsModel.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, session });
        if (!deletedStudent) {
            throw new AppErrors_1.default(400, "Failed to delete student");
        }
        yield session.commitTransaction();
        yield session.endSession();
        return deletedStudent;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new AppErrors_1.default(500, "Failed to delete student");
    }
});
exports.studentServices = {
    deleteAStudentFromDb,
    getAllStudentsFromDb,
    updateAStudentIntoDb,
    getSpecificStudentFromDb
};
