const mongoose = require("mongoose")

const mentionschema = mongoose.Schema({
  guildid: String,
  mention: Boolean,
})

module.exports = mongoose.model("mention", mentionschema);