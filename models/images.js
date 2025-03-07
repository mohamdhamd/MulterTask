import mongoose from 'mongoose';
const imageShema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    id: {
        type: String,
        required: true,
        // unique: true
    },
    

}, {
    timestamps: true
});

const Image = mongoose.model('Image', imageShema);
export default Image;
