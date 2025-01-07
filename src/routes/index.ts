import { Router } from "express";
import userRouter from './users';

// Create router
const router = Router();

// Add routes
router.use("/api/users", userRouter);

export default router;

// eof









