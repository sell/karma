const { MessageEmbed } = require('discord.js');
const leaderBoard = require('../../utils/models/collector');

module.exports = {
    name: 'profile',
    description: 'users profile/stats',
    run: async (client, message, args) => {

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

        const user = await leaderBoard.findOne({ guildID: message.guild.id, userID: member.user.id})

        const topChannels = user ? user.channel.sort((a, b) => b.points - a.points) : 'none'
        const topSixChannels = user ? topChannels.slice(0, 6).map(r => `${r.name} - ${r.points}`).join('\n') : 'no top channels, get to helping :P'
        const embed = new MessageEmbed()
            .setTitle(`${member.user.tag} stats in ${message.guild.name}`)
            .setColor('#347d98')
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .addField('Total Points:', user ? user.totalPoints : 0)
            .addField( 'Top Channels', topSixChannels)
        await message.channel.send(embed)
    }
}