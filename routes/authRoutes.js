import express from 'express'
import { 
    forgotPasswordController,
    loginController,
    registerController, 
    testContoller 
    } from '../controllers/authControllers.js';

const router = express.Router();

// registration
router.post('/register',registerController);

//login
router.post('/login',loginController);

//reset password
router.put('/reset-password',forgotPasswordController);


export default router;
