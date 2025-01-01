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
exports.adminControllers = void 0;
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const admin_services_1 = require("./admin.services");
const getAllAdmin = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_services_1.adminServices.getAllAdminFromDb(req.query);
    (0, sendResponse_1.default)(res, { data: result, statusCode: 200, success: true, message: "All faculties are retrived !" });
}));
const getSpecifiAdmin = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { adminId } = req.params;
    const data = yield admin_services_1.adminServices.getSpecificAdminFromDb(adminId);
    if (data) {
        (0, sendResponse_1.default)(res, { data, statusCode: 200, success: true, message: "Specific faculties are retrived !" });
    }
    else {
        (0, sendResponse_1.default)(res, { data: {}, statusCode: 200, success: true, message: "Can't Get Any admin !" });
    }
}));
const updateAdmin = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { adminId } = req.params;
    const result = yield admin_services_1.adminServices.updateSingleAdminIntoDb(adminId, req.body.admin);
    if (result) {
        (0, sendResponse_1.default)(res, { data: result, statusCode: 200, success: true, message: "admin details udpated success fully !" });
    }
}));
const deleteAdmin = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { adminId } = req.params;
    const result = yield admin_services_1.adminServices.deleteSingleAdminFromDb(adminId);
    if (result) {
        (0, sendResponse_1.default)(res, { data: result, statusCode: 200, success: true, message: "Specific admin are deleted !" });
    }
}));
exports.adminControllers = {
    getAllAdmin,
    deleteAdmin,
    updateAdmin,
    getSpecifiAdmin,
};
