"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const student_routes_1 = require("../modules/student/student.routes");
const user_routes_1 = require("../modules/user/user.routes");
const academicSemester_routes_1 = require("../modules/academicSemester/academicSemester.routes");
const academicFaculty_routes_1 = require("../modules/academicFaculty/academicFaculty.routes");
const academicDepartment_routes_1 = require("../modules/academicDepartment/academicDepartment.routes");
const faculty_routes_1 = require("../modules/faculty/faculty.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/users',
        route: user_routes_1.userRoutes,
    },
    {
        path: '/students',
        route: student_routes_1.studentRoutes,
    },
    {
        path: '/faculties',
        route: faculty_routes_1.facultyRoutes,
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
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
