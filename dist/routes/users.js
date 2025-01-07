"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = require("../models/User");
const router = (0, express_1.Router)();
// POST route to register an user
router.post("/register", async (req, res) => {
    try {
        // Check if a user with the given username already exists in the database
        const existingUser = await User_1.User.findOne({ username: req.body.username });
        if (existingUser) {
            res.status(403).json({ username: `User '${req.body.username}' already exists.` });
            return;
        }
        // Hash the password
        const salt = bcryptjs_1.default.genSaltSync(10);
        const hash = bcryptjs_1.default.hashSync(req.body.password, salt);
        // Create new user
        await User_1.User.create({
            username: req.body.username,
            password: hash
        });
        res.status(200).json({ message: "User registered successfully" });
        return;
    }
    catch (error) {
        console.error(`Error during registration: ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
        return;
    }
});
// POST route to register an user
router.get("/list", async (req, res) => {
    try {
        // Fetch users from the database
        const users = await User_1.User.findOne({}, { password: 0 });
        res.status(200).json({ users: users });
        return;
    }
    catch (error) {
        console.error(`Error fetching users: ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
        return;
    }
});
// // POST route to upload an offer
// router.post("/", upload.single("image"), async (req: Request, res: Response) => {
//   try {
//     // Parse request
//     const { title, price, description } = req.body;
//     const file = req.file;
//     // Validate request
//     if (!title) {
//       console.log("Invalid request; Offer must have a title");
//       res
//         .status(400)
//         .json({ message: "Invalid request; Offer must have a title" });
//       return;
//     }
//     if (!(price > 0)) {
//       console.log("Invalid request; Offer price must be greater than 0");
//       res
//         .status(400)
//         .json({ message: "Invalid request; Offer price must be greater than 0" });
//       return;
//     }
//     if (!description) {
//       console.log("Invalid request; Offer must have a description");
//       res
//         .status(400)
//         .json({ message: "Invalid request; Offer must have a description" });
//       return;
//     }
//     // Check if image file was included in the request
//     let imageId: any;
//     if (file) {
//       // Create new image
//       const newImage = new Image({
//         filename: file.filename,
//         path: `public/images/${file.filename}`,
//       });
//       // Save image
//       const savedImage = await newImage.save(); 
//       imageId = savedImage._id; 
//     }
//     // Add new offer
//     const newOffer = new Offer({
//       title: title,
//       price: price,
//       description: description,
//       imageId: imageId
//     });
//     // Save offer
//     newOffer.save();
//     res.status(201).json(`Added offer '${title}'`);
//   } catch (error) {
//     console.error(error)
//   }
// });
exports.default = router;
// eof
