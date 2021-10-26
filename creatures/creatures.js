const { Creature, Stats, Weapon } = require("../DNDTools");

let test_creature_stats_1 = new Stats(10, 10, 10, 10, 10, 10, 10, 10);
let test_creature_1 = new Creature("test1", test_creature_stats_1);

let test_creature_stats_2 = new Stats(20, 20, 20, 20, 20, 20, 20, 20);
let test_creature_2 = new Creature("test 2", test_creature_stats_2);

let test_creature_stats_3 = new Stats(100, 100, 100, 100, 100, 100, 100, 100);
let test_creature_3 = new Creature("Epic McGee", test_creature_stats_3);

let epicweapon = new Weapon("Epic weapon", "1d20+4", "1d5", "10");
test_creature_3.add_weapon(epicweapon);

let creatures = new Map();

creatures.set(test_creature_1.name, test_creature_1);
creatures.set(test_creature_2.name, test_creature_2);
creatures.set(test_creature_3.name, test_creature_3);

module.exports.creatures = creatures;
