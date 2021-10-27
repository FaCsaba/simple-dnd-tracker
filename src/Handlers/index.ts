import { Message } from "discord.js";
import { run_command } from "../commands/commands";
require('dotenv').config();
let prefix = typeof process.env.PREFIX == "string" ? process.env.PREFIX : "/" ;
let clientId = process.env.CLIENTID


export async function messageHandler (msg: Message) {
    if (!msg.content.startsWith(prefix) || msg.author.id == clientId) {
        return;
    }
    
    
    let line: string = msg.content.slice(prefix.length).trim();
    let kwargs = line.match(/(("|').*?("|')|[^"\s]+)(?=\s*|\s*$)/g) as string[]
    
    
    let returned = run_command(kwargs);
    msg.delete();
    if (returned.success == false) {
        returned.message = `Error with ${msg.content}:\n` + returned.message;
    }
    msg.channel.send(returned.message);
}

