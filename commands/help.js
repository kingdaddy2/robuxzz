const Discord = require('discord.js')
const client = new Discord.Client()
const data = require('../models/balance')
const { MessageEmbed, MessageAttachment } = require('discord.js');
const talkedRecently = new Set();



module.exports.run = async (client, message, args, prefix) => {
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
      
      
      
  if(message.channel.type === "dm") {
    const embed = new MessageEmbed()
    .setColor('black')
    .setTitle('RobuxHelp')
   // .setDescription(`**- Quantity: \`(${args[1]})\`\n- Value: \`(1 robux = ${price})\`**`)
    .addField('Balance command:', '```' + prefix + "balance" + '```')
    .addField('transfer command:', '```' + prefix + "transfer" + '```')
    .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }));
message.channel.send(embed);
  } else {
    const embed = new MessageEmbed()
    .setColor('black')
    .setTitle('RobuxHelp')
   // .setDescription(`**- Quantity: \`(${args[1]})\`\n- Value: \`(1 robux = ${price})\`**`)
    .addField('Tax command:', '```' + prefix + "tax" + '```')
    .addField('buy command:', '```' + prefix + "buy" + '```')
    .addField('credits command:','```' + prefix + "c" + '```')
    .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }));
message.channel.send(embed);
  }
      
  
      
      
      
      
      
      

    }
}

module.exports.config = {
    name: "help",
    aliases: ["مساعدة","أوامر"]
}
