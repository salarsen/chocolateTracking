const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    username : {
        type : String,
        required : true,
        trim : true,
    }
},{
    timestamps : true,
});

module.exports = mongose.model('User',userSchema);