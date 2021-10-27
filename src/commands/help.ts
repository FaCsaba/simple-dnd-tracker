import { send_error, send_message, ReturnStatus } from '../sending';
import { command } from './commands';
require('dotenv').config();
let prefix = process.env.PREFIX;

export function help (commands: Map<string, command>, kwargs: string[]): ReturnStatus {
    if (kwargs[0]) {
        if (!commands.get(kwargs[0])) {
            return send_error(
                `${kwargs[0]} is not a valid command. Type ${prefix}help for commands list`
            );
        }
        return send_message(
            `**${(commands.get(kwargs[0]) as command).name}**:\n${
                (commands.get(kwargs[0]) as command).discription_long
            }\n\`\`\`${(commands.get(kwargs[0]) as command).usage}\`\`\``
        );
    }
    
    let return_message: string = "**Help menu:**\n"; 
    commands.forEach(command => {
        return_message = return_message.concat(`${command.usage}: ${command.discription}\n`)
    });
    return send_message(return_message)
}