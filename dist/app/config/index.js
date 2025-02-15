"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), ".env") });
exports.default = {
    port: process.env.PORT,
    databaseUrl: process.env.DATABASE_URL,
    defaultPass: process.env.DEFAULT_PASS,
    bcryptSaltRounds: process.env.BCRYPT_SALT_ROUNDS,
    nodeEnv: process.env.NODE_ENV,
    jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
    jwtRefreshSecret: process.env.JWT_Refresh_SECRET,
    resetPassUILink: process.env.RESET_PASS_UI_LINK,
    cloudName: process.env.CLOUD_NAME,
    apiKey: process.env.API_KEY,
    apiSecret: process.env.API_SECRET,
    superAdminPassword: process.env.SUPER_ADMIN_PASSWORD,
};
