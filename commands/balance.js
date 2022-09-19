const Discord = require("discord.js");
const client = new Discord.Client();
const mongoose = require("mongoose");
const data = require("../models/balance");
const { MessageEmbed, MessageAttachment } = require('discord.js');
const balance = require("../models/balance.js");
const owners = ["822881298620219422","888386857749069834","709744240821010462","923288387471941632"]
const talkedRecently = new Set();

mongoose.connect("mongodb+srv://kingnew:kingnew@cluster0.7jeolu8.mongodb.net/newking", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

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
      
      
      
  if (message.channel.type === "dm") {
    let ticketroom = "907310137818099802";
    let balanceuser = await data.findOne({
      userid: message.author.id
    });

    
    if(!args[1]) {
      
      const balance = new MessageEmbed()
    .setColor('black')
    .setTitle(`**رصيدك الحالي من الروبكس هو ` +
          "`" +
          `R0` +
          "`**");
    
    if (!balanceuser) {
      message.author.send(balance);
      const dataaa = new data({
        _id: mongoose.Types.ObjectId(),
        userid: message.author.id,
        balance: 0,
        buy: false
      });

      dataaa
        .save()
        .then(result => console.log(result))
        .catch(err => console.log(err));
    } else {
      let balancemember = balanceuser.balance;
      
      const balance = new MessageEmbed()
    .setColor('black')
    .setTitle(`**رصيدك الحالي من الروبكس هو ` +
          "`" +
          `${balancemember}R` +"`**");
      
      message.author.send(balance);
      console.log(balancemember);
    }
  } else {
    const only = new MessageEmbed()
    .setColor('black')
    .setDescription(`**للتحويل استخدم الامر\n!transfer**`)
    return message.channel.send(only);
  }
} else{
  const only = new MessageEmbed()
    .setColor('black')
    .setDescription(`**يمكنك استخدام هذا الامر في خاص البوت فقط**`)
  if(!owners.includes(message.author.id)) return message.channel.send("<@"+ client.user.id +">", only);
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

let balanceuserr = await data.findOne({
      userid: member.id
    });
  if (!balanceuserr) {
    const balance = new MessageEmbed()
    .setColor('black')
    .setDescription(`**رصيد <@${member.id}> الحالي من الروبكس هو ` +
          "`" +
          `R0` +
          "`**");
      message.author.send(balance);
      const dataaa = new data({
        _id: mongoose.Types.ObjectId(),
        userid: member.id,
        balance: 0,
        buy: false
      });

      dataaa
        .save()
        .then(result => console.log(result))
        .catch(err => console.log(err));
    } else {
      let balancemember = balanceuserr.balance;
      
      const balance = new MessageEmbed()
    .setColor('black')
    .setDescription(`**رصيد <@${member.id}> الحالي من الروبكس هو ` +
          "`" +
          `${balancemember}R` +"`**");
      
      message.channel.send(balance);
      console.log(balancemember);
    }
}


      
      
  
      
      
      
      
      
      

    }
};

module.exports.config = {
  name: "balance",
  aliases: ["رصيد"]
};
