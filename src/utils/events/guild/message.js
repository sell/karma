const { thanksChecker } = require("../../components/karmaAdder");
const customPrefix = require('../../models/prefix.js');

module.exports = async (client, message) => {

    if (message.author.bot) return;

    const prefix = await customPrefix.findOne({guildID: message.guild.id}) ? (await customPrefix.findOne({guildID: message.guild.id})).prefix : client.prefix;

    if (message.content.match(/thank/gmi)) return thanksChecker(message, (e, data) => console.log(e));

    if (!message.content.toLowerCase().startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    let command = client.commands.get(cmd);
    console.log('here')
    if (!command) return;

    try {
        command.run(client, message, args);
    } catch (e) {
        console.error(e);
        message.reply('there was an error trying to execute that command!');
    }


}
