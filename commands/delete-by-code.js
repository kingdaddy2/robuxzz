const Discord = require("discord.js");
const client = new Discord.Client();
const mongoose = require('mongoose');
const data1 = require("../models/codes");
const inlinereply = require('discord-reply');
const talkedRecently = new Set();
const { MessageEmbed, MessageAttachment } = require('discord.js');

const owners = ["822881298620219422","888386857749069834"]

mongoose.connect('mongodb+srv://kingnew:kingnew@cluster0.7jeolu8.mongodb.net/newking', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });


module.exports.run = async (client, message, args, prefix, mes) => {
  let cooldown = 10 * 1000
  
  if (talkedRecently.has(message.author.id)) {
            const cooldownmessage = new MessageEmbed()
    .setColor('#ec1c24')
    .setTitle(`يجب عليك الانتظار لمدة ${Number(cooldown) / 1000} ثواني ، لإعادة استخدام هذا الامر`);
    
            message.channel.send(cooldownmessage)
    .then(async (m)=> {
             setTimeout(() => {
               m.delete()
             }, 3000) 
            })
    } else {
      
      
      
      talkedRecently.add(message.author.id);
        setTimeout(() => {
          // Removes the user from the set after a minute
          talkedRecently.delete(message.author.id);
        }, cooldown);
      
      

if (message.channel.type == "dm")
    return message.channel.send(
      `**يمكنك استخدام هذا الامر في السيرفر فقط**`
    );
  
  if(!owners.includes(message.author.id)) return message.channel.send(`**Only Owners Can use this command**`);

  
  if(!args[1]) return message.channel.send("يجب عليك ادخال الكود");
  
  
  let codesuser = await data1.findOne({
    codes: args[1]
  })

  if(!codesuser) {
    message.lineReply(`**الكود الذي قمت بادخاله غير صحيح**`);
  } else {
    data1.findOneAndDelete({
    codes: args[1]
    })
        .then(result => console.log(result))
        .catch(err => console.log(err));
    message.lineReply(`**تم مسح الكود ${args[1]} بنجاح**`)
  }

      
  
      
      
      
      
      
      

    }
};
  module.exports.config = {
  name: "delete-by-code",
  aliases: ["مسح-كود","مسح"]
};