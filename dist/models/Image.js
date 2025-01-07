"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Image = void 0;
const mongoose_1 = require("mongoose");
const ImageSchema = new mongoose_1.Schema({
    filename: { type: String, required: true },
    path: { type: Number, required: true },
});
const Image = (0, mongoose_1.model)("images", ImageSchema);
exports.Image = Image;
// eof
