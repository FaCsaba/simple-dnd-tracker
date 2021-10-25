const Dice = require("dice-notation-js");
const { Creature, Stats, Weapon } = require("./DNDTools");
const { Client, Intents, DiscordAPIError, Message } = require("discord.js");
const { token } = require("./config.json");

// Create a new client instance
const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

let p1stats = new Stats(18, 15, 16, 6, 12, 8, 85, 13);
let p2stats = new Stats(10, 12, 11, 15, 15, 14, 53, 12);

let cobold1 = new Creature("Displacer 1", p1stats);
let cobold2 = new Creature("Displacer 2", p1stats);
let mage = new Creature("Mage", p2stats);

let leonstats = new Stats(8, 15, 19, 11, 12, 20, 90, 12);
let leon = new Creature("Leon", leonstats);

creatures = new Map();
creatures.set(cobold1.name, cobold1);
creatures.set(cobold2.name, cobold2);
creatures.set(mage.name, mage);
creatures.set(leon.name, leon, true);

client.on("ready", (_) => {
	console.log("connected");
});

prefix = "/";

client.on("messageCreate", async (msg) => {
	if (!msg.content.startsWith(prefix)) {
		return;
	}
	console.log(msg.content);
	line = msg.content.slice(prefix.length).trim();
	line = line.match(/(("|').*?("|')|[^"\s]+)(?=\s*|\s*$)/g);

	while (line.length > 0) {
		switch (line[0].toLowerCase()) {
			case "init":
				line.shift();

				creatures.forEach((creature, _) => {
					//Does the Dice roll for every creature
					creature.init = Dice(creature.stats.initiative_roll);
				});

				while (line[0]) {
					// change the dice roll of the selected
					line[0] = line[0].replace(/'|"/g, "");
					if (!creatures.get(line[0])) {
						msg.channel.send(`Unknown creature **${line[0]}**`);
						line = [];
						msg.delete();
						return;
					}
					if (!line[1]) {
						msg.channel.send(`Needs an initiative number`);
						line = [];
						msg.delete();
						return;
					}

					init = Math.floor(line[1]);
					if (isNaN(init)) {
						msg.channel.send(`**${line[1]}** is not a number`);
						line = [];
						msg.delete();
						return;
					}

					creatures.get(line[0]).init = init;
					line.shift();
					line.shift();
				}

				// sort
				creatures = new Map(
					[...creatures.entries()].sort(
						(a, b) => b[1].init - a[1].init
					)
				);

				return_message = "";
				await creatures.forEach((creature, _) => {
					return_message = return_message.concat(
						`${creature.name}: ${creature.init}\n`
					);
				});
				msg.channel.send(return_message);
				break;

			case "attack":
				// <who gets attacked: creature> <to hit: Dice roll | number> <amount: Dice roll | number>
				line.shift();

				let attacked;
				line[0] = line[0].replace(/'|"/g, "");
				if (creatures.get(line[0])) {
					attacked = creatures.get(line[0]);
				} else {
					msg.channel.send(`Unknown creature **${line[0]}**`);
					line = [];
					msg.delete();
					return;
				}
				line.shift();

				to_hit = Math.floor(line[0]);
				if (isNaN(to_hit)) {
					to_hit = Dice(line[0]);
				}
				line.shift();

				amount = Math.floor(line[0]);
				if (isNaN(amount)) {
					amount = Dice(line[0]);
				}

				line.shift();

				if (attacked.stats.ac < to_hit) {
					msg.channel.send(
						`Rolled a ${to_hit} to hit:\nIt's a hit! ${attacked.name} got damaged`
					);
					attacked.get_damaged(amount);
				} else {
					msg.channel.send(
						`Rolled a ${to_hit} to hit:\nIt's not a hit`
					);
				}

				break;

			case "attackwith":
				line = [];
				msg.channel.send("NOT IMPLEMENTED YET");
				break;

			case "help":
				line.shift();
				line = [];
				msg.channel.send(
					"Help Menu:\n" +
						prefix +
						"**help**: brings up this menu\n" +
						prefix +
						"**init** ..[creature <amount: number>]: rolls for initiative, optionally you can set what creatures rolled before\n" +
						prefix +
						"**attack** <who gets attacked: creature> <to hit: number> <amount: Dice roll | number>: attacks a creature\n" +
						prefix +
						"**attackwith** <who attacks: creature> <whom: creature> <with what: weapon>: NOT IMPL YET"
				);
				break;

			case "show":
				await creatures.forEach((creature, _) => {
					console.log(`${creature.name}: hp ${creature.health}\n`);
				});
				line = [];
				msg.delete();
				return;

			default:
				return_message = "unknown command **" + line + "**";
				line = [];
				msg.channel.send(return_message);
				break;
		}
	}
	msg.delete();
});

client.login(token);
