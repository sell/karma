const { thankYouCollection } = require("./thankYouCollection");
const collector = require('../models/collector');
const collectorCooldown = require('../models/commandsCooldown');

const thanksChecker = async (message, callback) => {

    const member = message.mentions.members.first();

    if (!member || message.author.id === member.user.id || member.user.bot) return;

    const user = await collector.findOne({ guildID: message.guild.id, userID: member.user.id });
    const votedUser = user ? user.users.find(user => user.userID === message.author.id) : undefined

    const guildCooldown = await collectorCooldown.findOne({ guildID: message.guild.id})

    let cooldown;
    guildCooldown ? cooldown = parseInt(guildCooldown.coolDown) : cooldown = 30;

    if (user && votedUser && parseInt(votedUser.collectedAt) + (cooldown  * 60 * 1000) > Date.now() ) return message.react('🕕')

    await message.react('👍');
    await message.react('❌');
    const filter = (reaction, user) => ['👍', '❌'].includes(reaction.emoji.name) && user.id === message.author.id;

    message.awaitReactions(filter, {max: 1, time: 1200000, errors: ['time']})
        .then(collected => {
            switch (collected.first().emoji.name) {
                case '👍':
                    thankYouCollection(message, member);
                    message.reactions.resolve('❌').remove();
                    break;
                case '❌':
                    message.reactions.removeAll();
                    break;
            }
            callback(null, collected.first());
        })
        .catch(collected => {
            message.reactions.removeAll();
            callback(`${message.author.tag} did react in time.`);
        })

};

module.exports = { thanksChecker }