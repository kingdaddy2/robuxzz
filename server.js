const Discord = require("discord.js");
const client = new Discord.Client();
const { loadCommands } = require("./utils/loadCommands");
const mongoose = require("mongoose");
const http = require("http");
const express = require("express");
const app = express();
const noblox = require('noblox.js')
const canvas = require('canvas')
const { Collection } = require('discord.js')
const ms = require('ms')
const mdb = require("./models/mention");
const amdb = require("./models/messages");
    
const Timeout = new Collection();
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://boiled-balsam-daphne.glitch.me/`); /// حط اسم المشروع تبعك name تعديل مهم بدل
}, 280000);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
loadCommands(client);

client.on("ready", () => {
  console.log("ready");
  client.user.setActivity("!help | Robux Community");
});

client.on('guildMemberAdd', async mem=> {
  let mentiononoff = await mdb.findOne({
    guildid: "868525050884685844"
  })
  if(!mentiononoff) return;
  if(mentiononoff.mention == true) {
    let ch = mem.guild.channels.cache.get('958825095856533524');
      if (!ch) return;  
      ch.send(`**2000 شارك في القيفاوي وجيب اصحابك يمكن تفوز <:robux_givea2:878425573410635856> <@!${mem.id}>**`).then((m) => {
    setTimeout(() => {
              m.delete();
            }, 10000);
});
  } else return;
  
});

client.on("message", async message => {
  if (message.author.bot) return;
  
if(message.channel.id === "878420943855292417") {
  message.react('a:robux_loveall:878427167657189466')
}
  //Getting the data from the model

  const messageArray = message.content.split(/ +/);
  const cmd = messageArray[0].toLocaleLowerCase();
  const args = messageArray.slice(0);

  const prefix = "!"; /// PREFIX
  if (!message.content.startsWith(prefix)) return;
  const commandfile =
    client.commands.get(cmd.slice(prefix.length)) ||
    client.commands.get(client.aliases.get(cmd.slice(prefix.length)));
  if (commandfile) {
        if(commandfile.timeout) {
            if(Timeout.has(`${commandfile.name}${message.author.id}`)) return message.channel.send(`You are on a \`${ms(Timeout.get(`${commandfile.name}${message.author.id}`) - Date.now(), {long : true})}\` cooldown.`)
            commandfile.run(client, message, args, prefix)
            Timeout.set(`${commandfile.name}${message.author.id}`, Date.now() + commandfile.timeout)
            setTimeout(() => {
                Timeout.delete(`${commandfile.name}${message.author.id}`)
            }, commandfile.timeout)
        }
    }
});client.on("message", async message => {
  if (message.author.bot) return;
  
if(message.channel.id === "916959301380223066") {
  message.react('a:robux_loveall:878427167657189466')
}
  
  
if(message.channel.id === "958800782390595634") {
  let ch = client.channels.cache.get("958805607601807440");
  let server = await amdb.findOne({
    serverid:"868525050884685844"
  })
  if(!server){
    const dataaa = new amdb({
            serverid: "868525050884685844",
            amount: 1
        });
        
        dataaa.save()
        .then(result => console.log(result))
        .catch(err => console.log(err));
  ch.send("1")
  } else {
    server.updateOne({amount: Number(server.amount) + 1})
    .then(result => console.log(result))
        .catch(err => console.log(err))
    ch.send(Number(server.amount) + 1)
  }
  
}
  //Getting the data from the model

  const messageArray = message.content.split(/ +/);
  const cmd = messageArray[0].toLocaleLowerCase();
  const args = messageArray.slice(0);

  const prefix = "!"; /// PREFIX
  if (!message.content.startsWith(prefix)) return;
  const commandfile =
    client.commands.get(cmd.slice(prefix.length)) ||
    client.commands.get(client.aliases.get(cmd.slice(prefix.length)));
  if (commandfile) {
        commandfile.run(client, message, args, prefix)
    }
});






client.login(process.env.token);


