"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const student_routes_1 = require("../modules/student/student.routes");
const user_routes_1 = require("../modules/user/user.routes");
const router = express_1.default.Router();
router.use('/users', user_routes_1.userRoutes);
router.use('/students', student_routes_1.studentRoutes);
exports.default = router;
