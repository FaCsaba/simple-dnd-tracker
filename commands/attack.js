const { send_message, send_error } = require("./sending");

// <who gets attacked: creature> <to hit: Dice roll | number> <amount: Dice roll | number>
module.exports.attack = function (kwargs) {
	let attacked;
	kwargs[0] = kwargs[0].replace(/'|"/g, "");
	if (creatures.get(kwargs[0])) {
		attacked = creatures.get(kwargs[0]);
	} else {
		return send_error(`Unknown creature **${kwargs[0]}**`);
	}
	kwargs.shift();

	to_hit = Math.floor(kwargs[0]);
	if (isNaN(to_hit)) {
		to_hit = Dice(kwargs[0]);
	}
	kwargs.shift();

	amount = Math.floor(kwargs[0]);
	if (isNaN(amount)) {
		amount = Dice(kwargs[0]);
	}

	kwargs.shift();

	if (attacked.stats.ac < to_hit) {
		send_message(
			`Rolled a ${to_hit} to hit:\nIt's a hit! ${attacked.name} got damaged ${amount}`
		);
		attacked.get_damaged(amount);
	} else {
		send_message(`Rolled a ${to_hit} to hit:\nIt's not a hit`);
	}
};
