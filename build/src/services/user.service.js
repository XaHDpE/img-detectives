"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.authorize = exports.findByEmail = void 0;
const client_1 = require("@prisma/client");
const bcryptjs_1 = require("bcryptjs");
const statuses_1 = require("../utils/statuses");
const users_1 = require("../models/users");
const error_utils_1 = require("../utils/error.utils");
async function findByEmail(email) {
    const users = new users_1.Users(new client_1.PrismaClient().user);
    const res = await users.findByEmail(email);
    if (res === null)
        throw new error_utils_1.NotFoundError(`User with email ${email} not found`);
    return res;
}
exports.findByEmail = findByEmail;
async function authorize(user, password) {
    if (await bcryptjs_1.default.compare(password, user.password)) {
        return await users_1.Users.issueToken(user);
    }
    else {
        throw new error_utils_1.SecurityError('Provided password is invalid');
    }
}
exports.authorize = authorize;
async function register(req) {
    const users = new users_1.Users(new client_1.PrismaClient().user);
    const existingUser = await users.findByEmail(req.email.toLowerCase());
    if (existingUser) {
        return {
            code: statuses_1.StatusEnum.Conflict,
            message: 'User already exists, please login',
        };
    }
    return await users.create(req);
}
exports.register = register;
//# sourceMappingURL=user.service.js.map