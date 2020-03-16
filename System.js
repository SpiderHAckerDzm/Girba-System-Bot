const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();
const fs = require('fs')

client.once('ready', () => {
    console.log('I am Ready!')
    client.user.setActivity(`${prefix}help ! This Server!`,{type: 'WATCHING'})
})

var ErrorMessage = "This Bot Is Currently under development. No Commands will work!"
var ServerStatus = "```The Server Is Alive!```"

const PREFIX = '>';

client.commands = new Discord.Collection()
const commandFiles = fs.readdirSync('./Commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles){
    const command = require(`./Commands/${file}`)
    client.commands.set(command.name, command);
}


client.on('message', message => {
    if(message.author.bot){return}

    let args = message.content.substring(' ').split(' ')

    switch(args[0].toLowerCase()) {
        case "hello":
            client.commands.get('hello').execute(message, args);
        break;
        case `${prefix}ping`:
            client.commands.get('ping').execute(message, args);
        break;
        case `${prefix}help`:
            client.commands.get('help').execute(message, args);
    }
})

