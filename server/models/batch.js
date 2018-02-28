const mongoose = require('mongoose');
const { Schema } = mongoose;

const batchSchema = new Schema({
    date : {
        type : Date,
        required : true,
    },
    barCount : {
        type : Number,
        required : true,
        default : 0,
    },
    ingredients : [{
        _ingredientId : {
            type : Schema.Types.ObjectId,
            ref : 'Ingredient',
        },
        amountUsed : {
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