"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const student_routes_1 = require("../modules/student/student.routes");
const user_routes_1 = require("../modules/user/user.routes");
const academicFaculty_routes_1 = require("../modules/academicFaculty/academicFaculty.routes");
const academicDepartment_routes_1 = require("../modules/academicDepartment/academicDepartment.routes");
const faculty_routes_1 = require("../modules/faculty/faculty.routes");
const admin_routes_1 = require("../modules/admin/admin.routes");
const course_routes_1 = require("../modules/course/course.routes");
const semesterRegistration_routes_1 = require("../modules/semesterRegistration/semesterRegistration.routes");
const offeredCourse_routes_1 = require("../modules/offeredCourse/offeredCourse.routes");
const auth_routes_1 = require("../modules/auth/auth.routes");
const academicSemester_routes_1 = require("../modules/academicSemester/academicSemester.routes");
const enrolledCourse_routes_1 = require("../modules/enrolledCourse/enrolledCourse.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/auth',
        route: auth_routes_1.authRoutes,
    },
    {
        path: '/users',
        route: user_routes_1.userRoutes,
    },
    {
        path: '/students',
        route: student_routes_1.studentRoutes,
    },
    {
        path: '/admins',
        route: admin_routes_1.adminRoutes,
    },
    {
        path: '/faculties',
        route: faculty_routes_1.facultyRoutes,
    },
    {
        path: '/courses',
        route: course_routes_1.courseRoutes,
    },
    {
        path: '/academic-faculties',
        route: academicFaculty_routes_1.academicFacultyRoutes,
    },
    {
        path: '/academic-semesters',
        route: academicSemester_routes_1.academicSemesterRoutes,
    },
    {
        path: '/academic-departments',
        route: academicDepartment_routes_1.academicDepartmentRoutes,
    },
    {
        path: '/semester-registrations',
        route: semesterRegistration_routes_1.semesterRegistrationRoutes,
    },
    {
        path: '/offered-courses',
        route: offeredCourse_routes_1.offeredCourseRoutes,
    },
    {
        path: '/enrolled-courses',
        route: enrolledCourse_routes_1.enrolledCourseRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
