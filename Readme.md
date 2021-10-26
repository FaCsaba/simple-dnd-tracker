# A simple D&D tracker integrated with discord

<p align="center">
    <img alt="Languages used" src="https://img.shields.io/github/languages/top/FaCsaba/simple-dnd-tracker?style=flat-square">
    <img alt="Status" src="https://github.com/FaCsaba/simple-dnd-tracker/actions/workflows/main.yml/badge.svg?style=flat-square">
</p>

### Dependencies:

1. discord.js
2. dice-notation-js

### Install:

Just `git clone` this repo and `npm i`

### Usage:

Create a config.json file in the root with your discord tokan

```Json
{
    "token": "insert-your-discord-bot-token",
    "prefix": "insert-your-prefered-prefix"
}
```

Now you can do `node .` and it will automatically start

### Commands:

-   prefix + **help**: brings up this menu
-   prefix + **init** ..[creature <amount: number>]: rolls for initiative, optionally you can set what creatures rolled before
-   prefix + **attack** <who gets attacked: creature> <to hit: number> <amount: Dice roll | number>: attacks a creature
-   prefix + **attackwith** <who attacks: creature> <whom: creature> <with what: weapon>: NOT IMPLEMENTED YET

### Features and plans:

-   [x] Rolling for initiative for every creature
-   [x] Attacking someone with a specified amount
-   [ ] Attacking with a weapon/spell
-   [ ] A spell commanding another player to do a DC check
-   [ ] Only rolling initiative for selected creatures
-   [ ] Permission controlling the commands
-   [x] Add unit tests to every functionality
-   [ ] The ability to save gameplay
-   [ ] A map
-   [ ] DM: damage someone without having to do an /attack # quality of life
-   [ ] DM: show more info after every action that can change creature data
