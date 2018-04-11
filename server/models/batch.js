const mongoose = require('mongoose');
const { Schema } = mongoose;

const batchSchema = new Schema({
    name : {
        type : String,
    },
    barCount : {
        type : Number,
        required : [true, "Number of bars is required."],
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
            required : [true, "Using an ingredient requires that you add an amount."],
        },
    }],
    notes : [{
        type : String,
    }],
    _addedBy : {
        type : Schema.Types.ObjectId,
        ref : 'User',
    },
},{
    timestamps : true,
});

module.exports = mongoose.model('Batch',batchSchema);