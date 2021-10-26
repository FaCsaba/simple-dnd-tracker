const { Creature, Stats, Weapon } = require("../DNDTools");

let p1stats = new Stats(18, 15, 16, 6, 12, 8, 85, 13);
let p2stats = new Stats(10, 12, 11, 15, 15, 14, 53, 12);

let cobold1 = new Creature("Displacer 1", p1stats);
let cobold2 = new Creature("Displacer 2", p1stats);
let mage = new Creature("Mage", p2stats);

let leonstats = new Stats(8, 15, 19, 11, 12, 20, 90, 12);
let leon = new Creature("Leon", leonstats);

creatures = new Map();
creatures.set(cobold1.name, cobold1);
creatures.set(cobold2.name, cobold2);
creatures.set(mage.name, mage);
creatures.set(leon.name, leon, true);

module.exports.creatures = creatures;
