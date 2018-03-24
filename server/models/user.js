const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    username : {
        type : String,
        required : [true, "Username is required."],
        trim : true,
    }
},{
    timestamps : true,
});

module.exports = mongoose.model('User',userSchema);