const mongoose = require("mongoose")

const balanceschema = mongoose.Schema({
  userid: String,
  balance: Number,
  buy: Boolean,
})

module.exports = mongoose.model("balance", balanceschema);