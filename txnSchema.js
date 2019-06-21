let mongoose = require('mongoose')

let txnSchema = new mongoose.Schema({
    "tranID": {
        type: String,
        required: true,
        unique: true
    },
    "userName": String,
    "bankName": String,
    "txnAmt": Number
})

module.exports = mongoose.model("Txn", txnSchema)