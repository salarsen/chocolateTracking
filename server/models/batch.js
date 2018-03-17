const mongoose = require('mongoose');
const { Schema } = mongoose;

const batchSchema = new Schema({
    barCount : {
        type : Number,
        required : true,
        default : 0,
    },
    status : {
        type : String,
        default : "New",
    },
    ingredients : [{
        _ingredientId : {
            type : Schema.Types.ObjectId,
            ref : 'Ingredient',
        },
        amount : {
            type : Number,
            required : true,
        },
    }],
    _addedBy : {
        type : Schema.Types.ObjectId,
        ref : 'User',
    },
},{
    timestamps : true,
});

module.exports = mongoose.model('Batch',batchSchema);