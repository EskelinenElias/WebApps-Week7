"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Connect to database
async function dbConnect(address) {
    try {
        // Configure mongoose
        mongoose_1.default.Promise = Promise;
        // Establish connection
        await mongoose_1.default.connect(address);
        // Add error handling
        mongoose_1.default.connection.on("error", console.error.bind(console, "Database connection error."));
        return mongoose_1.default.connection;
    }
    catch (error) {
        console.error("Could not connect to database", error);
        throw new Error("Could not connect to database");
    }
}
exports.default = dbConnect;
// eof
