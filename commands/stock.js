const noblox = require('noblox.js')
const owners = ["822881298620219422","888386857749069834","709744240821010462"]
const { MessageEmbed, MessageAttachment } = require('discord.js');
const talkedRecently = new Set();
const sdb = require("../models/system");
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://kingnew:kingnew@cluster0.7jeolu8.mongodb.net/newking', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });


module.exports.run = async (client, message, args, prefix, mes) => {
  let cooldown = 3 * 1000
  
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
      
      
      
      
  if(!owners.includes(message.author.id)) return message.channel.send(`**Only Owners Can use this command**`);
  let system = await sdb.findOne({
    guildid: "868525050884685844",
  })
  if (!system) return message.channel.send("**يجب عليك تسجيل معلومات الجروب اولا ، تواصل مع اونر السيرفر لحل المشكله**");

      noblox.setCookie(system.groupCookie)
      var Group = await noblox.getGroup(parseInt(system.groupid));
    let bla = await noblox.getGroupFunds(parseInt(system.groupid));
  const embed = new MessageEmbed()
    .setColor('black')
    .setTitle(`**عدد الروبكس الحالي في الجروب هو : ${bla}**`)
    message.channel.send(embed);
  
  
      
      
  
      
      
      
      
      
      

    }
};
  module.exports.config = {
  name: "stock",
  aliases: ["روبوكس"]
};