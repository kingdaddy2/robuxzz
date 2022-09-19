const Discord = require("discord.js");
const client = new Discord.Client();
const mongoose = require('mongoose');
const mdb = require("../models/mention");
const owners = ["822881298620219422","888386857749069834"]

mongoose.connect('mongodb+srv://kingnew:kingnew@cluster0.7jeolu8.mongodb.net/newking', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

module.exports.run = async (client, message, args, prefix, mes) => {
  console.log("test")
  if(!owners.includes(message.author.id)) return message.channel.send(`**Only Owners Can use this command**`);
  
  let mentiononoff = await mdb.findOne({
    guildid: "868525050884685844"
  })
  
  if (!mentiononoff) {
    const dataaa = new mdb({
            guildid: message.channel.guild.id,
            mention: false,
        });
        
        dataaa.save()
        .then(result => console.log(result))
        .catch(err => console.log(err));
    
    message.channel.send("تم اغلاق المنشن بنجاح")
  } else {
    if(mentiononoff.mention == false){
      mentiononoff.updateOne({mention: true})
      .then(result => console.log(result))
        .catch(err => console.log(err))
      
      message.channel.send("تم فتح المنشن بنجاح")
    } else {
      mentiononoff.updateOne({mention: false})
      .then(result => console.log(result))
        .catch(err => console.log(err))
      
      message.channel.send("تم اغلاق المنشن بنجاح")
    }
  }
  
};
  module.exports.config = {
  name: "m",
  aliases: []
};