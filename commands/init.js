const { send_message, send_error } = require("./sending");
let { creatures } = require("../creatures/creatures");
const Dice = require("dice-notation-js");

module.exports.init = function (kwargs) {
	creatures.forEach((creature, _) => {
		//Does the Dice roll for every creature
		creature.init = Dice(creature.stats.initiative_roll);
	});

	while (kwargs[0]) {
		// change the dice roll of the selected
		kwargs[0] = kwargs[0].replace(/'|"/g, "");
		if (!creatures.get(kwargs[0])) {
			return send_error(`Unknown creature **${kwargs[0]}**`);
		}
		if (!kwargs[1]) {
			return send_error(`Needs an initiative number`);
		}

		let init;
		try {
			Dice.parse(kwargs[1]);
			init = Dice(kwargs[1]);
		} catch (e) {
			if (!isNaN(Math.floor(kwargs[1]))) {
				init = Math.floor(kwargs[1]);
			} else {
				return send_error(
					`**${kwargs[1]}** is not a number or Dice roll.`
				);
			}
		}

		creatures.get(kwargs[0]).init = init;
		kwargs.shift();
		kwargs.shift();
	}

	// sort
	creatures = new Map(
		[...creatures.entries()].sort((a, b) => b[1].init - a[1].init)
	);

	return_message = "";
	creatures.forEach((creature, _) => {
		return_message = return_message.concat(
			`${creature.name}: ${creature.init}\n`
		);
	});
	return send_message(return_message);
};
