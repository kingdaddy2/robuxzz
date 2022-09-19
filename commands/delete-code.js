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

  
  let mention = true
  let member = message.mentions.users.first()
  if(!member) {
let member1 = await message.guild.members.cache.get(args[1])
if(!member1) return message.lineReply("**:rolling_eyes: -  لا يمكنني العثور على هذا العضو**"); 
    mention = false
member = member1
}  else {
  member =  message.guild.members.cache.get(message.mentions.users.first().id)
}
if(member){
mention = true
}
      
  
  let codesuser = await data1.findOne({
    userid: member.id
  })

  if(!codesuser) {
    message.lineReply(`**هذا الشخص لا يملك اي اكواد**`);
  } else {
    data1.findOneAndDelete({
    userid: member.id
    })
        .then(result => console.log(result))
        .catch(err => console.log(err));
    message.lineReply(`**تم مسح الكود الخاص بـ <@${member.id}> بنجاح**`)
  }
  
      
      
      
      
      
      

    }
};
  module.exports.config = {
  name: "delete-code",
  aliases: ["مسح-كود","مسح"]
};