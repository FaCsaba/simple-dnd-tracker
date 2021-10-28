import { send_message, send_error, ReturnStatus } from '../sending';
import { entities, Creature } from '../entities/';

import { Dice } from "dice-typescript";
import { diceNumberOrError } from './dice-checking';
const dice = new Dice();

export function init (kwargs: string[]): ReturnStatus {
	if (entities.creatures.size < 1) {
		return send_message("There are no creatures")
	}

    entities.creatures.forEach((creature: Creature, _:any) => {
		//Does the Dice roll for every creature
		creature.init = dice.roll(creature.initiative_roll).total;
	});

	while (kwargs[0]) {
		// change the dice roll of the selected
		kwargs[0] = kwargs[0].replace(/'|"/g, "");
		if (!entities.creatures.get(kwargs[0])) {
			return send_error(`Unknown creature **${kwargs[0]}**\n${entities.showAllCreatures()}`);
		}
		if (!kwargs[1]) {
			return send_error(`Needs an initiative number`);
		}

		let init = diceNumberOrError(kwargs[1]).total;
		if (init)
			entities.getCreature(kwargs[0]).init = init;
		else {return send_error(`__${kwargs[1]}__ is not a number or Dice number.`)}
		kwargs.shift();
		kwargs.shift();
	}

	// sort
	entities.creatures = new Map(
		[...entities.creatures.entries()].sort((a, b) => b[1].init - a[1].init)
	);

	let return_message = "\`\`\`Creature Initiative\n";
	entities.creatures.forEach((creature: Creature, _: any) => {
		return_message = return_message.concat(
			`${creature.name}: ${creature.init}\n`
		);
	});
	return_message = return_message.concat("\`\`\`")
	return send_message(return_message);
}