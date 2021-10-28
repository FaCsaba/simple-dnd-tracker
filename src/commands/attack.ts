import { send_error, send_message, ReturnStatus } from '../sending';
import { entities } from "../entities/";
import { Dice } from 'dice-typescript';
const dice = new Dice();

interface result {
	total: number | undefined, 
	pretty_print: string
}

function diceNumberOrError(str: string): result {
	let original_str = str;
	if (original_str == undefined) {
		return {
			total: undefined,
			pretty_print: "No number or Dice number specified"
		}
	} try {
		let returnResult = {total: NaN, pretty_print: 'This should not happen'}
		let returnResultDiceRoll = dice.roll(original_str);
		if (returnResultDiceRoll.errors.length < 1) {
			returnResult = {
				total: returnResultDiceRoll.total, 
				pretty_print: `${returnResultDiceRoll.renderedExpression} = ${returnResultDiceRoll.total}`
			}
			if (!original_str.match(/d/)) {
				returnResult.pretty_print = original_str;
			}
			return returnResult 
		} else {
			return {
				total: undefined,
				pretty_print: `_${original_str}_ is not a number nor a Dice number`
			}
		}
	} catch (e) {
		return {
			total: undefined,
			pretty_print: `_${original_str}_ is not a number nor a Dice number`
		}
	}
}

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