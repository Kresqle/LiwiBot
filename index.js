/*
          DECLARE CONSTS
*/

// modules
const Discord = require("discord.js");
require("discord-reply");
const bot = new Discord.Client();
const { prefix, token } = require("./config.json");
const fs = require("fs");

// add commands to the bot for each js file in the commands folder
bot.commands = new Discord.Collection();
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

// assign the name of each command as the value of the "name" input
// this name is entered inside each file
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  bot.commands.set(command.name, command);
}

/*
          MESSAGE EVENT
*/

bot.on("message", (message) => {
  /*
          SETUP
  */

  if (message.author.bot) return;

  // get the content of the message without the punctuation and replace capital letters by normal letters
  var msgWoutPunc = message.content
    .replace(/[^a-zA-Z ]+/g, "")
    .replace("/ {2,}/", " ")
    .toLowerCase();
  while (msgWoutPunc.endsWith(" ")) {
    msgWoutPunc = msgWoutPunc.slice(0, -1);
  }

  /*
          USELESS THINGS
  */

  /*    PUNS   */

  // quoi feur
  // send "feur" if the message ends with "quoi"
  // Explaination : That's a french joke
  //                "Coiffeur" is a hairdresser in french and "quoi feur" has the name pronunciation
  if (msgWoutPunc.endsWith("quoi")) {
    message.lineReply("feur", {
      files: [
        "https://i.kym-cdn.com/entries/icons/facebook/000/023/980/db1.jpg",
      ],
    });
  }

  // oui stiti
  // send "stiti" if the message ends with "oui"
  // Explaination : That's another french joke
  //                "Ouistiti" is a marmoset in french
  if (msgWoutPunc.endsWith("oui")) {
    message.lineReply("stiti");
  }

  // ah b
  // send "b" if the message ends with "ah" or "ah"
  // Explaination : "Ah" (and "a") has the sound of the letter A in french so why not send B ?
  if (msgWoutPunc.endsWith("ah") || msgWoutPunc.endsWith("a")) {
    message.lineReply("b");
  }

  // hein deux
  // send "deux" if the message ends with "in" or "ien"
  // Explaination : "in" and "ien" has the sound of "1" in french and "Deux" is the number 2 in french
  //                So 1 -> 2
  if (msgWoutPunc.endsWith("in") || msgWoutPunc.endsWith("ien")) {
    message.lineReply("deux");
  }

  // de trois
  // same than hein deux but with 2 -> 3
  if (msgWoutPunc.endsWith("de")) {
    message.lineReply("trois");
  }

  // merci de rien
  // send "de rien" if the message ends with "merci"
  // Explaination : "merci" means "thanks" in french and "de rien" means "you're welcome"
  if (msgWoutPunc.endsWith("merci")) {
    message.lineReply("De rien");
  }

  // bru xelles
  // send "xelles" if the message ends with "bru" (or related)
  // Explaination : Bruxelles...
  if (
    msgWoutPunc.endsWith("bru") ||
    msgWoutPunc.endsWith("brux") ||
    msgWoutPunc.endsWith("brue") ||
    msgWoutPunc.endsWith("bruh") ||
    msgWoutPunc.endsWith("brut")
  ) {
    message.lineReply("xelles");
  }

  // allo à l'huile
  // send "à l'huile" if the message ends with "allo"
  // Explaination : In french, "allo" sounds like "à l'eau"
  //                "à l'eau" means "in/at the water"
  //                "huile" means "oil"
  if (msgWoutPunc.endsWith("allo") || msgWoutPunc.endsWith("allô")) {
    message.lineReply("à l'huile");
  }

  // di nosaure
  // send "nosaure" if the message ends with "di" (or related)
  // Explaination : Dinosaure (Dinosaur in french)
  if (
    msgWoutPunc.endsWith("di") ||
    msgWoutPunc.endsWith("dit") ||
    msgWoutPunc.endsWith("dis") ||
    msgWoutPunc.endsWith("dix") ||
    msgWoutPunc.endsWith("dih") ||
    msgWoutPunc.endsWith("die")
  ) {
    message.lineReply("nosaure", {
      files: ["https://imgflip.com/s/meme/Philosoraptor.jpg"],
    });
  }

  // mais son
  // send "son" if the message ends with "mais"
  // Explaination : That's another french joke don't wanna explain ;-;
  if (
    msgWoutPunc.endsWith("mais") ||
    msgWoutPunc.endsWith("meh") ||
    msgWoutPunc.endsWith("mes") ||
    msgWoutPunc.endsWith("mai") ||
    msgWoutPunc.endsWith("mè") ||
    msgWoutPunc.endsWith("mé")
  ) {
    message.lineReply("son");
  }

  // jpp => Jean-Pierre Pernaud
  // Explaination : JPP le boss
  if (msgWoutPunc.endsWith("jpp")) {
    message.lineReply("Jean-Pierre Pernaud ?");
  }

  /*
          COMMANDS
  */

  // check if the message starts with the prefix

  if (!message.content.startsWith(prefix)) return;

  // split args
  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  // check if the bot has the asked command
  if (!bot.commands.has(command)) return;

  // if the bot has the asked command => try to execute it
  try {
    bot.commands.get(command).execute(message, args);
  } catch (e) {
    console.error(e);
    message.lineReply("Une erreur s'est produite.");
  }
});

/*
          ONLINE EVENT
*/

// set the status of the bot
bot.on("ready", () => {
  console.log(bot.user.tag + "connected");
  bot.user.setActivity("at being useless", {
    status: "online",
    type: "PLAYING",
  });
});

// log the bot
bot.login(token);
