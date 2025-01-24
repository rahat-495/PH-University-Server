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
exports.UsersModel = void 0;
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const config_1 = __importDefault(require("../../config"));
const AppErrors_1 = __importDefault(require("../../errors/AppErrors"));
const bcryptjs_2 = __importDefault(require("bcryptjs"));
const userSchema = new mongoose_1.Schema({
    id: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
        select: 0,
    },
    needsPasswordChange: {
        type: Boolean,
        default: true,
    },
    passwordChangeAt: {
        type: Date,
    },
    status: {
        type: String,
        required: true,
        default: "in-progress",
        enum: ["in-progress", "blocked"],
    },
    role: {
        type: String,
        required: true,
        enum: ["admin", "student", "faculty"],
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        user.password = yield bcryptjs_1.default.hash(user.password, Number(config_1.default.bcryptSaltRounds));
        next();
    });
});
userSchema.post("save", function (doc, next) {
    return __awaiter(this, void 0, void 0, function* () {
        doc.password = "";
        next();
    });
});
userSchema.pre("find", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.find({ isDeleted: { $ne: true } });
        next();
    });
});
userSchema.pre("findOne", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.find({ isDeleted: { $ne: true } });
        next();
    });
});
userSchema.pre('findOneAndUpdate', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield exports.UsersModel.findOne(this.getQuery());
        if (!user) {
            throw new AppErrors_1.default(404, "User not found!");
        }
        next();
    });
});
userSchema.statics.isUserAxistByCustomId = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield exports.UsersModel.findOne({ id }).select('+password');
    });
};
userSchema.statics.isPasswordMatched = function (plainPass, hashedPass) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcryptjs_2.default.compare(plainPass, hashedPass);
    });
};
userSchema.statics.isJWTIssuedBeforePasswordChange = function (passwordChangeTimeStamp, JWTIssuedTimeStamp) {
    // to do some thing -----------------
};
exports.UsersModel = (0, mongoose_1.model)('user', userSchema);
