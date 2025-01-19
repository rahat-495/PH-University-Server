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
exports.authServices = void 0;
const AppErrors_1 = __importDefault(require("../../errors/AppErrors"));
const user_model_1 = require("../user/user.model");
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.UsersModel.isUserAxistByCustomId(payload === null || payload === void 0 ? void 0 : payload.id);
    if (!user) {
        throw new AppErrors_1.default(404, "The user is not found !");
    }
    // const isDeleted = isUserAxist?.isDeleted ;
    // if(isDeleted){
    //     throw new AppError(400 , "The user is deleted !") ;
    // }
    // const userStatus = isUserAxist?.status ;
    // if(userStatus === "blocked"){
    //     throw new AppError(400 , "The user is already blocked !") ;
    // }
    // const isPasswordMatched = await bcrypt.compare(payload?.password , isUserAxist?.password) ;
    return null;
});
exports.authServices = {
    loginUser,
};
