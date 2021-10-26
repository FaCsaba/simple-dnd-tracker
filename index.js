const Dice = require("dice-notation-js");
const { Client, Intents, DiscordAPIError, Message } = require("discord.js");
const { token, prefix } = require("./config.json");
const { run_command } = require("./commands/commands");
const { send_message, send_error } = require("./commands/sending");

// Create a new client instance
const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on("ready", (_) => {
	console.log("connected");
});

client.on("messageCreate", async (msg) => {
	if (!msg.content.startsWith(prefix) || msg.author.id == client.user.id) {
		return;
	}
	console.log(msg.content);
	line = msg.content.slice(prefix.length).trim();
	line = line.match(/(("|').*?("|')|[^"\s]+)(?=\s*|\s*$)/g);

	returned = run_command(line);
	msg.delete();
	return msg.channel.send(returned.message);
});

client.login(token);
