const { prefix } = require("../config.json");
const { send_error } = require("./sending");

const { attack } = require("./attack");
const { help } = require("./help");
const { init } = require("./init");

commands = {
	help: {
		parent: null,
		name: "Help",
		discription: "Shows you this menu.",
		discription_long:
			"Shows you this menu. You can optionally provide another command after help to show you more about that command.",
		usage: `${prefix}help [another command]`,
		run(kwargs = []) {
			return help(this, kwargs);
		},
	},

	init: {
		name: "[Init]iative",
		discription: "Rolls for initiative.",
		discription_long:
			"Rolls for initiative, optionally you can set what creatures have rolled before.",
		usage: `${prefix}init ..[creature <amount: number>]`,
		run(kwargs) {
			return init(kwargs);
		},
	},
	attack: {
		name: "Attack",
		discription: "Attacks a creature on your turn.",
		discription_long:
			"Attacks a creature on your turn, given the creature to attack, a dice roll or a number to compare against the creatures ac, and the amount of attack you did or will do with a dice roll.",
		usage: `${prefix}attack <who gets attacked: creature> <to hit: Dice roll | number> <amount: Dice roll | number>`,
		run(kwargs) {
			return attack(kwargs);
		},
	},
	attackwith: {
		name: "Attackwith",
		discription: "Attacks a creature with a weapon",
		discription_long:
			"Attacks a creature with a weapon, provided the creature to attack and the weapon. If you are the DM you can also provide the creature to attack with.",
		usage: `${prefix}attackwith <creature to attack | creature to attack with as DM <creature to attack>> <what weapon>`,
		run(kwargs) {},
	},
};
commands.help.parent = commands;

//commands.run("asdf", ["init"]);

module.exports.commands = commands;

module.exports.run_command = function (kwargs) {
	if (!commands[kwargs[0]]) {
		return send_error(`${prefix}${kwargs[0]} is not a command`);
	} else {
		c = commands[kwargs[0]];
		kwargs.shift();
		return c.run(kwargs);
	}
};
