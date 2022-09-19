const data = require("../models/balance");
const Discord = require("discord.js");
const client = new Discord.Client();
const cooldown = new Set();
const { MessageEmbed, MessageAttachment } = require('discord.js');
const talkedRecently = new Set();

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
      
      
      
  
      
if (!message.channel.name.startsWith("ticket")) return;
          let balanceuser = await data.findOne({
  userid: message.author.id
})
            let ticketroom = "907310137818099802";
if(balanceuser.buy === true) {
            balanceuser.updateOne({buy:false})
  .then(result => console.log(result))
        .catch(err => console.log(err))
    message.channel.send(`**سوف يتم حذف التكت خلال 5 ثواني\nقم بفتح تكت جديد لعملية شراء جديدة <#${ticketroom}>\n<@${message.author.id}>**`)
  setTimeout(() => {
    message.channel.delete()
            }, 5000);
} else {
  const embed = new MessageEmbed()
    .setColor('black')
    .setTitle(`ليس لديك عمليات لالغائها!!`);
  message.channel.send(embed)
}


      
      
      
      
      
talkedRecently.add(message.author.id);
        setTimeout(() => {
          // Removes the user from the set after a minute
          talkedRecently.delete(message.author.id);
        }, cooldown);
    }
};
  module.exports.config = {
  name: "end",
  aliases: ["الغاء"]
};
