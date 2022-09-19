const mongoose = require("mongoose")

const memberbuyschema = mongoose.Schema({
  userid: String,
  buy: Boolean,
})

module.exports = mongoose.model("memberbuy", memberbuyschema);