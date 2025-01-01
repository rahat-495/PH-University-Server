"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../middlewares/validateRequest"));
const admin_controllers_1 = require("./admin.controllers");
const admin_validation_1 = require("./admin.validation");
const router = express_1.default.Router();
router.get('/', admin_controllers_1.adminControllers.getAllAdmin);
router.get('/:adminId', admin_controllers_1.adminControllers.getSpecifiAdmin);
router.patch('/:adminId', (0, validateRequest_1.default)(admin_validation_1.adminValidations.updateAdminValidationSchema), admin_controllers_1.adminControllers.updateAdmin);
router.delete('/:adminId', admin_controllers_1.adminControllers.deleteAdmin);
exports.adminRoutes = router;
