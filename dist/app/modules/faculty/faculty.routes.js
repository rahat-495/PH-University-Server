"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.facultyRoutes = void 0;
const express_1 = __importDefault(require("express"));
const faculty_controllers_1 = require("./faculty.controllers");
const router = express_1.default.Router();
router.get('/', faculty_controllers_1.facultyControllers.getAlFaculties);
router.get('/:id', faculty_controllers_1.facultyControllers.getSpecifiFaculty);
router.patch('/:id', faculty_controllers_1.facultyControllers.updateFaculty);
router.delete('/:id', faculty_controllers_1.facultyControllers.deleteFaculty);
exports.facultyRoutes = router;
