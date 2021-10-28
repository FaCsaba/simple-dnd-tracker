import { send_error, send_message } from "../sending";
import { entities } from "../creatures/entities";
import { Dice } from 'dice-typescript';
const dice = new Dice();


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

	let original_hit = kwargs[0];
    let to_hit: {result: number, pretty_print: string} = {result: NaN, pretty_print: "This should not happen"};
	try {
		let to_hit = dice.roll(kwargs[0]);
		/* to_hit = {
			result: to_hit.result,
			pretty_print: `${original_hit} (${to_hit.rolls})${
				to_hit.modifier ? "+" + to_hit.modifier : ""
			} = ${to_hit.result}`,
		 }; */
		 console.log(to_hit);
	} catch {
		if (!isNaN(Math.floor(kwargs[0] as unknown as number))) {
			let to_hit = { result: Math.floor(kwargs[0] as unknown as number), pretty_print: "" };
			to_hit = {
				result: to_hit.result,
				pretty_print: `${to_hit.result}`,
			};
		} else {
			return send_error(`${kwargs[0]} is not a number nor a Dice number`);
		}
	}
	kwargs.shift();

	let original_amount = kwargs[0];
    let amount: {result: number, pretty_print: string} = {result: NaN, pretty_print: "This should not happen"}
	try {
		let amount = dice.roll(kwargs[0]);
		/* amount = {
			result: amount.result,
			pretty_print: `${original_amount} (${amount.rolls})${
				amount.modifier ? "+" + amount.modifier : ""
			} = ${amount.result}`,
		}; */
	} catch {
		if (!isNaN(Math.floor(kwargs[0] as unknown as number))) {
			amount = { result: Math.floor(kwargs[0] as unknown as number), pretty_print: "" };
			amount = {
				result: amount.result,
				pretty_print: `${amount.result}`,
			};
		} else {
			return send_error(`${kwargs[0]} is not a number nor a Dice number`);
		}
	}
	kwargs.shift();

	if (attacked?.ac as number < to_hit.result) {
		attacked?.get_damaged(amount.result);
		return send_message(
			`Rolled a ${to_hit.pretty_print}:\nIt's a hit!\n${attacked?.name} got damaged by ${amount.pretty_print}hp`
		);
	} else {
		return send_message(
			`Rolled a ${to_hit.pretty_print}:\nIt's not a hit.`
		);
	}
}