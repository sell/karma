require('dotenv').config();
const fs = require('fs');
const { init: db } = require("./utils/components/mongoDB");
db();

const { Client, Collection } = require('discord.js');
const client = new Client({
    disableEveryone: true,
});

client.prefix = 'kb!';
client.categories = fs.readdirSync(__dirname + "/commands/");

['command', 'event'].map(handler => {
    require(`./utils/handlers/${handler}`)(client)
});
['commands', 'aliases'].map(x => client[x] = new Collection());

client.login(process.env.TOKEN).then(() => console.log('logged in'))