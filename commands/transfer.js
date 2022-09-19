const talkedRecently = new Set();
const Discord = require("discord.js");
const client = new Discord.Client();
const { MessageEmbed, MessageAttachment } = require('discord.js');
const mongoose = require('mongoose');
const data = require("../models/balance");
const sdb = require("../models/system");
const noblox = require('noblox.js');
const { createCanvas, loadImage } = require('canvas');
const owners = ["822881298620219422","888386857749069834"]



mongoose.connect('mongodb+srv://kingnew:kingnew@cluster0.7jeolu8.mongodb.net/newking', {
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
      
      
           //   if(!owners.includes(message.author.id)) return message.channel.send(`**Only Owners Can use this command**`);

      
      if (message.channel.type === "dm") {
  let ticketroom = "907310137818099802"
  
  let system = await sdb.findOne({
    guildid: "868525050884685844",
  })
  if (!system) return message.channel.send("**يجب عليك تسجيل معلومات الجروب اولا ، تواصل مع اونر السيرفر لحل المشكله**");
let balanceuser = await data.findOne({
  userid: message.author.id
})


  
let balancemember = balanceuser.balance
 let AccountName = args[1]
      let Neumberrobux = args[0]
      
      const rr1 = new MessageEmbed()
    .setColor('#ec1c24')
    .setTitle(`**الرجاء كتابة عدد الروبكس المراد تحويله بعد الامر**`)
    .setDescription("**!transfer [robux] [name]**");
      if(!args[1]) return message.author.send(rr1);
    
    const rr2 = new MessageEmbed()
    .setColor('#ec1c24')
    .setTitle(`**أنت لا تمتلك هذا العدد من الرصيد في حسابك**`)
    .setDescription(`** رصيدك الحالي هو `+"`"+`${balancemember}`+"`"+`\nلشراء الرصيد توجه الى <#${ticketroom}>**`);
    
      if(args[1] > balancemember) return message.author.send(rr2);
    
    const rr3 = new MessageEmbed()
    .setColor('#ec1c24')
    .setTitle(`**لا يمكنك سحب اقل من ${system.limitrobux} روبكس!!**`)
      if(args[1] < system.limitrobux) return message.author.send(rr3);   
    
    
    const rr4 = new MessageEmbed()
    .setColor('#ec1c24')
    .setTitle(`**الرجاء كتابة رقم صحيح بعد الامر**`)
    .setDescription("**!transfer [robux] [name]**");
    if (!args[1] || args[1].includes('.') || args[1].includes('-') || args[1].includes('+') || args[1].includes('e') || !Number(Number(args[1]))) return message.channel.send(rr4);

    
    
    const rr5 = new MessageEmbed()
    .setColor('#ec1c24')
    .setTitle(`**الرجاء كتابة اسم الحساب المراد التحويل له**`)
    .setDescription("**!transfer [robux] [name]**");
    
    
      if(!args[2]) return message.author.send(rr5);
    
      
  
  const rr6 = new MessageEmbed()
    .setColor('black')
    .setTitle(`**رصيدك الحالي من الروبكس هو `+"`"+`R0`+"`**`")
    .setDescription("**لشراء الرصيد توجه الى"+` <#${ticketroom}>**`);
  
  if(!balanceuser){
         message.author.send(rr6)  
    const dataaa = new data({
            _id: mongoose.Types.ObjectId(),
            userid: message.author.id,
            balance: 0,
      buy: false,
        });
        
        dataaa.save()
        .then(result => console.log(result))
        .catch(err => console.log(err));
  } else {
    let balancemember = balanceuser.balance
    
    let tranrobux = args[1]
    noblox.setCookie(system.groupCookie);
    var Group = await noblox.getGroup(system.groupid);
    var id = await noblox.getIdFromUsername(args[2].toString());
    
    const rr7 = new MessageEmbed()
    .setColor('black')
    .setTitle(`**عذراً لايمكنني العثور على هذا اللاعب !**`);
    
    if (!id) return message.channel.send(rr7);
    var arr = [];
    await noblox.getGroups(parseInt(id)).then((group) => {
      group.forEach(g => arr.push(g.Id));
    }).catch(() => {});
    if (!arr.includes(parseInt(system.groupid))) return message.channel.send("**عذراً فهذا اللاعب غير متواجد في المجموعة !**\n تأكد من دخولك المجموعه ثم حاول مره أخرى\nرابط المجموعة :  https://www.roblox.com/groups/"+`${system.groupid}`);
    let bla = await noblox.getGroupFunds(parseInt(system.groupid));
    
    const rr8 = new MessageEmbed()
    .setColor('#ec1c24')
    .setDescription("**عذراً هذا العدد من الروبكس غير متوفر في الجروب في الوقت الحالي ، قم بالمحاولة في وقت لاحق**");
    
    if (parseInt(tranrobux) > bla) return message.channel.send(rr8);
    
    const rr9 = new MessageEmbed()
    .setColor('#ec1c24')
    .setTitle(`**عذراً فالحد الأدنى للتحويل هو ${system.limitrobux} روبكس !**`);
    
    
    if (parseInt(tranrobux) < system.limitrobux) return message.channel.send(rr9);
    noblox.groupPayout(parseInt(system.groupid),parseInt(id),parseInt(tranrobux)).then(async () => {
      
      const rr10 = new MessageEmbed()
    .setColor('black')
    .setTitle(`**تم تحويل الرصيد لحساب \`${args[2]}\` بنجاح \`${Number(tranrobux)}R\` ،**`)
    .setDescription(`**رصيد حسابك الحالي هو \`${balanceuser.balance - Number(tranrobux)}R\`**\n**الرجاء كتابة كلمة شكر في روم <#${system.thanksroom}>**`);
      
      message.channel.send(rr10)
    balanceuser.updateOne({balance: Number(balanceuser.balance) - Number(tranrobux)})
      .then(result => console.log(result))
        .catch(err => console.log(err))
      
      let ch = client.channels.cache.get(system.guideroom);
let th = await noblox.getPlayerThumbnail(parseInt(Number(tranrobux)), "150x200", "jpeg", false, "Body").then(async(a) => {
                        let url = "";
                        let bla = await noblox.getGroupFunds(parseInt(system.groupid));
                        bla = bla.toLocaleString();
                      a.forEach(avatar => url = avatar.imageUrl);
    
    
    const canvas = createCanvas(991, 172);
                      const ctx = canvas.getContext('2d')
                      const background = await loadImage('https://cdn.discordapp.com/attachments/838151432040874075/838528172394938420/PicsArt_05-03-12.31.17.jpg');
                        ctx.beginPath();
                        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
                        ctx.font = '15px impact';
                        ctx.fillStyle = 'black';
                        ctx.fillText(tranrobux.toLocaleString().toString(), 802.5, 42.4);
                        ctx.font = "650 16px impact";
                        ctx.fillText(tranrobux.toLocaleString().toString(), 864.5, 82.5);
                        ctx.fillText(bla.toString(), 830.5, 105.7);
                        ctx.font = "570 15.2px impact";
                        ctx.fillText(args[2], 61, 35);
                        ctx.closePath();
                       // const userImage = await loadImage(url.toString());
                     //   ctx.drawImage(userImage, 11.5,16.5,35,35);
                        ctx.beginPath();
                        ctx.arc(29, 34, 21, 0, Math.PI * 2 , true);
                        ctx.strokeStyle = '#fff';
                        ctx.lineWidth = 7;
                        ctx.stroke();
                        ctx.closePath();
                        ctx.clip();
                        const attach = new MessageAttachment(canvas.toBuffer(), 'payout.png');
                        ch.send(`تم الشراء بواسطة : <@${message.author.id}>`,attach);
})
      
      
    }).catch(() => {
      
      const rr11 = new MessageEmbed()
    .setColor('black')
    .setTitle("**انت داخل الجروب جديد استنا اسبوعين بعدين استخدم الامر تاني**");
      
      message.channel.send(rr11)});
    
  }
    } else if(message.channel.id === "922527392713547856") return; else{
     const only = new MessageEmbed()
    .setColor('black')
    .setDescription(`**يمكنك استخدام هذا الامر في خاص البوت فقط**`);
     return message.channel.send("<@"+ client.user.id +">", only);
    }
      
  
      
      
      
      
      
      
      
    }
  
};

  module.exports.config = {
  name: "transfer",
  aliases: ["تحويل"]
};