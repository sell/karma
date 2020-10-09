const { Schema, model } = require('mongoose');

const thanks = new Schema({
    guildID: String,
    user: {
        type: String,
        required: true
    },
    userID: {
        type: String,
        required: true
    },
    totalPoints: {
        type: Number,
        required: true
    },
    channel: [{
        name: String,
        points: Number
    }],
    users: [{
        userID: String,
        collectedAt: String
    }],
    karmaGiven: Number
});

module.exports = model('thanks points', thanks);