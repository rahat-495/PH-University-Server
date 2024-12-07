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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const student_routes_1 = require("./app/modules/student/student.routes");
const user_routes_1 = require("./app/modules/user/user.routes");
const globalErrorHandler_1 = __importDefault(require("./app/modules/middlewares/globalErrorHandler"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/v1/users', user_routes_1.userRoutes);
app.use('/api/v1/students', student_routes_1.studentRoutes);
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({ message: "The second project server are running !", success: true });
}));
app.use(globalErrorHandler_1.default);
exports.default = app;
