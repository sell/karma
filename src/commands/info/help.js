const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'help',
    run: async (client, message, args) => {

        const embed = new MessageEmbed()
            .setTitle(`${client.user.username} Commands`)
            .setDescription( client.commands.map(command => {
                if (['help', 'resetpoints'].includes(command.name)) return `${command.name = ''} ${command.description = ''}`;
                return `**${command.name}** - ${command.description} \n`
            }))

        message.channel.send(embed)

    }
}