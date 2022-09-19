const mongoose = require("mongoose");

const usedcodesschema = mongoose.Schema({
  userid: String,
  code: String,
  used: Boolean
});

module.exports = mongoose.model("usedcodes", usedcodesschema);
