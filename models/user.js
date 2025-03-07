import mongoose from 'mongoose';
const userShema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim:true
    },
    email: {
        type: String,
        required: true,
        // unique: true
    },
    password: {
        type: String,
        required: true
    }

}, {
    timestamps: true
});

const User = mongoose.model('User', userShema);
export default User;
