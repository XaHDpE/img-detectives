"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = exports.verifyToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const createToken = () => { };
exports.createToken = createToken;
const verifyToken = (req, res, next) => {
    try {
        const token = req.body.token ||
            req.query.token ||
            req.params.token ||
            req.headers['x-access-token'];
        if (!token) {
            return res.status(403).send('A token is required for authentication');
        }
        req.token = jsonwebtoken_1.default.verify(token, process.env.API_KEY);
    }
    catch (err) {
        return res.status(401).send('Invalid Token');
    }
    return next();
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=auth.js.map