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
exports.courseServices = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const course_constant_1 = require("./course.constant");
const course_model_1 = require("./course.model");
const AppErrors_1 = __importDefault(require("../../errors/AppErrors"));
const mongoose_1 = __importDefault(require("mongoose"));
const createCourseIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.coursesModel.create(payload);
    return result;
});
const getAllCourseFromDb = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const courseQuery = new QueryBuilder_1.default(course_model_1.coursesModel.find().populate("preRequisiteCourses.course"), query).search(course_constant_1.courseSearchAbleFields).filter().sort().paginate().fields();
    const result = yield courseQuery.modelQuery;
    return result;
});
const getSingleCourseFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.coursesModel.findById(id);
    return result;
});
const updateCourseIntoDb = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { preRequisiteCourses } = payload, courseRemainingData = __rest(payload, ["preRequisiteCourses"]);
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const updateBasicCourseIntoDb = yield course_model_1.coursesModel.findByIdAndUpdate(id, { $set: Object.assign({}, courseRemainingData) }, { runValidators: true, session });
        if (!updateBasicCourseIntoDb) {
            throw new AppErrors_1.default(400, "Course Basic Update Failed !");
        }
        if (preRequisiteCourses && preRequisiteCourses.length) {
            const deletedPreRequisites = preRequisiteCourses.filter((el) => el.course && el.isDeleted).map(el => el.course);
            const deletedPreRequisiteCourses = yield course_model_1.coursesModel.findByIdAndUpdate(id, { $pull: { preRequisiteCourses: { course: { $in: deletedPreRequisites } } } }, { runValidators: true, session });
            if (!deletedPreRequisiteCourses) {
                throw new AppErrors_1.default(400, "Delete PreRequisite Course Update Failed !");
            }
            const addingPreRequisites = preRequisiteCourses === null || preRequisiteCourses === void 0 ? void 0 : preRequisiteCourses.filter((el) => el.course && !el.isDeleted).map((el) => ({ course: el.course }));
            const addingPreRequisitesCourses = yield course_model_1.coursesModel.findByIdAndUpdate(id, { $addToSet: { preRequisiteCourses: { $each: addingPreRequisites } } }, { runValidators: true, session });
            if (!addingPreRequisitesCourses) {
                throw new AppErrors_1.default(400, "Adding PreRequisite Course Update Failed !");
            }
        }
        yield session.commitTransaction();
        yield session.endSession();
        const result = yield course_model_1.coursesModel.findById(id).populate("preRequisiteCourses.course");
        return result;
    }
    catch (error) {
        console.log(error);
        yield session.abortTransaction();
        yield session.endSession();
        throw new AppErrors_1.default(400, "Course Update Failed !");
    }
});
const deleteCourseIntoDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.coursesModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    return result;
});
const assignFacultiesWithCourseIntoDb = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.courseFacultiesModel.findByIdAndUpdate(id, { course: id, $addToSet: { faculties: { $each: payload } } }, { new: true, upsert: true });
    return result;
});
exports.courseServices = {
    createCourseIntoDb,
    updateCourseIntoDb,
    getAllCourseFromDb,
    deleteCourseIntoDb,
    getSingleCourseFromDb,
    assignFacultiesWithCourseIntoDb,
};
