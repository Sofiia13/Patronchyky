const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const organizationSchema = new Schema({
    name: {
        type: String,
        required : true,
    },
    password: {
        type: String,
        maxlength: 15, 
        required: true
    },
    description: {
        type: String,
        maxlength: 1000
    },
    phoneNum: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: 'tasks'
    }],
    verified: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('organizations', organizationSchema);