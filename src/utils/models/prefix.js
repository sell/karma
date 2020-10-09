const { Schema, model } = require('mongoose');

const prefix = new Schema({
    guildID: {
        type: String,
        required: true
    },
    guildName: String,
    prefix: {
        type: String,
        required: true
    }
});

module.exports = model('prefix', prefix)