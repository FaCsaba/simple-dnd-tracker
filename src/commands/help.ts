import { send_error, send_message, ReturnStatus } from '../sending';
import * as commands from './command-discriptions.json';
require('dotenv').config();

let prefix = process.env.PREFIX;

function replace_prefix(usage: string): string {
    return usage.replace(/\$\{prefix\}/, `${prefix}`)
}



export function help (kwargs: string[]): ReturnStatus {
    if (kwargs[0]) {
        if (!(kwargs[0] in commands)) {
            return send_error(
                `${kwargs[0]} is not a valid command. Type ${prefix}help for commands list`
            );
        }
        if (kwargs[0] in commands){
            return send_message(
                `**${(commands as any)[kwargs[0]].name}**:\n${
                    (commands as any)[kwargs[0]].discription_long
                }\n\`\`\`${(commands as any)[kwargs[0]].usage}\`\`\``
            );
        }
    }
    
    let return_message: string = "**Help menu:**\n"; 
    Object.values(commands).forEach(command_disc => {
        if (command_disc.usage)
            return_message = return_message.concat(`${replace_prefix(command_disc.usage)}: ${command_disc.discription}\n`);
    });
    return send_message(return_message)
}