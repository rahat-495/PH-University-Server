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
exports.offeredCourseServices = void 0;
const AppErrors_1 = __importDefault(require("../../errors/AppErrors"));
const academicDepartment_model_1 = require("../academicDepartment/academicDepartment.model");
const academicFaculty_model_1 = require("../academicFaculty/academicFaculty.model");
const course_model_1 = require("../course/course.model");
const faculty_model_1 = require("../faculty/faculty.model");
const semesterRegistration_model_1 = require("../semesterRegistration/semesterRegistration.model");
const offeredCourse_model_1 = require("./offeredCourse.model");
const offeredCourse_utils_1 = require("./offeredCourse.utils");
const createOfferedCourseIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { academicDepartment, academicFaculty, course, faculty, semesterRegistration, section, days, startTime, endTime } = payload;
    const isAcademicDepartmentAxist = yield academicDepartment_model_1.academicDepartmentsModel.findById(academicDepartment);
    if (!isAcademicDepartmentAxist) {
        throw new AppErrors_1.default(404, "Academic Department are not found !");
    }
    const isAcademicFacultyAxist = yield academicFaculty_model_1.academicFacultysModel.findById(academicFaculty);
    if (!isAcademicFacultyAxist) {
        throw new AppErrors_1.default(404, "Academic Faculty are not found !");
    }
    const isSemesterRegistrationAxist = yield semesterRegistration_model_1.semesterRegistrationsModel.findById(semesterRegistration);
    if (!isSemesterRegistrationAxist) {
        throw new AppErrors_1.default(404, "Semester Registration are not found !");
    }
    const isCourseAxist = yield course_model_1.coursesModel.findById(course);
    if (!isCourseAxist) {
        throw new AppErrors_1.default(404, "Course are not found !");
    }
    const isFacultyAxist = yield faculty_model_1.facultysModel.findById(faculty);
    if (!isFacultyAxist) {
        throw new AppErrors_1.default(404, "Faculty are not found !");
    }
    const isDepartmentBelongToFaculty = yield academicDepartment_model_1.academicDepartmentsModel.findOne({ _id: academicDepartment, academicFaculty });
    if (!isDepartmentBelongToFaculty) {
        throw new AppErrors_1.default(404, `This ${isAcademicDepartmentAxist === null || isAcademicDepartmentAxist === void 0 ? void 0 : isAcademicDepartmentAxist.name} is not belong to this ${isAcademicFacultyAxist === null || isAcademicFacultyAxist === void 0 ? void 0 : isAcademicFacultyAxist.name} !`);
    }
    const isOfferedCourseAxistWithSameSectionAndSemesterAndcourse = yield offeredCourse_model_1.offeredCoursesModel.findOne({ section, course, semesterRegistration });
    if (isOfferedCourseAxistWithSameSectionAndSemesterAndcourse) {
        throw new AppErrors_1.default(400, `Offered Course with same section or semester registration is already axist !`);
    }
    const newSchedule = { days, startTime, endTime };
    const assignedSchedules = yield offeredCourse_model_1.offeredCoursesModel.find({ faculty, semesterRegistration, days: { $in: days } }).select("startTime endTime days");
    if ((0, offeredCourse_utils_1.hasTimeConflict)(assignedSchedules, newSchedule)) {
        throw new AppErrors_1.default(409, `This faculty is not available at this time . Choose anothor time or day !`);
    }
    const result = yield offeredCourse_model_1.offeredCoursesModel.create(Object.assign(Object.assign({}, payload), { academicSemester: isSemesterRegistrationAxist === null || isSemesterRegistrationAxist === void 0 ? void 0 : isSemesterRegistrationAxist.academicSemester }));
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
