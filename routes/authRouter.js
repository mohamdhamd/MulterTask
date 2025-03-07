import express from "express";

import { signUp,login } from '../controlles/authControlles.js'



const AuthRoute = express.Router();

// add user
AuthRoute.post('/signup', signUp )

// login 
AuthRoute.post('/login', login)


    // AuthRoute.get('/', (req, res) => {
    //     res.send('Auth Route is working!');
    // });

export default AuthRoute;