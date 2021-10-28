import { send_error, send_message, ReturnStatus } from '../sending';
import { entities } from "../entities/";
import { diceNumberOrError } from './dice-checking';


export function attack (kwargs: string[]) {
    let attacked;
    if (!kwargs[0]) {
		return send_error(
			`Not enough arguments for attack.\nMaybe look at the help menu for attack`
		);
	}
	kwargs.forEach((e, ind) => {
		kwargs[ind] = e.replace(/'|"/g, "");
	});
	if (entities.creatures.get(kwargs[0])) {
		attacked = entities.creatures.get(kwargs[0]);
	} else {
		return send_error(`Unknown creature **${kwargs[0]}**\n${entities.showAllCreatures()}`);
	}
	kwargs.shift();
	
	let toHit = diceNumberOrError(kwargs[0]);
	if (toHit.total == undefined) {
		return send_error(toHit.pretty_print + " in AC to attack with.");
	}
	kwargs.shift();

	let amount = diceNumberOrError(kwargs[0]);
	if (amount.total == undefined) {
		return send_error(amount.pretty_print + " in amount to attack with.");
	}
	kwargs.shift();

	if (attacked?.ac as number < (toHit.total as number)) {
		attacked?.get_damaged(toHit.total as number);
		return send_message(
			`Rolled a ${toHit.pretty_print}:\nIt's a hit!\n${attacked?.name} got damaged by ${amount.pretty_print}hp`
		);
	} else {
		return send_message(
			`Rolled a ${toHit.pretty_print}:\nIt's not a hit.`
		);
	}
}