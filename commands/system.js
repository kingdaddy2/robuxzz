const Discord = require("discord.js");
const client = new Discord.Client();
const mongoose = require('mongoose');
const sdb = require("../models/system");
var randomId = require('random-id');
const { MessageEmbed, MessageAttachment } = require('discord.js');
const inlinereply = require('discord-reply');
const talkedRecently = new Set();
const owners = ["822881298620219422","888386857749069834"]




module.exports.run = async (client, message, args, prefix, mes) => {
  let cooldown = 2 * 1000
  
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
      
        if(!owners.includes(message.author.id)) return message.channel.send(`**Only Owners Can use this command**`);

      
      
      
  
  let system = await sdb.findOne({
    guildid: message.channel.guild.id,
  })
  
  const systemhelp = new MessageEmbed()
 .setTitle("System Settings")
 .addField("عرض المعلومات المسجلة","```!system info```")
 .addField("تسجيل الدخول للجروب عن طريق الكوكيز","```!system login```")
 .addField("تسجيل ايدي الجروب","```!system group```")
 .addField("سعر الروبكس","```!system price```")
 .addField("خصم البوست","```!system boost```")
 .addField("روم الشكر","```!system thanks```")
 .addField("روم الادله","```!system guide```")
 .addField("مستلم الكريديت", "```!system owner```")
 .addField("رول البوست", "```!system boostrole```")
 .addField("رول العميل", "```!system clientrole```")
 .addField("الحد الادنى للشراء والتحويل","```!system limitrobux```")
 .addField("اعاده الاعدادات للاعدادات الاساسية","```!system reset```")
  
  if(!args[1]) {
    
    if(!system) {
    const dataa = new sdb({
  guildid: message.channel.guild.id,
  groupCookie: "none",
  groupid: "none",
  robuxprice: 1000,
  boostoff: 0,
  thanksroom: "none",
  guideroom: "none",
  owner: "none",
  boostrole: "none",
  clientrole: "none",
  limitrobux: "none",
})
    dataa.save()
    .then(result => console.log(result))
    .catch(err => console.log(err));
    message.channel.send(systemhelp)
    }
  else {
                 message.channel.send(systemhelp)
  }
  };
  
  if(args[1] === "info") {
    if(!system) return message.channel.send("لم يتم تسجيل أي معلومات")
  
    const infosystemmessage = new MessageEmbed()
    .setColor('black')
    .setTitle("معلومات السستم المسجلة")
    .addField("الكوكيز","```لا يمكن عرضه لاسباب امنية```")
    .addField("ايدي الجروب",`\`\`\`${system.groupid}\`\`\``)
    .addField("سعر الروبكس",`\`\`\`${system.robuxprice}\`\`\``)
    .addField("خصم البوستات",`\`\`\`${system.boostoff}\`\`\``)
    .addField("الحد الادنى للشراء والتحويل",`\`\`\`${system.limitrobux}\`\`\``)
    .addField("روم الشكر",`<#${system.thanksroom}>`)
    .addField("روم الادلة",`<#${system.guideroom}>`)
    .addField("مستلم الارباح",`<@${system.owner}>`)
    .addField("رول البوست",`<@&${system.boostrole}>`)
    .addField("رول العميل",`<@&${system.clientrole}>`)
                 message.channel.send(infosystemmessage)
  
  };
  
  if(args[1] === "login") {
    if(!system) {
    const dataa = new sdb({
  guildid: message.channel.guild.id,
  groupCookie: args[2],
  groupid: "none",
  robuxprice: 1000,
  boostoff: 0,
  thanksroom: "none",
  guideroom: "none",
  owner: "none",
  boostrole: "none",
  clientrole: "none",
  limitrobux: "none",
})
    dataa.save()
    .then(result => console.log(result))
    .catch(err => console.log(err));
    message.delete()
    message.channel.send("**تم تسجيل الكوكيز بنجاح**")
    }
  else {
    sdb.updateOne({
      groupCookie: args[2]
    })
    .then(result => console.log(result))
    .catch(err => console.log(err));
                 message.channel.send("**تم تسجيل الكوكيز بنجاح**")
  }
  };
  
  
  
  
  
  if(args[1] === "group") {
    if(!system) {
    const dataa = new sdb({
  guildid: message.channel.guild.id,
  groupCookie: "none",
  groupid: args[2],
  robuxprice: 1000,
  boostoff: 0,
  thanksroom: "none",
  guideroom: "none",
  owner: "none",
  boostrole: "none",
  clientrole: "none",
  limitrobux: "none",
})
    dataa.save()
    .then(result => console.log(result))
    .catch(err => console.log(err));
    message.delete()
    message.channel.send("**تم تسجيل الجروب بنجاح**")
    }
  else {
    sdb.updateOne({
      groupid: args[2]
    })
    .then(result => console.log(result))
    .catch(err => console.log(err));
                 message.channel.send("**تم تسجيل الجروب بنجاح**")
  }
  };
  
  
  
  
  
  
  if(args[1] === "price") {
    if(!system) {
    const dataa = new sdb({
  guildid: message.channel.guild.id,
  groupCookie: "none",
  groupid: "none",
  robuxprice: args[2],
  boostoff: 0,
  thanksroom: "none",
  guideroom: "none",
  owner: "none",
  boostrole: "none",
  clientrole: "none",
  limitrobux: "none",
})
    dataa.save()
    .then(result => console.log(result))
    .catch(err => console.log(err));
    message.delete()
    message.channel.send("**تم تسجيل سعر الروبكس بنجاح**")
    }
  else {
    sdb.updateOne({
      robuxprice: args[2]
    })
    .then(result => console.log(result))
    .catch(err => console.log(err));
                 message.channel.send("**تم تسجيل سعر الروبكس بنجاح**")
  }
  }
  
  
  
  
  
  
  if(args[1] === "boost") {
    if(!system) {
    const dataa = new sdb({
  guildid: message.channel.guild.id,
  groupCookie: "none",
  groupid: "none",
  robuxprice: 1000,
  boostoff: args[2],
  thanksroom: "none",
  guideroom: "none",
  owner: "none",
  boostrole: "none",
  clientrole: "none",
  limitrobux: "none",
})
    dataa.save()
    .then(result => console.log(result))
    .catch(err => console.log(err));
    message.delete()
    message.channel.send("**تم تسجيل خصم البوستات بنجاح بنجاح**")
    }
  else {
    sdb.updateOne({
      boostoff: args[2]
    })
    .then(result => console.log(result))
    .catch(err => console.log(err));
                 message.channel.send("**تم تسجيل خصم البوستات بنجاح**")
  }
  };
  
  
  
  
  
  
  if(args[1] === "thanks") {
    if(!system) {
    const dataa = new sdb({
  guildid: message.channel.guild.id,
  groupCookie: "none",
  groupid: "none",
  robuxprice: 1000,
  boostoff: 0,
  thanksroom: args[2],
  guideroom: "none",
  owner: "none",
  boostrole: "none",
  clientrole: "none",
  limitrobux: "none",
})
    dataa.save()
    .then(result => console.log(result))
    .catch(err => console.log(err));
    message.delete()
    message.channel.send("**تم تسجيل ايدي روم الشكر بنجاح**")
    }
  else {
    sdb.updateOne({
      thanksroom: args[2]
    })
    .then(result => console.log(result))
    .catch(err => console.log(err));
                 message.channel.send("**تم تسجيل ايدي روم الشكر بنجاح**")
  }
  };
  
  
  
  if(args[1] === "guide") {
    if(!system) {
    const dataa = new sdb({
  guildid: message.channel.guild.id,
  groupCookie: "none",
  groupid: "none",
  robuxprice: 1000,
  boostoff: 0,
  thanksroom: "none",
  guideroom: args[2],
  owner: "none",
  boostrole: "none",
  clientrole: "none",
  limitrobux: "none",
})
    dataa.save()
    .then(result => console.log(result))
    .catch(err => console.log(err));
    message.delete()
    message.channel.send("**تم تسجيل ايدي روم الادله بنجاح**")
    }
  else {
    sdb.updateOne({
      guideroom: args[2]
    })
    .then(result => console.log(result))
    .catch(err => console.log(err));
                 message.channel.send("**تم تسجيل ايدي روم الادله بنجاح**")
  }
  };
  
  
  
  
  if(args[1] === "owner") {
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
    if(!system) {
    const dataa = new sdb({
  guildid: message.channel.guild.id,
  groupCookie: "none",
  groupid: "none",
  robuxprice: 1000,
  boostoff: 0,
  thanksroom: "none",
  guideroom: "none",
  owner: member.id,
  boostrole: "none",
  clientrole: "none",
  limitrobux: "none",
})
    dataa.save()
    .then(result => console.log(result))
    .catch(err => console.log(err));
    message.delete()
    message.channel.send("**تم تسجيل ايدي مستلم الارباح بنجاح**")
    }
  else {
    sdb.updateOne({
      owner: member.id
    })
    .then(result => console.log(result))
    .catch(err => console.log(err));
                 message.channel.send("**تم تسجيل ايدي مستلم الارباح بنجاح**")
  }
  };
  
  
  
  
  
  if(args[1] === "boostrole") {
    if(!system) {
    const dataa = new sdb({
  guildid: message.channel.guild.id,
  groupCookie: "none",
  groupid: "none",
  robuxprice: 1000,
  boostoff: 0,
  thanksroom: "none",
  guideroom: "none",
  owner: "none",
  boostrole: args[2],
  clientrole: "none",
  limitrobux: "none",
})
    dataa.save()
    .then(result => console.log(result))
    .catch(err => console.log(err));
    message.delete()
    message.channel.send("**تم تسجيل ايدي رول البوست بنجاح**")
    }
  else {
    sdb.updateOne({
      boostrole: args[2]
    })
    .then(result => console.log(result))
    .catch(err => console.log(err));
                 message.channel.send("**تم تسجيل ايدي رول البوست بنجاح**")
  }
  };
  
  
  
  if(args[1] === "clientrole") {
    if(!system) {
    const dataa = new sdb({
  guildid: message.channel.guild.id,
  groupCookie: "none",
  groupid: "none",
  robuxprice: 1000,
  boostoff: 0,
  thanksroom: "none",
  guideroom: "none",
  owner: "none",
  boostrole: "none",
  clientrole: args[2],
  limitrobux: "none",
})
    dataa.save()
    .then(result => console.log(result))
    .catch(err => console.log(err));
    message.delete()
    message.channel.send("**تم تسجيل ايدي روم الادله بنجاح**")
    }
  else {
    sdb.updateOne({
      clientrole: args[2]
    })
    .then(result => console.log(result))
    .catch(err => console.log(err));
                 message.channel.send("**تم تسجيل ايدي روم الادله بنجاح**")
  }
  };
  
  
  
  
  if(args[1] === "limitrobux") {
    if(!system) {
    const dataa = new sdb({
  guildid: message.channel.guild.id,
  groupCookie: "none",
  groupid: "none",
  robuxprice: 1000,
  boostoff: 0,
  thanksroom: "none",
  guideroom: "none",
  owner: "none",
  boostrole: "none",
  clientrole: "none",
  limitrobux: args[2],
})
    dataa.save()
    .then(result => console.log(result))
    .catch(err => console.log(err));
    message.delete()
    message.channel.send("**تم تسجيل الحد الادنى للشراء والتحويل بنجاح**")
    }
  else {
    sdb.updateOne({
      limitrobux: args[2]
    })
    .then(result => console.log(result))
    .catch(err => console.log(err));
                 message.channel.send("**تم تسجيل الحد الادنى للشراء والتحويل بنجاح**")
  }
  };
  
  if(args[1] === "reset") {
    if(!system) {
    const dataa = new sdb({
  guildid: message.channel.guild.id,
  groupCookie: "none",
  groupid: "none",
  robuxprice: 1000,
  boostoff: 0,
  thanksroom: "none",
  guideroom: "none",
  owner: "none",
  boostrole: "none",
  clientrole: "none",
  limitrobux: "none",
})
    dataa.save()
    .then(result => console.log(result))
    .catch(err => console.log(err));
    message.delete()
    message.channel.send("**تم الاعادة الى الاعدادات الاساسية بنجاح بنجاح**")
    }
  else {
    sdb.findOneAndDelete({
      guildid: message.channel.guild.id
    })
    .then(result => console.log(result))
    .catch(err => console.log(err));
                 message.channel.send("**تم الاعادة الى الاعدادات الاساسية بنجاح بنجاح**")
  }
  };
  
  
      
  
      
      
      
      
      
      

    }
};
  module.exports.config = {
  name: "system",
  aliases: ["sys"]
};