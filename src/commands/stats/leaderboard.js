const { MessageEmbed } = require('discord.js');
const leaderBoard = require('../../utils/models/collector');

module.exports = {
    name: 'leaderboard',
    description: 'guilds top helpers',
    run: async (client, message, args) => {
        const leaderBoardStats = await leaderBoard.find({ guildID: message.guild.id }).sort('-totalPoints').limit(6)

        let count = 0;

        const topUsers = leaderBoardStats.map(user => `#${++count}: ** <@${user.userID}> - ${user.totalPoints}**` );

        const embed = new MessageEmbed()
            .setTitle(`${message.guild.name} Leader Boards`)
            .setColor('#347d98')
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .setDescription( topUsers.length !== 0 ? topUsers.join('\n') : 'Dang no one on the leaderboards')
        message.channel.send(embed)
    }
}