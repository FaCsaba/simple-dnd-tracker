require('dotenv').config();
let prefix = process.env.PREFIX;
import { ReturnStatus } from '../sending';

//import {attack} from "./attack";
import {help} from "./help";
import {init} from "./init";

export interface command {
    parent: Map<string, command>
    name: string
    command_name: string
    discription: string
    discription_long: string
    usage: string
    run(kwargs: string[]): ReturnStatus;
    set_parent(parent: Map<string, command>): void
}


export let commands: Map<string, command> = new Map([
	["help", {
        parent: new Map as Map<string, command>,
		name: "Help",
        command_name: "help",
		discription: "Shows you this menu.",
		discription_long:
			"Shows you this menu. You can optionally provide another command after help to show you more about that command.",
		usage: `${prefix}help [another command]`,
		run(kwargs: string[]) {
			return help(this.parent, kwargs);
		},
        set_parent(parent) {
            this.parent = parent
        }
	} as command],

	["init", {
		name: "[Init]iative",
        command_name: "init",
		discription: "Rolls for initiative.",
		discription_long:
			"Rolls for initiative, optionally you can set what creatures have rolled before.",
		usage: `${prefix}init ..[creature <amount: number>]`,
		run(kwargs: string[]) {
			return // init(kwargs);
		},
	} as command],
	["attack", {
		name: "Attack",
        command_name: "attack",
		discription: "Attacks a creature on your turn.",
		discription_long:
			"Attacks a creature on your turn, given the creature to attack, a dice roll or a number to compare against the creatures ac, and the amount of attack you did or will do with a dice roll.",
		usage: `${prefix}attack <who gets attacked: creature> <to hit: Dice roll | number> <amount: Dice roll | number>`,
		run(kwargs: string[]) {
			return // attack(kwargs);
		},
	} as command],
	["attackwith", {
		name: "Attackwith",
        command_name: "attackwith",
		discription: "Attacks a creature with a weapon",
		discription_long:
			"Attacks a creature with a weapon, provided the creature to attack and the weapon. If you are the DM you can also provide the creature to attack with.",
		usage: `${prefix}attackwith <creature to attack | creature to attack with as DM <creature to attack>> <what weapon>`,
		run(kwargs: string[]) {},
	} as command],
]);
commands.get("help")?.set_parent(commands) ;




export function run_command (kwargs: string[]) : ReturnStatus {
    if (!(commands.get(kwargs[0]))) {
        return {success: false, message: "No such command exits!"}
    }
    
    let command:string = kwargs[0];
    kwargs.shift();
    return commands.get(command)?.run(kwargs) as ReturnStatus;
}