import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes.js'
import connectDB from './mongodb.js'

dotenv.config();

const app = express();

connectDB;

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use('/etext/api/v1/auth',authRoutes);

const PORT = process.env.PORT||8000;
app.listen(PORT,()=>{
    console.log(`Server Running on PORT ${PORT}`);
})