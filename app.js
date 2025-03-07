import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoute from './routes/authRouter.js'
import homeRouter from './routes/homeRouter.js'
import cors from 'cors'
// const express = require('express');
// const dotenv = require('dotenv');
// const mongoose = require('mongoose');

// import User from './models/user.js';
const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();


// upload
import { fileURLToPath } from 'url';
import path from 'path';
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use("/uploads",express.static(path.join(__dirname , "uploads")))
app.use('/home', homeRouter);





// ارفع الصور واعمل ليها get دا تاسك






// user auth route
app.use('/auth', authRoute);

// 92uEwaneg9TmfofQ
let port = process.env.PORT;
const DB = process.env.DB;
app.listen(port, () => {
    console.log('Server is running on port 3000');
})

mongoose.connect(DB).then(() => {
    console.log('DB connection successful');
}).catch((err) => {
    console.log(err);
})


// {console.log(`${__filename}  AND:::    ${__dirname}`)};
    