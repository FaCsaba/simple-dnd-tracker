import { send_message, send_error, ReturnStatus } from '../sending';
import { entities } from '../creatures/entities';

import {Dice} from "dice-typescript";
const dice = new Dice();

export function init (kwargs: string[]): ReturnStatus {
	if (entities.creatures.size < 1) {
		return send_message("There are no creatures")
	}

    entities.creatures.forEach((creature:any, _:any) => {
		//Does the Dice roll for every creature
		creature.init = dice.roll(creature.stats.initiative_roll).total;
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

		let init;
		try {
			init = dice.roll(kwargs[1]).total;
		} catch (e) {
			if (!isNaN(Math.floor(kwargs[1] as unknown as number))) {
				init = Math.floor(kwargs[1] as unknown as number) ;
			} else {
				return send_error(
					`**${kwargs[1]}** is not a number or Dice roll.`
				);
			}
		}

		entities.getCreature(kwargs[0]).init = init;
		kwargs.shift();
		kwargs.shift();
	}

	// sort
	entities.creatures = new Map(
		[...entities.creatures.entries()].sort((a, b) => b[1].init - a[1].init)
	);

	let return_message = "";
	entities.creatures.forEach((creature: any, _: any) => {
		return_message = return_message.concat(
			`${creature.name}: ${creature.init}\n`
		);
	});
	return send_message(return_message);
}