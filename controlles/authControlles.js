import User from '../models/user.js';
import bcrypt from 'bcryptjs'
 

export const signUp = async (req, res) => {

    try {
        const { name, email, password } = req.body;
        // if (!name || !email || !password) {
        //     res.status(400).json({
        //         message: 'Please fill all the fields'
        //     })
        // }
        const user = await User.findOne({ email });
        if (user) {
            res.status(400).json({
                message: 'User already exists'
            })
        }


        // Hashbasword
        // const hashbassword = await bcrypt.hash(password, 10);
        // res.status(200).json({
        //     message: `Password hashed successfully`,
        //     hashbassword
        // })
        const hashbassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashbassword
        })
        try {
            await newUser.save();
            res.status(200).json({
                message: 'User created successfully',
                user: newUser
            })
        } catch (error) {
            console.log(error);
        }
    } catch (error) {
        res.status(400).json({
            message: `${error} : from catec`
        })
    }



}



export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // console.log("hi1")

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: 'User not found'
            })
        }
        // console.log("hi")

        // if (user.password == password) {
        //     res.status(200).json({
        //         message: `login Don successfully ${user.name}`
        //     })
        // } else {
        //     res.status(400).json({
        //         message: 'password is incorrect'
        //     })
        // }
        const isMatch = await bcrypt.compare(password, user.password);
        // console.log("pass")
        if (!isMatch) {
            res.status(400).json({
                message: 'password is incorrect'
            })
        }
        res.status(200).json({ message: `login Don successfully ${user.name}` })
    } catch (error) {
        res.status(500).json({
            message: `${error} =>there is error on catch`
        })
    }
}