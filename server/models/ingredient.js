const mongoose = require('mongoose');
const { Schema } = mongoose;

const ingredientSchema = new Schema({
    name : {
        type : String,
        required : true,
        trim : true,
    },
    supplier : {
        type : String,
        required : true,
        trim : true,
    },
    supplierLotNo : {
        type : String,
        required: true,
        trim : true,
    },
    recalled : {
        type : Boolean,
        required : true,
        trim : true,
        default : false,
    },
    recallDate : {
        type : Date,
        trim : true,
    },
    shippingTrackingNo : {
        type : String,
        trim : true,
    },
    shippingSignedFor : {
        type : String,
        required: true,
        trim : true,
    },
    amount : {
        type : Number,
        required : true,
        default : 0,
    },
    amountType : {
        type : String,
        required : true,
    },
    // _invoice : {
    //     type : Schema.Types.ObjectId,
    //     ref : 'Invoice',
    //     // required : true,
    // },
    _addedBy : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true,
    }
},{
    timestamps: true,
});

module.exports = mongoose.model('Ingredient', ingredientSchema);