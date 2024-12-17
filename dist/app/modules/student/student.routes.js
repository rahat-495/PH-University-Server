"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const student_controllers_1 = require("./student.controllers");
const router = express_1.default.Router();
router.get('/', student_controllers_1.studentControllers.getAllStudents);
router.get('/:id', student_controllers_1.studentControllers.getSpecificStudent);
router.get('/:id', student_controllers_1.studentControllers.deleteAStudent);
exports.studentRoutes = router;
