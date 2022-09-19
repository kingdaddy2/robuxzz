const Discord = require("discord.js");
const client = new Discord.Client();
const mongoose = require('mongoose');
const data = require("../models/balance");
const data1 = require("../models/codes");
const data2 = require("../models/usedcodes");
var randomId = require('random-id');
const { MessageEmbed, MessageAttachment } = require('discord.js');
const inlinereply = require('discord-reply');
const talkedRecently = new Set();
let moment = require('moment')
let ms = require('ms')


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
//if(message.channel.id !== "907241460934541362") return message.channel.send(`${message.author} , لا يمكنك استخدام هذا الامر هنا ، يجب عليك التوجه الى روم <#907241460934541362>`);
      

  if((Date.now() - moment(message.member.joinedAt)) > 86000) return message.channel.send("لا تستطيع استخدام هذا الكود ، فهو مخصص لفئة معينه");
  if(!args[1]) return message.channel.send("**يجب عليك ادخال الكود\n!use-code [code]**");
  
  let codeused = await data1.findOne({
    codes: args[1]
  });
  if (!codeused) {
    message.channel.send("**هذا الكود غير صحيح**")
  } else {
    if(codeused.userid === message.author.id) { 
  message.delete()
  message.channel.send("**لا يمكنك استخدام الكود الخاص بك ، <@"+`${message.author.id}> !!**`);
                                              
  } else 
    {
    if(codeused.vaild === false) {
      const notvaild = new MessageEmbed()
      .setColor('#ec1c24')
      .setTitle(`**هذا الكود وصل الى الحد الاقصى من المستخدمين وانتهت صلاحيته**`);
      message.channel.send(notvaild);
    } else {
      if(codeused.used < codeused.uses) {
      let bonuscode = codeused.bonus
      let ifusedcode = await data2.findOne({
        userid: message.author.id,
        code: args[1],
      })
      
      if(!ifusedcode){
        let balanceuser = await data.findOne({
          userid: message.author.id
        })
        let balanceuser2 = await data.findOne({
          userid: codeused.userid
        })
        
        if(!balanceuser) {
          
          const dataaa = new data({
        _id: mongoose.Types.ObjectId(),
        userid: message.author.id,
        balance: bonuscode,
        buy: false
      });
          dataaa
        .save()
        .then(result => console.log(result))
        .catch(err => console.log(err));
          
          
          const dataaaa = new data2({
          userid: message.author.id,
          code: args[1],
          used: true,
        })
        
        dataaaa
        .save()
        .then(result => console.log(result))
        .catch(err => console.log(err));
          
          ///////////////////
          codeused.updateOne({
            used: Number(codeused.used) + 1
          })
          .then(result => console.log(result))
        .catch(err => console.log(err));
          ////////////////////////
          const bonusMessage = new MessageEmbed()
          .setColor('black')
          .setDescription(` تم استخدام الكود بنجاح ، تم اضافة ${bonuscode} روبكس لرصيدك ، رصيدك الحالي هو \`${bonuscode}\``);
          message.delete()
          message.channel.send(`<@${message.author.id}>`,bonusMessage)
          
          if(!balanceuser2){
            const dataaa = new data({
        _id: mongoose.Types.ObjectId(),
        userid: codeused.userid,
        balance: codeused.bonusowner,
        buy: false
      });
          dataaa
        .save()
        .then(result => console.log(result))
        .catch(err => console.log(err));
            client.users.fetch(codeused.userid, false).then((user) => {
 user.send(`لقد قام شخص باستخدام كودك ، تم اضافة ${codeused.bonusowner} روبكس لرصيدك ، رصيدك الحالي هو ${balanceuser2.balance + codeused.bonusowner}\nعدد استخدامات كودك حتى الان هي: \`${codeused.used + 1}\``);
            
            })
          } else {
            balanceuser2.updateOne({balance: Number(balanceuser2.balance) + Number(codeused.bonusowner)})
            .then(result => console.log(result))
        .catch(err => console.log(err));
            
            client.users.fetch(codeused.userid, false).then((user) => {
 user.send(`لقد قام شخص باستخدام كودك ، تم اضافة ${codeused.bonusowner} روبكس لرصيدك ، رصيدك الحالي هو ${balanceuser2.balance + codeused.bonusowner}\nعدد استخدامات كودك حتى الان هي: \`${codeused.used + 1}\``);
            
            })
            }
          
        } else {
          
          balanceuser.updateOne({balance: Number(balanceuser.balance) + Number(bonuscode)})
          .then(result => console.log(result))
        .catch(err => console.log(err));
          
          const dataaaa = new data2({
          userid: message.author.id,
          code: args[1],
          used: true,
        })
        
        dataaaa
        .save()
        .then(result => console.log(result))
        .catch(err => console.log(err));
          
          codeused.updateOne({
            used: Number(codeused.used) + 1
          })
          .then(result => console.log(result))
        .catch(err => console.log(err));
          const bonus2message = new MessageEmbed()
          .setColor('black')
          .setTitle(` تم استخدام الكود بنجاح ، تم اضافة ${bonuscode} روبكس لرصيدك ، رصيدك الحالي هو \`${balanceuser.balance + bonuscode}\``);
          message.delete()
          message.channel.send(`<@${message.author.id}>`,bonus2message).then(() => {
            if(!balanceuser2){
            const dataaa = new data({
        _id: mongoose.Types.ObjectId(),
        userid: codeused.userid,
        balance: codeused.bonusowner,
        buy: false
      });
          dataaa
        .save()
        .then(result => console.log(result))
        .catch(err => console.log(err));
            client.users.fetch(codeused.userid, false).then((user) => {
 user.send(`لقد قام شخص باستخدام كودك ، تم اضافة ${codeused.bonusowner} روبكس لرصيدك ، رصيدك الحالي هو ${balanceuser2.balance + codeused.bonusowner}\nعدد استخدامات كودك حتى الان هي: \`${codeused.used + 1}\``);
            
            })
          } else {
            balanceuser2.updateOne({balance: Number(balanceuser2.balance) + Number(codeused.bonusowner)})
            .then(result => console.log(result))
        .catch(err => console.log(err));
            
            client.users.fetch(codeused.userid, false).then((user) => {
 user.send(`لقد قام شخص باستخدام كودك ، تم اضافة ${codeused.bonusowner} روبكس لرصيدك ، رصيدك الحالي هو ${balanceuser2.balance + codeused.bonusowner}\nعدد استخدامات كودك حتى الان هي: \`${codeused.used + 1}\``);
            
            })
            }
          })
        }
      } else {
        const notvaildforyou = new MessageEmbed()
        .setColor('#ec1c24')
        .setTitle("لقد قمت باستخدام هذا الكود بالفعل من قبل")
        message.delete()
          message.channel.send(`<@${message.author.id}>,`,notvaildforyou)
      }
    } else { 
    if(codeused.used >= codeused.uses) {
      codeused.updateOne({
            vaild: false
          })
      .then(result => console.log(result))
        .catch(err => console.log(err));
      const notv = new MessageEmbed()
      .setColor('#ec1c24')
      .setTitle(`**هذا الكود وصل الى الحد الاقصى من المستخدمين وانتهت صلاحيته**`);
      message.channel.send(notv)
    } 
    }
    }
  
  }
  }
    }
  
};
  module.exports.config = {
  name: "use-code",
  aliases: []
};