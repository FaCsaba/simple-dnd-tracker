import { send_error, send_message, ReturnStatus } from '../sending';
require('dotenv').config();
const commands: JSON = require("./command-discriptions.json");
let prefix = process.env.PREFIX;

function replace_prefix(usage: string): string {
    return usage.replace(/\$\{prefix\}/, `${prefix}`)
}

interface command_disc {
    name: string
    discription_long: string
    usage: string
}

export function help (kwargs: string[]): ReturnStatus {
    while (kwargs[0]) {
        let command = kwargs[0] 
        kwargs.shift();
        if (!(command in commands)) {
            return send_error(
                `${command} is not a valid command. Type ${prefix}help for commands list`
            );
        }
        return send_message(
            `**${((commands as any)[command] as command_disc).name}**:\n${
                ((commands as any)[command] as command_disc).discription_long
            }\n\`\`\`${replace_prefix(((commands as any)[command] as command_disc).usage)}\`\`\``
        );
    }
    
    let return_message: string = "**Help menu:**\n"; 
    Object.values(commands).forEach(command_disc => {
        return_message = return_message.concat(`${replace_prefix(command_disc.usage)}: ${command_disc.discription}\n`)
    });
    return send_message(return_message)
}