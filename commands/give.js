const Discord = require("discord.js");
const client = new Discord.Client();
const mongoose = require('mongoose');
const data = require("../models/balance");
const talkedRecently = new Set();
const { MessageEmbed, MessageAttachment } = require('discord.js');

const owners = ["822881298620219422","888386857749069834","210454828290277376","396201174052765706","923288387471941632"]

mongoose.connect('mongodb+srv://kingnew:kingnew@cluster0.7jeolu8.mongodb.net/newking', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });


module.exports.run = async (client, message, args, prefix) => {
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
      
      
      
 let ch = client.channels.cache.get("946482833722081360");
 let ch2 = client.channels.cache.get("890672030360412160")
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
      
  if (!args[2]) return message.channel.send(`**الرجاء كتابة عدد الرصيد المراد اعطاؤه للشخص\nمثال :\n\`-\` !give 10 463208341804548097**`)
  if (!Number(Number(args[2])))return message.channel.send(`**الرجاء كتابة عدد الرصيد المراد اعطاؤه للشخص ويجب أن يكون رقم صحيح\nمثال :\n\`-\` !give 10 463208341804548097**`);

  
  
  
let filter = m => m.author.id === message.author.id
    message.channel.send(`هل أنت متأكد أنك تريد تحويل ${args[2]} لـ <@${member.id}> ?? \`YES\` / \`NO\``).then(() => {
      message.channel.awaitMessages(filter, {
          max: 1,
          time: 30000,
          errors: ['time']
        })
        .then(async message => {
          message = message.first()
          if (message.content.toUpperCase() == 'YES' || message.content.toUpperCase() == 'Y') {
               let balanceuser = await data.findOne({
  userid: member.id
})

        if(!balanceuser){
          ch.send(`**تم تحويل ${args[2]} رصيد من قبل <@${message.author.id}> لـ <@${member.id}> **`)
          ch2.send(`**تم تحويل ${args[2]} رصيد من قبل <@${message.author.id}> لـ <@${member.id}> **`)
         message.channel.send(`**تم تحويل الرصيد بنجاح, رصيد حساب <@${member.id}> الحالي هو \`${args[2]}R\`**`)  
    const dataaa = new data({
            _id: mongoose.Types.ObjectId(),
            userid: member.id,
            balance: Number(args[2]),
      buy: false,
        });
        
        dataaa.save()
        .then(result => console.log(result))
        .catch(err => console.log(err));
  } else {
    balanceuser.updateOne({balance: Number(balanceuser.balance) + Number(args[2])})
      .then(result => console.log(result))
        .catch(err => console.log(err))
      .then(m => {
      ch.send(`**تم تحويل ${args[2]} رصيد من قبل <@${message.author.id}> لـ <@${member.id}> **`)
      ch2.send(`**تم تحويل ${args[2]} رصيد من قبل <@${message.author.id}> لـ <@${member.id}> **`)
      message.channel.send(`**تم تحويل الرصيد بنجاح, رصيد حساب <@${member.id}> الحالي هو \`${balanceuser.balance + Number(args[2])}R\`**`)  
    });
  };
          } else if (message.content.toUpperCase() == 'NO' || message.content.toUpperCase() == 'N') {
            message.channel.send(`**تم الغاء العملية**`)
          } else {
            message.channel.send(`**تم الغاء العملية : رد غير صحيح**`)
          }
        })
        .catch(collected => {
            message.channel.send('Timeout');
        });
    })
    
  
         
  
  

      
      
  
      
      
      
      
      
      

    }
};
module.exports.config = {
  name: "give",
  aliases: ["اعطاء"]
};