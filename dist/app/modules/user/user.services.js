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
exports.userService = void 0;
const config_1 = __importDefault(require("../../config"));
const user_model_1 = require("./user.model");
const createStudnetIntoDb = (password, data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = { role: "", password: "", id: "" };
    user.role = 'student';
    user.id = "2030100001";
    user.password = password || config_1.default.defaultPass;
    const createNewUser = yield user_model_1.UsersModel.create(user);
    if (createNewUser._id) {
        // data.id = createNewUser.id ;
        // data.user = createNewUser._id ;
    }
    // return result ;
});
exports.userService = {
    createStudnetIntoDb,
};
