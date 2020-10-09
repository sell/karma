require('dotenv').config()
const {connection, connect} = require('mongoose');

const init = () => {
    const dbOptions = {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        connectTimeoutMS: 10000,
    };

    connect(process.env.DB_CONNECTION, dbOptions);

    connection.on('connected', () => console.log('[DB CONNECTED] ☑'))

    connection.on('error', (e) => console.error(`[DB ERROR] - ${e}`))

}

module.exports = { init }