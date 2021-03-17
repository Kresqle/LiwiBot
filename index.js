/*
          DECLARE CONSTS
*/

// modules
const Discord = require('discord.js')
const bot = new Discord.Client()
const { prefix, token } = require('./config.json')
const fs = require('fs')

// add commands to the bot for each js file in the commands folder
bot.commands = new Discord.Collection()
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

// assign the name of each command as the value of the "name" input
// this name is entered inside each file
for (const file of commandFiles) {
  const command = require(`./commands/${file}`)
  bot.commands.set(command.name, command)
}


/*
          MESSAGE EVENT
*/

bot.on('message', message => {

/*
          SETUP
*/

  if (message.author.bot) return

  // get the content of the message without the punctuation
  var msgWoutPunc = message.content.replace(/[^a-zA-Z ]+/g, '').replace('/ {2,}/',' ')
  while (msgWoutPunc.endsWith(' ')) {
    msgWoutPunc = msgWoutPunc.slice(0, -1)
  }


/*
          USELESS THINGS
*/

  // quoi feur
  if (msgWoutPunc.endsWith('quoi')) {
    message.channel.send('feur')
  }


/*
          COMMANDS
*/

  // check if the message starts with the prefix
  if (!message.content.startsWith(prefix)) return

  // split args
  const args = message.content.slice(prefix.length).split(/ +/)
  const command = args.shift().toLowerCase()

  // check if the bot has the asked command
  if (!bot.commands.has(command)) return

  // if the bot has the asked command => try to execute it
  try {
    bot.commands.get(command).execute(message, args)
  } catch (e) {
    console.error(e)
    message.reply('Une erreur s\'est produite.')
  }

})


/*
          ONLINE EVENT
*/

// set the status of the bot
bot.on('ready', () => {
  console.log(bot.user.tag + 'connected')
  bot.user.setActivity(
    'at being useless',
    {
      status: 'online',
      type: 'PLAYING'
    }
  )
})

// log the bot
bot.login(token)
