interface AbilityScore {
    Strength: number
    Dexterity: number
    Constitution: number
    Intelligence: number
    Wisdom: number
    Charisma: number
}

function abilityScoreToModifier(ability_score: AbilityScore): AbilityScore {
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

let test_stat: StatsConfig = {
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

interface Spells {}

class Entities {
    weapons: Map <string, Weapon>
    creatures: Map<string, Creature>
    stats: Map<string, StatsConfig>
    spells: Map<string, Spells>
    constructor () {
        this.weapons = new Map;
        this.creatures = new Map;
        this.stats = new Map;
        this.spells = new Map;
    }
    getCreature(creatureName: string): Creature{
        if (this.creatures.has(creatureName))
            return this.creatures.get(creatureName) as Creature
        else throw new Error("Creature not found! Did you forget to check if creature exists?");
    }

    showAllCreatures(): string {
        if (this.creatures.size < 1) {
            return "There are no creatures"
        }
        let Names: string = "Creatures: "
        this.creatures.forEach((_, name) => {
            Names = Names.concat(`${name} `)
        })
        return Names;
    }

    save() {

    }
}

export let entities = new Entities()

interface Weapon {
    name: string
    owner: Creature | null
    to_hit: Dice
    damage: Dice
    max_range: number
    min_range?: number
    radios?: number
}

export class Creature {
    name: string
    ability_score: AbilityScore
    ability_modifier: AbilityScore
    max_health: number
    hp: number
    ac: number
    initiative_roll: string
    damage_delt: {total: number, amounts: number[]}
    damage_receaved: {total: number, amounts: number[]}
    weapons: Map<string, Weapon>
    init: number
    
    private _is_player: boolean | undefined
    
    constructor(name: string, stats_config: StatsConfig, is_player?: boolean) {
        this.name = name;
        this.ability_score = stats_config.ability_score;
        this.ability_modifier = abilityScoreToModifier(this.ability_score);
        this.max_health = stats_config.max_health;
        this.hp = this.max_health;
        this.ac = stats_config.ac;
        this.damage_delt = {total: 0, amounts: []};
        this.damage_receaved = {total: 0, amounts: []};
        this.weapons = new Map;

        this._is_player = is_player;
        this.init = NaN;
        
        this.initiative_roll = `1d20+(${this.ability_modifier.Dexterity})`;

        if (entities.creatures.has(this.name)) {throw new Error("Can not have two creatures with the same name, this is a bug, did you forget to check for this?")};
        entities.creatures.set(this.name, this);
    };
    
    add_weapon(weapon: Weapon) {
        weapon.owner = this;
        this.weapons.set(weapon.name, weapon);
    };
    
    damage_creature(another_creature: Creature, amount: number): void {
        this.damage_delt.amounts.push(amount);
        this.damage_delt.total += amount;
        another_creature.get_damaged(amount);
    }

    get_damaged(amount: number): void {
        this.damage_receaved.amounts.push(amount);
        this.damage_receaved.total += amount;
        this.hp - amount;
    }
}

if (process.env.NODE_ENV === "test") {
    new Creature("test", test_stat, false);
    new Creature("test1", test_stat, true);
}
