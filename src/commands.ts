import * as commands_import from "./commands/";
import { send_message, send_error, ReturnStatus } from './sending';

interface runner {
    run(kwargs: string[]): ReturnStatus 
}

interface command {
    (): ReturnStatus
}
let commands = new Map<string, runner>();
Object.entries(commands_import).forEach((entries)=>{
    let [key, value] = entries;
    let runner = {run (kwargs: string[]): ReturnStatus {return value(kwargs)}}
    commands.set(key, (runner as runner));
})

export function run_command (kwargs: string[]): ReturnStatus {
    if (!commands.has(kwargs[0])) {
        return send_error("No such command");
    };

    let c: string = kwargs[0];
    kwargs.shift();
    return (commands.get(c) as runner).run(kwargs)
}