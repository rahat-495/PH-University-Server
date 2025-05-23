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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const AppErrors_1 = __importDefault(require("../../errors/AppErrors"));
const user_model_1 = require("../user/user.model");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const admin_model_1 = require("./admin.model");
const admin_constand_1 = require("./admin.constand");
const getAllAdminFromDb = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const studentQuery = new QueryBuilder_1.default(admin_model_1.adminsModel.find(), query).search(admin_constand_1.adminsSearchAbleFields).filter().sort().paginate().fields();
    const result = yield studentQuery.modelQuery;
    return result;
});
const getSpecificAdminFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_model_1.adminsModel.findById(id);
    return result;
});
const updateSingleAdminIntoDb = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = payload, remainingFacultyData = __rest(payload, ["name"]);
    const modifiedUpdateData = Object.assign({}, remainingFacultyData);
    if (name && Object.keys(name).length) {
        for (const [key, value] of Object.entries(name)) {
            modifiedUpdateData[`name.${key}`] = value;
        }
    }
    const result = yield admin_model_1.adminsModel.findByIdAndUpdate(id, modifiedUpdateData, { new: true, runValidators: true });
    return result;
});
const deleteSingleAdminFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const deletedAdmin = yield admin_model_1.adminsModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true, session });
        if (!deletedAdmin) {
            throw new AppErrors_1.default(400, "Failed to delete admin");
        }
        const userId = deletedAdmin.user;
        const deletedUser = yield user_model_1.UsersModel.findByIdAndUpdate({ _id: userId }, { isDeleted: true }, { new: true, session });
        if (!deletedUser) {
            throw new AppErrors_1.default(400, "Failed to delete user");
        }
        yield session.commitTransaction();
        yield session.endSession();
        return deletedAdmin;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new AppErrors_1.default(500, "Failed to delete admin");
    }
});
exports.adminServices = {
    deleteSingleAdminFromDb,
    getAllAdminFromDb,
    updateSingleAdminIntoDb,
    getSpecificAdminFromDb
};
