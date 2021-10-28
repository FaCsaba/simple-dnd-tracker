import { Dice } from 'dice-typescript';
const dice = new Dice();

interface result {
	total: number | undefined, 
	pretty_print: string
}


export function diceNumberOrError(str: string): result {
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