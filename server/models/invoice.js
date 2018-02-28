const mongoose = require('mongoose');
const { Schema } = mongoose;

const invoiceSchema = new Schema({

},{
    timestamps : true,
});

module.exports = mongoose.model('Invoice',invoiceSchema);