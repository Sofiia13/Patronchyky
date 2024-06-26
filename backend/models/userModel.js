const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    name: {
        type: String,
        required : true,
    },
    password:{
        type: String,
        required : true
    },
    email: {
        type: String,
        required : true
    },
    verified: {
        type: Boolean,
        default: false
    },
    location: {
        type: {
            type: String,
            enum: ['Point'], // тип даних (точка)
            required: true
        },
        coordinates: {
            type: [Number], // масив чисел [довгота, широта]
            required: true
        }
    }
});

module.exports = mongoose.model('users', userSchema);