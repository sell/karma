const { MessageEmbed } = require('discord.js');
const karmaCooldown = require('../../utils/models/commandsCooldown');

module.exports = {
    name: 'explain',
    description: 'Info on the bot',
    run: async (client, message, args) => {

        const guildCooldown = await karmaCooldown.findOne({ guildID: message.guild.id, commandName: 'cooldown'})

        const embed = new MessageEmbed()
            .setAuthor('Karma Bot', client.user.displayAvatarURL(), 'https://github.com/sell/karma')
            .setDescription('Karma bot, is a bot that gives you internet points for helping others out!')
            .addField('How is karma given?', 'Saying thanks to a user that helped you with something.')
            .addField('Examples', `
\`\`\`css
    - Thanks for helping me <@user>
    - Thank you, I appreciate that! <@user>
    - Thank u <@user>
\`\`\`
            `)
            .addField('Cooldown', `Karma, is only able to be given to a certain user every ${guildCooldown ? guildCooldown.coolDown : 30} minutes`)
            .addField('Reactions', `
                If Karma Bot reacts with 👍, it means are you sure you want to give karma to that user.
                If Karma Bot reacts with ❌, it means that you do not want to give karma to that user.
                If Karma Bot reacts with 🕕, it means you cannot give karma to that user for another ${guildCooldown ? guildCooldown.coolDown : 30} minutes.
            `)

            message.channel.send(embed)

    }
}