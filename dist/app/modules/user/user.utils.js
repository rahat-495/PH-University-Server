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
exports.generateStudentId = void 0;
const user_model_1 = require("./user.model");
const findLastUserId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastUserId = yield user_model_1.UsersModel.findOne({ role: "student" }, { id: 1, _id: 0 }).sort({ createdAt: -1 }).lean();
    return (lastUserId === null || lastUserId === void 0 ? void 0 : lastUserId.id) ? lastUserId.id.substring(6) : undefined;
});
const generateStudentId = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const currentId = (yield findLastUserId()) || (0).toString();
    let incrementId = Number(currentId + 1).toString().padStart(4, '0');
    incrementId = `${payload === null || payload === void 0 ? void 0 : payload.year}${payload === null || payload === void 0 ? void 0 : payload.code}${incrementId}`;
    return incrementId;
});
exports.generateStudentId = generateStudentId;
