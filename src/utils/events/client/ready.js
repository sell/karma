module.exports = async (client) => {
    await client.user.setPresence({ activity: { name: 'giving people points'}, status: 'idle'})
    console.log(`Hello ${client.user.username} is now online!`);
}