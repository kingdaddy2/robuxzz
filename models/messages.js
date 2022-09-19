const mongoose = require("mongoose")

const amountschema = mongoose.Schema({
  serverid: String,
  amount: Number
})

module.exports = mongoose.model("amount", amountschema);