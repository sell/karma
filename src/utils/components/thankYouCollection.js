const thankYouCollector = require('../models/collector');

const thankYouCollection = async (message, member) => {

    const thankYouChecker = await thankYouCollector.findOne({ guildID: message.guild.id, userID: member.user.id });

    if (thankYouChecker) {

        thankYouChecker.totalPoints++;
        // thankYouChecker.collectedAt = Date.now();

        const channelPoints = thankYouChecker.channel.find(channel => channel.name === message.channel.name);

        if (channelPoints) channelPoints.points++;
        else {
            thankYouChecker.channel.push({
                    name: message.channel.name,
                    points: 1
            })
        }

        const userVoted = thankYouChecker.users.find(user => user.userID === message.author.id);

        if (userVoted) userVoted.collectedAt = Date.now();
        else {
            thankYouChecker.users.push({
                userID: message.author.id,
                collectedAt: Date.now()
            })
        }

        await thankYouChecker.save();

    } else {

        const newUser = new thankYouCollector({
            guildID: message.guild.id,
            user: member.user.tag,
            userID: member.user.id,
            totalPoints: 1,
            channel: {
                name: message.channel.name,
                points: 1
            },
            users: {
                userID: message.author.id,
                collectedAt: Date.now()
            },
        });

        await newUser.save();

    }

}

module.exports = { thankYouCollection }