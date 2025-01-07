"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Offer_1 = __importDefault(require("../models/Offer"));
const Image_1 = require("../models/Image");
const multer_1 = __importDefault(require("../config/multer"));
const router = (0, express_1.Router)();
// POST route to upload an offer
router.post("/", multer_1.default.single("image"), async (req, res) => {
    try {
        // Parse request
        const { title, price, description } = req.body;
        const file = req.file;
        // Validate request
        if (!title) {
            console.log("Invalid request; Offer must have a title");
            res
                .status(400)
                .json({ message: "Invalid request; Offer must have a title" });
            return;
        }
        if (!(price > 0)) {
            console.log("Invalid request; Offer price must be greater than 0");
            res
                .status(400)
                .json({ message: "Invalid request; Offer price must be greater than 0" });
            return;
        }
        if (!description) {
            console.log("Invalid request; Offer must have a description");
            res
                .status(400)
                .json({ message: "Invalid request; Offer must have a description" });
            return;
        }
        // Check if image file was included in the request
        let imageId;
        if (file) {
            // Create new image
            const newImage = new Image_1.Image({
                filename: file.filename,
                path: `public/images/${file.filename}`,
            });
            // Save image
            const savedImage = await newImage.save();
            imageId = savedImage._id;
        }
        // Add new offer
        const newOffer = new Offer_1.default({
            title: title,
            price: price,
            description: description,
            imageId: imageId
        });
        // Save offer
        newOffer.save();
        res.status(201).json(`Added offer '${title}'`);
    }
    catch (error) {
        console.error(error);
    }
});
exports.default = router;
// eof
