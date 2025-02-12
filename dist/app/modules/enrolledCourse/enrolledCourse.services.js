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
exports.enrolledCourseSerivces = void 0;
const AppErrors_1 = __importDefault(require("../../errors/AppErrors"));
const offeredCourse_model_1 = require("../offeredCourse/offeredCourse.model");
const http_status_1 = __importDefault(require("http-status"));
const student_model_1 = require("../student/student.model");
const enrolledCourse_model_1 = require("./enrolledCourse.model");
const mongoose_1 = __importDefault(require("mongoose"));
const semesterRegistration_model_1 = require("../semesterRegistration/semesterRegistration.model");
const faculty_model_1 = require("../faculty/faculty.model");
const createEnrolledCourseIntoDb = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { offeredCourse } = payload;
    const isOfferedCourseAxist = yield offeredCourse_model_1.offeredCoursesModel.findById(offeredCourse).populate("course");
    const semesterRegistration = yield semesterRegistration_model_1.semesterRegistrationsModel.findById(isOfferedCourseAxist === null || isOfferedCourseAxist === void 0 ? void 0 : isOfferedCourseAxist.semesterRegistration);
    if (!isOfferedCourseAxist) {
        throw new AppErrors_1.default(http_status_1.default.NOT_FOUND, "Offered course not found !");
    }
    if ((isOfferedCourseAxist === null || isOfferedCourseAxist === void 0 ? void 0 : isOfferedCourseAxist.maxCapacity) <= 0) {
        throw new AppErrors_1.default(http_status_1.default.BAD_GATEWAY, "The room is full !");
    }
    const student = yield student_model_1.studentsModel.findOne({ id: userId }, { _id: 1 });
    const isStudentAlreadyEnrolled = yield enrolledCourse_model_1.enrolledCoursesModel.findOne({ offeredCourse, student: student === null || student === void 0 ? void 0 : student._id, semesterRegistration: isOfferedCourseAxist === null || isOfferedCourseAxist === void 0 ? void 0 : isOfferedCourseAxist.semesterRegistration });
    if (isStudentAlreadyEnrolled) {
        throw new AppErrors_1.default(http_status_1.default.CONFLICT, "Student already enrolled !");
    }
    const enrolledCourse = yield enrolledCourse_model_1.enrolledCoursesModel.aggregate([
        { $match: { semesterRegistration: isOfferedCourseAxist === null || isOfferedCourseAxist === void 0 ? void 0 : isOfferedCourseAxist.semesterRegistration, student: student === null || student === void 0 ? void 0 : student._id } },
        { $lookup: { from: "courses", localField: "course", foreignField: "_id", as: "enrolledCourseData" } },
        { $unwind: "$enrolledCourseData" },
        { $group: { _id: null, totalEnrolledCredits: { $sum: "$enrolledCourseData.credits" } } }
    ]);
    const totalCredits = enrolledCourse.length ? (_a = enrolledCourse[0]) === null || _a === void 0 ? void 0 : _a.totalEnrolledCredits : 0;
    if (totalCredits && totalCredits + ((_b = isOfferedCourseAxist === null || isOfferedCourseAxist === void 0 ? void 0 : isOfferedCourseAxist.course) === null || _b === void 0 ? void 0 : _b.credits) > (semesterRegistration === null || semesterRegistration === void 0 ? void 0 : semesterRegistration.maxCredit)) {
        throw new AppErrors_1.default(http_status_1.default.BAD_REQUEST, "You have exceeded maximum number of credits !");
    }
    const session = yield mongoose_1.default.startSession();
    try {
        yield session.startTransaction();
        const payloadData = [{
                semesterRegistration: isOfferedCourseAxist === null || isOfferedCourseAxist === void 0 ? void 0 : isOfferedCourseAxist.semesterRegistration,
                academicSemester: isOfferedCourseAxist === null || isOfferedCourseAxist === void 0 ? void 0 : isOfferedCourseAxist.academicSemester,
                academicFaculty: isOfferedCourseAxist === null || isOfferedCourseAxist === void 0 ? void 0 : isOfferedCourseAxist.academicFaculty,
                academicDepartment: isOfferedCourseAxist === null || isOfferedCourseAxist === void 0 ? void 0 : isOfferedCourseAxist.academicDepartment,
                course: isOfferedCourseAxist === null || isOfferedCourseAxist === void 0 ? void 0 : isOfferedCourseAxist.course,
                student: student === null || student === void 0 ? void 0 : student._id,
                faculty: isOfferedCourseAxist === null || isOfferedCourseAxist === void 0 ? void 0 : isOfferedCourseAxist.faculty,
                isEnrolled: true,
                offeredCourse: isOfferedCourseAxist === null || isOfferedCourseAxist === void 0 ? void 0 : isOfferedCourseAxist._id,
            }];
        const result = yield enrolledCourse_model_1.enrolledCoursesModel.create(payloadData, { session });
        if (!result) {
            throw new AppErrors_1.default(http_status_1.default.BAD_REQUEST, "Enrolle in course is failed !");
        }
        yield offeredCourse_model_1.offeredCoursesModel.findByIdAndUpdate(offeredCourse, { maxCapacity: (isOfferedCourseAxist === null || isOfferedCourseAxist === void 0 ? void 0 : isOfferedCourseAxist.maxCapacity) - 1 }, { session });
        yield session.commitTransaction();
        yield session.endSession();
        return result;
    }
    catch (error) {
        console.log(error);
        yield session.abortTransaction();
        yield session.endSession();
        throw new AppErrors_1.default(500, "Can't enrolled this course !");
    }
});
const updateEnrolledCourseMarksIntoDb = (facultyId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { semesterRegistration, offeredCourse, student, courseMarks } = payload;
    const isSemesterRegistrationAxist = yield semesterRegistration_model_1.semesterRegistrationsModel.findById(semesterRegistration);
    if (!isSemesterRegistrationAxist) {
        throw new AppErrors_1.default(http_status_1.default.NOT_FOUND, "Semester Registration not found !");
    }
    const isStudentAxist = yield student_model_1.studentsModel.findById(student);
    if (!isStudentAxist) {
        throw new AppErrors_1.default(http_status_1.default.NOT_FOUND, "Student not found !");
    }
    const isOfferedCourseAxist = yield offeredCourse_model_1.offeredCoursesModel.findById(offeredCourse);
    if (!isOfferedCourseAxist) {
        throw new AppErrors_1.default(http_status_1.default.NOT_FOUND, "Offered course not found !");
    }
    const faculty = yield faculty_model_1.facultysModel.findOne({ id: facultyId }, { _id: 1 });
    const isCourseBelongToFaculty = yield enrolledCourse_model_1.enrolledCoursesModel.findOne({ semesterRegistration, student, offeredCourse, faculty: faculty === null || faculty === void 0 ? void 0 : faculty._id });
    if (!isCourseBelongToFaculty) {
        throw new AppErrors_1.default(http_status_1.default.FORBIDDEN, "You are forbidden !");
    }
    const modifiedData = Object.assign({}, courseMarks);
    if (courseMarks && Object.keys(courseMarks).length) {
        for (const [key, value] of Object.entries(courseMarks)) {
            modifiedData[`courseMarks.${key}`] = value;
        }
    }
    const result = yield enrolledCourse_model_1.enrolledCoursesModel.findByIdAndUpdate(isCourseBelongToFaculty === null || isCourseBelongToFaculty === void 0 ? void 0 : isCourseBelongToFaculty._id, modifiedData, { new: true });
    return result;
});
exports.enrolledCourseSerivces = {
    createEnrolledCourseIntoDb,
    updateEnrolledCourseMarksIntoDb,
};
