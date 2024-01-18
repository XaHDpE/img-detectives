"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.js
const express_1 = require("express");
const dotenv_1 = require("dotenv");
const routes_1 = require("./routes/routes");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(routes_1.default);
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
// export default app;
//# sourceMappingURL=index.js.map