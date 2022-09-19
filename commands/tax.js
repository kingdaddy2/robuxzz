const data = require("../models/balance");
const Discord = require("discord.js");
const { MessageEmbed, MessageAttachment } = require('discord.js');
const client = new Discord.Client();
const cooldown = new Set();
const talkedRecently = new Set();
const mongoose = require('mongoose');
const sdb = require("../models/system");

module.exports.run = async (client, message, args, prefix, mes) => {
  let cooldown = 1
  
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
      
      let system = await sdb.findOne({
    guildid: "868525050884685844",
  })
  if (!system) return message.channel.send("**يجب عليك تسجيل معلومات الجروب اولا ، تواصل مع اونر السيرفر لحل المشكله**");
let balanceuser = await data.findOne({
  userid: message.author.id
})
      
      
      
      
  if (message.channel.type == "dm")
    return message.channel.send(
      `**يمكنك استخدام هذا الامر في السيرفر فقط**`
    );
let price = system.robuxprice
let price1 = Math.floor((price * 20) / 19) + 1
let priceall = Number(args[1]) * price1
let priceboost = system.boostoff
let priceboost1 = Math.floor((priceboost * 20) / 19) + 1
let priceboostall = Number(args[1]) * priceboost1


if(!args[1]) return message.channel.send('**الرجاء كتابة عدد الروبكس بعد الامر\nمثال :\n!tax 10**');
if (!args[1] || args[1].includes('.') || args[1].includes('-') || args[1].includes('+') || args[1].includes('e') || !Number(Number(args[1])))
    return message.channel.send(
      `**الرجاء كتابة رقم صحيح بعد الامر\nمثال :\n!tax 10**`
    );
  
  const embed = new MessageEmbed()
    .setColor('black')
    .setTitle('Robux Tax')
   // .setDescription(`**- Quantity: \`(${args[1]})\`\n- Value: \`(1 robux = ${price})\`**`)
    .addField('Price Robux With Tax:', '```' + priceall + '```')
    .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }));
      
      const embed2 = new MessageEmbed()
    .setColor('black')
    .setTitle('Robux Tax')
   // .setDescription(`**- Quantity: \`(${args[1]})\`\n- Value: \`(1 robux = ${price})\`**`)
    .addField('Price Robux With Tax and boost off:', '```' + priceboostall + '```')
    .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }));
      
      if(message.member.roles.cache.find(r => r.id === system.boostrole)) {
        message.channel.send(embed2);
      } else {
       message.channel.send(embed); 
      }
  
      
      
      
      
      
      
      
    }
};
  module.exports.config = {
  name: "tax",
  aliases: ["ضريبة"]
};
