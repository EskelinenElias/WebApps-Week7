"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const OfferSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
});
const Offer = (0, mongoose_1.model)("offers", OfferSchema);
exports.default = Offer;
// eof
