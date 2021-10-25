const Dice = require("dice-notation-js");

function ability_score_to_mod(ability_score) {
	return Math.floor((ability_score - 10) / 2);
}

module.exports.Weapon = class Weapon {
	constructor(name, to_hit, damage, max_range, min_range = 0) {
		this.name = name;
		this.owner = null; // unfortunately we have to set this after it is created
		this.to_hit = Dice.parse(to_hit);
		this.damage = Dice.parse(damage);
		this.max_range = max_range;
		this.min_range = min_range;
	}
};

const ability = {
	//ability
	STRENGTH: 0,
	DEXTERITY: 1,
	CONSTITUTION: 2,
	INTELIGENTS: 3,
	WISDOM: 4,
	CHARISMA: 5,
};

module.exports.Stats = class Stats {
	constructor(str, dex, con, int, wis, cha, max_health, ac) {
		this.ability_score = [str, dex, con, int, wis, cha];

		this.modifiers = this.ability_score.map((as) => {
			return ability_score_to_mod(as);
		}); // Iterates through the ability scores and returns the modifiers as an object
		this.initiative_roll = `1d20+${this.modifiers[ability.DEXTERITY]}`;
		this.max_health = max_health;
		this.ac = ac; // I always forget what this stands for, its Armor Class
	}
};

module.exports.Creature = class Creature {
	constructor(name, stats, is_player = false) {
		this.name = name;
		this.max_health = stats.max_health;
		this.health = this.max_health;
		this.temp_health = 0;
		this.damage_received = 0;
		this.stats = stats;
		this.weapons = {};
		this.init = 0;
		this.is_player;
	}

	add_weapon(weapon) {
		weapon.owner = this;
		this.weapons[weapon.name] = weapon;
	}

	get_damaged(amount) {
		this.health = this.health - amount;
		this.damage_received = this.damage_received + amount;
	}
};
