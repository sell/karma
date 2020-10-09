const coolDowns = require('../../utils/models/commandsCooldown');
const { MessageEmbed } = require('discord.js');

module.exports =  {
    name: 'cooldown',
    description: 'Set the cooldown between the time a user can get a point for helping someone',
    run: async (client, message, args) => {
        message.delete();

        if (message.author.id !== message.guild.owner.id) return;

        const currentCoolDown = await coolDowns.findOne({
            guildID: message.guild.id,
            commandName: 'cooldown'
        });

        const embed = new MessageEmbed()

        if (!args[0]) {
            embed.setTitle('Thank You Collector Cooldown Time').setColor('#00ff00').addField('Current Cooldown Time:', currentCoolDown ? currentCoolDown.coolDown + 'm' : 30 + 'm');
            return message.channel.send(embed)
        }

        if (isNaN(args[0])) return message.channel.send(`Cooldown can only be a number, you entered **${args[0]}** which is not a number.`).then(m => m.delete({ timeout: 5000 }))

        if (currentCoolDown && currentCoolDown.coolDown === parseInt(args[0])) return message.channel.send(`Cooldown is already set to ${args[0]} minutes`).then(m => m.delete({ timeout: 5000 }));
        else if (parseInt(args[0]) === 30) return message.channel.send(`Cooldown is already set to ${args[0]} minutes`).then(m => m.delete({ timeout: 5000 }));

        embed.setTitle('Thank You Collector Cooldown - Changed').setColor('#00ff00').addField('New Cooldown Time', args[0] + 'm', true).addField('Previous Cooldown Time', currentCoolDown ? currentCoolDown.coolDown + 'm' : 30 + 'm', true);

        message.channel.send(embed)

        if (currentCoolDown) {
            currentCoolDown.coolDown = parseInt(args[0]);
            currentCoolDown.save();
        } else {
            const newCoolDown = new coolDowns({
                guildID: message.guild.id,
                commandName: 'cooldown',
                coolDown: parseInt(args[0])
            });

            newCoolDown.save();
        }

    }
}