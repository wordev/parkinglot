"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./src/routes"));
const compression_1 = __importDefault(require("compression"));
const helmet_1 = __importDefault(require("helmet"));
require("dotenv/config");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
app.use(body_parser_1.default.json());
app.use((0, compression_1.default)());
app.use((0, helmet_1.default)());
app.use(routes_1.default);
console.log(process.env.DB_HOST);
app.listen(PORT, () => {
    console.log(`Server Running here 👉 http://localhost:${PORT}`);
});
