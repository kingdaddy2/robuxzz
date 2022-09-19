const Discord = require("discord.js");
const client = new Discord.Client();
const mongoose = require('mongoose');
const data1 = require("../models/codes");
const { MessageEmbed, MessageAttachment } = require('discord.js');
const inlinereply = require('discord-reply');
const talkedRecently = new Set();



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
      
      
      
      
  
  if(!args[1]) return message.channel.send("يجب عليك ادخال الكود");
  let codeinfo = await data1.findOne({
    codes: args[1]
  })
  
  if(!codeinfo){
    message.lineReply("الرجاء ادخال كود صحيح")
  } else {
    if(codeinfo.vaild == false || codeinfo.used >= codeinfo.uses){

    const codeinfoembed = new MessageEmbed()
    .setColor('#ec1c24')
    .setTitle(`Code-Info`)
    .setDescription(`**\`${codeinfo.codes}\` كود منتهي الصلاحية**`)
    .addField("صاحب الكود", `<@${codeinfo.userid}>`)
    .addField("عدد الرصيد الذي يحصل عليه صاحب الكود", `${codeinfo.bonusowner}`)
    .addField("عدد الرصيد الذي يحصل عليه مستخدم الكود", `${codeinfo.bonus}`)
    .addField("الحد الاقصى لاستخدامات هذا الكود", `${codeinfo.uses}`)
    .addField("عدد المرات التي تم فيها استخدام هذا الكود", `${codeinfo.used}`);
    message.channel.send(codeinfoembed)
    }
    else {
      const codeinfoembed = new MessageEmbed()
    .setColor('black')
    .setTitle(`Code-Info`)
    .setDescription(`\`${codeinfo.codes}\``)
    .addField("صاحب الكود", `<@${codeinfo.userid}>`)
    .addField("عدد الرصيد الذي يحصل عليه صاحب الكود", `${codeinfo.bonusowner}`)
    .addField("عدد الرصيد الذي يحصل عليه مستخدم الكود", `${codeinfo.bonus}`)
    .addField("الحد الاقصى لاستخدامات هذا الكود", `${codeinfo.uses}`)
    .addField("عدد المرات التي تم فيها استخدام هذا الكود", `${codeinfo.used}`);
    message.channel.send(codeinfoembed)
    }
  }
  

  
      
      
      
      
      

    }
};
  module.exports.config = {
  name: "code-info",
  aliases: []
};