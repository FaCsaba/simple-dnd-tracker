interface AbilityScore {
    Strength: number
    Dexterity: number
    Constitution: number
    Intelligence: number
    Wisdom: number
    Charisma: number
}

function ability_score_to_mod(ability_score: AbilityScore): AbilityScore {
	let modifiers: AbilityScore
    modifiers = {
        Strength: NaN,
        Dexterity: NaN,
        Constitution: NaN,
        Intelligence: NaN,
        Wisdom: NaN,
        Charisma: NaN
    },

    Object.entries(ability_score).forEach((entry: [string, number]) => {
        const [key, value] = entry;
        if (key in modifiers) {
            (modifiers as any)[key] = Math.floor((value - 10) / 2);
            (modifiers as AbilityScore);
        }
        console.log(key, value);
      })


    return modifiers;
}


interface StatsConfig {
    ability_score: AbilityScore
    ability_modifier?: AbilityScore
    initiative_roll?: string
    max_health: number
    ac: number
}

let stats_config: StatsConfig = {
    ability_score: {
        Strength: 1,
        Dexterity: 2,
        Constitution: 3,
        Intelligence: 4,
        Wisdom: 5,
        Charisma: 6
    },
    max_health: 59,
    ac: 13
}

type Dice = string;

interface Entites {
    weapons: [],
    creatures: Creature[],
    

}

interface Weapon {
    name: string
    owner: Creature | null
    to_hit: Dice
    damage: Dice
    max_range: number
    min_range?: number
    radios?: number
}

class Creature {
    name: string
    ability_score: AbilityScore
    ability_modifier: AbilityScore
    max_health: number
    ac: number
    initiative_roll: string
    weapons: Map<string, Weapon>

    private _is_player: boolean | undefined
    private _init: number
    
    constructor(name: string, stats_config: StatsConfig, is_player?: boolean) {
        this.name = name;
        this.ability_score = stats_config.ability_score;
        this.ability_modifier = ability_score_to_mod(this.ability_score);
        this.max_health = stats_config.max_health;
        this.ac = stats_config.ac;
        this._is_player = is_player;
        this._init = NaN;
        this.weapons = new Map;

        this.initiative_roll = `1d20${
			this.ability_modifier.Dexterity == 0
				? ""
				: "+" + this.ability_modifier.Dexterity
		}`
    }

    add_weapon(weapon: Weapon) {
        weapon.owner = this;
        this.weapons.set(weapon.name, weapon);
    }
}

