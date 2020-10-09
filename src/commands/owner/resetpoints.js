const { MessageEmbed } = require('discord.js');
const users = require('../../utils/models/collector');

module.exports = {
    name: 'resetpoints',
    run: async (client, message, args) => {

        if (message.author.id !== '185957154606284800') return;

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        const embed = new MessageEmbed()

        if (member) {
            users.findOne({ userID: member.user.id }, (err, user) => {
                user.totalPoints = 0;
                user.channel = undefined;
                user.save();
            });
            embed.setTitle(`Successfully reset ${member.user.tag} points!`).setColor('#00ff00');
            message.channel.send(embed)
        } else {
            const user = await client.users.fetch(args[0]);

            users.findOne({ userID: user.id }, (err, user) => {
                user.totalPoints = 0;
                user.channel = undefined;
                user.save();
            });

            embed.setTitle(`Successfully reset ${user.tag} points!`).setColor('#00ff00');
            message.channel.send(embed)

        }

    }
}