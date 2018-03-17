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
    amountUsed : {
        type : Number,
        default : 0,
    },
    used : {
        type : Boolean,
        default : false,
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
    _batches : [{
        type : Schema.Types.ObjectId,
        ref : 'Ingredient',
    }],
    _addedBy : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true,
    }
},{
    timestamps: true,
});

ingredientSchema.pre('save',function(next){
    this.used = (this.amountUsed >= this.amount);

    next();
})

module.exports = mongoose.model('Ingredient', ingredientSchema);