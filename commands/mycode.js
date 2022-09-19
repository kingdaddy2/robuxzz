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
      
      
      
  let mycodeinfo = await data1.findOne({
    userid: message.author.id,
  })
  
  if(!mycodeinfo) {
    message.lineReply("ليس لديك أي اكواد")
  } else {
    if(mycodeinfo.vaild == false || mycodeinfo.used >= mycodeinfo.uses){

    const codeinfoembed = new MessageEmbed()
    .setColor('#ec1c24')
    .setTitle(`Your-Code-Info`)
    .setDescription(`**\`${mycodeinfo.codes}\` كود منتهي الصلاحية**`)
    .addField("صاحب الكود", `<@${mycodeinfo.userid}>`)
    .addField("عدد الرصيد الذي يحصل عليه صاحب الكود", `${mycodeinfo.bonusowner}`)
    .addField("عدد الرصيد الذي يحصل عليه مستخدم الكود", `${mycodeinfo.bonus}`)
    .addField("الحد الاقصى لاستخدامات هذا الكود", `${mycodeinfo.uses}`)
    .addField("عدد المرات التي تم فيها استخدام هذا الكود", `${mycodeinfo.used}`);
    message.author.send(codeinfoembed)
    message.channel.send("**تم ارسال معلومات الكود الخاص بك في الخاص**")
    }
    else {
      const codeinfoembed = new MessageEmbed()
    .setColor('black')
    .setTitle(`Your-Code-Info`)
    .setDescription(`\`${mycodeinfo.codes}\``)
    .addField("صاحب الكود", `<@${mycodeinfo.userid}>`)
    .addField("عدد الرصيد الذي يحصل عليه صاحب الكود", `${mycodeinfo.bonusowner}`)
    .addField("عدد الرصيد الذي يحصل عليه مستخدم الكود", `${mycodeinfo.bonus}`)
    .addField("الحد الاقصى لاستخدامات هذا الكود", `${mycodeinfo.uses}`)
    .addField("عدد المرات التي تم فيها استخدام هذا الكود", `${mycodeinfo.used}`);
    message.author.send(codeinfoembed)
    message.channel.send("**تم ارسال معلومات الكود الخاص بك في الخاص**")
    }
    
    
    
    
  }
  
      
  
      
      
      
      
      
      

    }
};
  module.exports.config = {
  name: "my-code",
  aliases: []
};