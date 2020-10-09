const customPrefix = require('../../utils/models/prefix');
const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'prefix',
    description: 'change the servers prefix',
    run: async (client, message, args) => {

        message.delete();

        const prefix = await customPrefix.findOne({
            guildID: message.guild.id
        });

        const embed = new MessageEmbed()

        if (!args[0]) {
            embed.setTitle(`${message.guild.name} prefix is - ${prefix ? prefix.prefix : client.prefix}`)
            return message.channel.send(embed)
        }

        if (message.guild.owner.id !== message.author.id) return message.channel.send('You aren\'t the owner of the guild.').then(m => m.delete({ timeout: 5000 }))

        embed.setTitle(`Prefix changed for ${message.guild.name}`).addField('Previous prefix', prefix ? prefix.prefix : client.prefix).addField('New Prefix', args[0]);
        message.channel.send(embed);

        if (prefix) {
            prefix.prefix = args[0];
            prefix.save();
        } else {
            const newPrefix = new customPrefix({
                guildID: message.guild.id,
                guildName: message.guild.name,
                prefix: args[0]
            });

            await newPrefix.save();
        }

    }
}