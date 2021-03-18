module.exports = {
  name: 'invite',
  description: 'Get the invite link of the bot',
  execute (message) {
    message.channel.send('Here is my invite link, <@' + message.author.id + '>\nhttps://discord.com/api/oauth2/authorize?client_id=816486025592307722&permissions=8&scope=bot')
  }
}
