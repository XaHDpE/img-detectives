"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = exports.UsersLogin = exports.UsersInput = void 0;
const class_validator_1 = require("class-validator");
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
const error_utils_1 = require("../utils/error.utils");
class UserDtoBase {
    constructor() { }
    async validate() {
        await (0, class_validator_1.validateOrReject)(this, { validationError: { target: false } });
    }
}
class UsersInput extends UserDtoBase {
    constructor(firstName, lastName, email, password) {
        super();
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }
}
exports.UsersInput = UsersInput;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)()
], UsersInput.prototype, "firstName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)()
], UsersInput.prototype, "lastName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)()
], UsersInput.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsStrongPassword)({
        minLength: 6,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    })
], UsersInput.prototype, "password", void 0);
class UsersLogin extends UserDtoBase {
    constructor(email, password) {
        super();
        this.email = email;
        this.password = password;
    }
}
exports.UsersLogin = UsersLogin;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)()
], UsersLogin.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)()
], UsersLogin.prototype, "password", void 0);
class Users {
    constructor(prismaUser) {
        this.prismaUser = prismaUser;
    }
    static async issueToken(user) {
        const email = user.email;
        try {
            return (0, jsonwebtoken_1.sign)({ user_id: user.id, email }, process.env.API_KEY, {
                expiresIn: '2d',
            });
        }
        catch (e) {
            throw new error_utils_1.SecurityError(`Unable to generate token for ${email}`, e);
        }
    }
    async create(input) {
        try {
            const hashPassword = await (0, bcryptjs_1.hash)(input.password, 10);
            return this.prismaUser.create({
                data: {
                    firstName: input.firstName,
                    lastName: input.lastName,
                    email: input.email,
                    password: hashPassword,
                },
            });
        }
        catch (e) {
            throw new error_utils_1.GenericError(String(e));
        }
    }
    async findByEmail(email) {
        return this.prismaUser.findUnique({
            where: {
                email: email,
            },
        });
    }
}
exports.Users = Users;
//# sourceMappingURL=users.js.map