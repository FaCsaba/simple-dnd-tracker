import { Client, Intents, Message } from "discord.js";
import { messageHandler } from "./Handlers";

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

client.on("ready", (c) =>{
    console.log(`${c.user.tag} connected!`)
});

client.on("messageCreate", messageHandler)

if (typeof process.env.PREFIX == "undefined") {
    process.env.PREFIX = "/"
}

process.env.clientId = client.user?.id;

client.login(process.env.TOKEN);