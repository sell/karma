const glob = require('fast-glob');
const path = require('path');

module.exports = async (client) => {
    const events = await glob('./src/utils/events/**/*.js');

    for (const file of events) {
        const event = require(path.resolve(file));

        const { name } = path.parse(file);

        client.on(name, event.bind(null, client));

        console.log(`Event | ${name} was loaded`)
    }
}