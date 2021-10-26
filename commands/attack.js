const { send_message, send_error } = require("./sending");
const { creatures } = require("../creatures/creatures");
const Dice = require("dice-notation-js");

// <who gets attacked: creature> <to hit: Dice roll | number> <amount: Dice roll | number>
module.exports.attack = function (kwargs) {
	let attacked;
	if (!kwargs[0]) {
		return send_error(
			`Not enough arguments for attack.\nMaybe look at the help menu for attack`
		);
	}
	kwargs.forEach((e, ind) => {
		kwargs[ind] = e.replace(/'|"/g, "");
	});
	if (creatures.get(kwargs[0])) {
		attacked = creatures.get(kwargs[0]);
	} else {
		return send_error(`Unknown creature **${kwargs[0]}**`);
	}
	kwargs.shift();

	original_hit = kwargs[0];
	if (typeof kwargs[0] == "string") {
		to_hit = Dice.detailed(kwargs[0]);
		to_hit = {
			result: to_hit.result,
			pretty_print: `${original_hit} (${to_hit.rolls})${
				to_hit.modifier ? "+" + to_hit.modifier : ""
			} = ${to_hit.result}`,
		};
	} else if (typeof to_hit == "number") {
		to_hit = { result: Math.floor(kwargs[0]) };
		to_hit = { result: to_hit.result, pretty_print: `${to_hit}` };
	} else {
		return send_error(`${to_hit} is not a number nor a Dice number`);
	}
	kwargs.shift();

	original_amount = kwargs[0];
	if (typeof kwargs[0] == "string") {
		amount = Dice.detailed(kwargs[0]);
		amount = {
			result: amount.result,
			pretty_print: `${original_amount} (${amount.rolls})${
				amount.modifier ? "+" + amount.modifier : ""
			} = ${amount.result}`,
		};
	} else if (typeof amount == "number") {
		amount = { result: Math.floor(kwargs[0]) };
		amount = { result: amount.result, pretty_print: `${amount.result}` };
	} else {
		return send_error(`${amount} is not a number nor a Dice number`);
	}
	kwargs.shift();

	if (attacked.stats.ac < to_hit.result) {
		attacked.get_damaged(amount.result);
		return send_message(
			`Rolled a ${to_hit.pretty_print}:\nIt's a hit!\n${attacked.name} got damaged ${amount.pretty_print}hp`
		);
	} else {
		return send_message(`Rolled a ${to_hit.pretty_print}:\nIt's not a hit`);
	}
};
