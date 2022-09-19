const mongoose = require("mongoose")

const codesschema = mongoose.Schema({
  userid: String,
  codes: String,
  bonus: Number,
  bonusowner: Number,
  uses: Number,
  used: Number,
  vaild: Boolean,
})

module.exports = mongoose.model("codes", codesschema);