const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'help command',
    run: async (client, message, args) => {

        const embed = new MessageEmbed()
            .setTitle(`${client.user.username} Commands`)
            .setDescription( client.commands.map(command => {
                if (command.name.startsWith('resetpoints')) return;
                return `**${command.name}** - ${command.description} \n`
            }))

        message.channel.send(embed)

    }
}