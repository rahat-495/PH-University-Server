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
exports.offeredCourseServices = void 0;
const offeredCourse_model_1 = require("./offeredCourse.model");
const createOfferedCourseIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Other ObjectId validation are working on model pre hook -------
    const result = yield offeredCourse_model_1.offeredCoursesModel.create(payload);
    return result;
});
const getAllOfferedCourseFromDb = (query) => __awaiter(void 0, void 0, void 0, function* () {
    // const courseQuery = new QueryBuilder(coursesModel.find().populate("preRequisiteCourses.course") , query).search(courseSearchAbleFields).filter().sort().paginate().fields() ;
    // const result = await courseQuery.modelQuery ;
    // return result ;
});
const getSingleOfferedCourseFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // const result = await coursesModel.findById(id) ;
    // return result ;
});
const updateOfferedCourseIntoDb = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // const {preRequisiteCourses , ...courseRemainingData} = payload ;
});
exports.offeredCourseServices = {
    createOfferedCourseIntoDb,
    getAllOfferedCourseFromDb,
    updateOfferedCourseIntoDb,
    getSingleOfferedCourseFromDb,
};
