"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerOne = exports.loginOne = void 0;
const userServices = require("../services/user.service");
const error_utils_1 = require("../utils/error.utils");
const statuses_1 = require("../utils/statuses");
const class_transformer_1 = require("class-transformer");
const users_1 = require("../models/users");
const user_service_1 = require("../services/user.service");
const loginOne = async (req, res) => {
    try {
        const userLogin = (0, class_transformer_1.plainToInstance)(users_1.UsersLogin, req.body);
        await userLogin.validate();
        const usr = await (0, user_service_1.findByEmail)(userLogin.email);
        const token = await (0, user_service_1.authorize)(usr, userLogin.password);
        return res.status(statuses_1.StatusEnum.Success).send({ token: token });
    }
    catch (e) {
        return (0, error_utils_1.defaultHttpFail)(res, e);
    }
};
exports.loginOne = loginOne;
const registerOne = async (req, res) => {
    const userInput = (0, class_transformer_1.plainToInstance)(users_1.UsersInput, req.body);
    try {
        await userInput.validate();
        const regResult = await userServices.register(userInput);
        return res.status(statuses_1.StatusEnum.Success).send(regResult);
    }
    catch (e) {
        return (0, error_utils_1.defaultHttpFail)(res, e);
    }
};
exports.registerOne = registerOne;
//# sourceMappingURL=user.controller.js.map