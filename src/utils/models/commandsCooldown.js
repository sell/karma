const { Schema, model } = require('mongoose');

const collectorCoolDown = new Schema({
    guildID: {
        type: String,
        required: true
    },
    commandName: {
        type: String,
        required: true
    },
    coolDown: {
        type: Number,
        required: true
    }
});

module.exports = model('collector cooldown', collectorCoolDown);