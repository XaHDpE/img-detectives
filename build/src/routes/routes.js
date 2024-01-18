"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userController = require("../controllers/user.controller");
const roomController = require("../controllers/room.controller");
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const routes = (0, express_1.Router)();
routes.use((0, express_1.json)());
routes.post('/login', userController.loginOne);
routes.post('/register', userController.registerOne);
routes.get('/welcome', auth_1.verifyToken, (req, res) => {
    res.status(200).send('Welcome 🙌 ');
});
routes.get('/', (req, res) => {
    res.send("What's up doc ?!");
});
// rooms
routes.get('/room', auth_1.verifyToken, roomController.lobbyList);
exports.default = routes;
//# sourceMappingURL=routes.js.map