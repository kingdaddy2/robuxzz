const owners = ["822881298620219422","888386857749069834"]
const talkedRecently = new Set();


module.exports.run = async (client, message, args, prefix, mes) => {
  if(!owners.includes(message.author.id)) return message.channel.send(`**Only Owners Can use this command**`);
  
/*  message.delete()
  message.channel.send(`${args.slice(1).join(" ")}`)
  
  */
};
  module.exports.config = {
  name: "say",
  aliases: []
};
