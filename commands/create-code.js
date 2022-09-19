const Discord = require("discord.js");
const client = new Discord.Client();
const mongoose = require('mongoose');
const data = require("../models/balance");
const data1 = require("../models/codes");
var randomId = require('random-id');
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
  if(!args[2]) return message.channel.send("**يجب عليك ادخال عدد الروبكس اللذي سيحصل عليه عند استخدام الكود\n!create-code [userid] [bonus ] [uses] [bonusowner]**");
  if(!args[2] || args[2].includes('.') || args[2].includes('-') || args[2].includes('+') || args[2].includes('e') || !Number(Number(args[2]))) return message.channel.send("**يجب عليك ادخال عدد صحيح\n!create-code [ايدي صاحب الكود] [ العدد اللي ياخذه لما يستخدم الكود ] [الحد الاقصى لعدد استخدامات الكود] [عدد اللي الاونر ياخذه لما يستخدم  شخص الكود]**");
  if(!args[3]) return message.channel.send("**يجب عليك ادخال عدد المستخدمين\n!create-code [userid] [bonus ] [uses] [bonusowner]**");
  if(!args[3] || args[3].includes('.') || args[3].includes('-') || args[3].includes('+') || args[3].includes('e') || !Number(Number(args[3]))) return message.channel.send("**يجب عليك ادخال عدد صحيح\n!create-code [ايدي صاحب الكود] [ العدد اللي ياخذه لما يستخدم الكود ] [الحد الاقصى لعدد استخدامات الكود] [عدد اللي الاونر ياخذه لما يستخدم  شخص الكود]**");
  if(!args[4]) return message.channel.send("**يجب عليك ادخال عدد المستخدمين\n!create-code [userid] [bonus ] [uses] [bonusowner]**");
  if(!args[4] || args[4].includes('.') || args[4].includes('-') || args[4].includes('+') || args[4].includes('e') || !Number(Number(args[4]))) return message.channel.send("**يجب عليك ادخال عدد صحيح\n!create-code [ايدي صاحب الكود] [ العدد اللي ياخذه لما يستخدم الكود ] [الحد الاقصى لعدد استخدامات الكود] [عدد اللي الاونر ياخذه لما يستخدم  شخص الكود]**");
  
  
  
  
  
  let codesuser = await data1.findOne({
    userid: member.id
  })
  
  
  var newcode = randomId(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
  var newcode1 = randomId(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
  var newcode2 = randomId(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
  var newcode3 = randomId(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
  let thenewcode = `${newcode}-${newcode1}-${newcode2}-${newcode3}`

  
  if (!codesuser) {
    
    let filter = m => m.author.id === message.author.id


    message.channel.send(`هل أنت متأكد من أنك تريد صنع كود الآتي :\n
    صاحب الكود هو : <@${member.id}>
    العدد الذي يحصل عليه مستخدم الكود هو : ${args[2]}
    العدد الذي يحصل عليه صاحب الكود هو : ${args[4]}
    الحد الاقصى لاستخدامات الكود هو : ${args[3]}

للتأكيد اكتب \`Y\`
للالغاء اكتب \`N\`
    `)
      
      
      .then(() => {
      message.channel.awaitMessages(filter, {
          max: 1,
          time: 30000,
          errors: ['time']
        })
        .then(async message => {
          message = message.first()
          if (message.content.toUpperCase() == 'YES' || message.content.toUpperCase() == 'Y') {
            const dataaa = new data1({
  userid: member.id,
  codes: thenewcode,
  bonus: args[2],
  uses: args[3],
  bonusowner: args[4],
  used: 0,
  vaild: true,
})
    
    dataaa
        .save()
        .then(result => console.log(result))
        .catch(err => console.log(err));
    
    message.lineReply(`**تم انشاء الكود الخاص بـ <@${member.id}> بنجاح الكود هو:\n\`${thenewcode}\`**`)
    client.users.fetch(member.id, false).then((user) => {
 user.send(`**تم انشاء الكود الخاص بـك <@${member.id}> بنجاح الكود هو:\n\`${thenewcode}\`\nعدد الروبكس الذي تحصل عليه عند استخدام كودك هو: ${args[4]}\nعدد الروبكس الذي يحصل عليه الشخص المستخدم لكودك: ${args[2]}\nالحد الاقصى لاستخدامات كودك: ${args[3]}**`);
});
            
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
    
    } else {
    message.lineReply(`هذا المستخدم لديه كود بالفعل: \`${codesuser.codes}\`\nلحذف الكود الخاص به قم بكتابة الامر:\n\`!delete-code [userid]\`\nلمعرفة معلومات عن الكود قم بكتابة الامر:\n\`!code-info [code]\``)
  }
    
 
  
  
      
      
      
      
      
      

    }
};
  module.exports.config = {
  name: "create-code",
  aliases: ["انشاء-كود","انشاء"]
};