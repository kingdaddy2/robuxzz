const Discord = require("discord.js");
const client = new Discord.Client();
const mongoose = require("mongoose");
const data = require("../models/balance");
const { MessageEmbed, MessageAttachment } = require('discord.js');
const balance = require("../models/balance.js");
const owners = ["822881298620219422"]
const talkedRecently = new Set();


module.exports.run = async (client, message, args, prefix) => {
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
      
      
      
  
    let balanceusers = await data.find({
      buy: false
    })
    
    if(balanceusers.length < 1) {
      message.lineReply(`**:rolling_eyes: -  السيرفر ليس به أي رصيد**`)
    } else {
     var msgs = ``
    var dn = false
    
    for(const d of balanceusers){
 if(msgs.length > 1900){
   const balanceusersembed = new MessageEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      .setColor('black')
      .setTitle(` عدد الاعضاء اللذين يمكلون رصيد : ${balanceusers.length}`)
      .setDescription(`\n${msgs}`);
await message.lineReply(balanceusersembed)
   msgs = ``
   dn = true
 }
      msgs = msgs + `العضو : <@${d.userid}>\n الرصيد : \`${d.balance}\``
      
    }
      const balanceusersembed = new MessageEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      .setColor('black')
      .setTitle(` عدد الاعضاء اللذين يمكلون رصيد : ${balanceusers.length}`)
      .setDescription(`\n${msgs}`);
    if(msgs) message.lineReply(balanceusersembed)
    if(dn === false && !msgs) client.createMessage("لا يوجد أي رصيد")
  }


      
      
  
      
      
      
      
      
      

    }
                                         
};

module.exports.config = {
  name: "alllist",
  aliases: ["رصيد"]
};
