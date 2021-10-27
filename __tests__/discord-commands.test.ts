import { run_command, command, commands } from '../src/commands/commands';

describe("Command runner", () => {
	test("Incorrect command", () => {
		let res = run_command(["lasjkdhflahd"]);
		expect(res).toHaveProperty("success", false);
	});
});

describe("Help command", () => {
	test("help command, no other commands", () => {
		let res = run_command(["help"]);
		expect(res).toHaveProperty("success", true);
		expect(res).toHaveProperty("message");
		expect(res.message).toMatch(/Help menu:/);
	});

	test("none existing command", () => {
		let res = run_command(["help", "nacewiucansd"]);
		expect(res).toHaveProperty("success", false);
		expect(res).toHaveProperty("message");
		expect(res.message).toMatch(
			/is not a valid command. Type .+help for commands list/
		);
	});

	
	commands.forEach(command => {

		test(`help command with the command ${command.name}`, () => {
			let res = run_command(["help", `${command.name}`]);
			expect(res).toHaveProperty("success", true);
			expect(res).toHaveProperty("message");
			expect(res.message).toMatch(
				`**${command.name}**:\n${command.discription_long}\n\`\`\`${command.usage}\`\`\``
			);
		});
	});
});

describe("Init command", () => {
	test("Init", () => {
		let res = run_command(["init"]);
		expect(res).toHaveProperty("success", true);
		expect(res.message).toMatch(/Epic McGee: [0-9]+/);
		expect(res.message).toMatch(/test1: [0-9]+/);
		expect(res.message).toMatch(/test 2: [0-9]+/);
	});

	test("Init with dice roll", () => {
		let res = run_command(["init", "Epic McGee", "1d20+5"]);
		expect(res).toHaveProperty("success", true);
		expect(res.message).toMatch(/Epic McGee: [0-9]+/);
		expect(res.message).toMatch(/test1: [0-9]+/);
		expect(res.message).toMatch(/test 2: [0-9]+/);
	});

	test("Init with number", () => {
		let res = run_command(["init", "Epic McGee", "1.234"]);
		expect(res).toHaveProperty("success", true);
		expect(res.message).toMatch(/Epic McGee: [0-9]+/);
		expect(res.message).toMatch(/test1: [0-9]+/);
		expect(res.message).toMatch(/test 2: [0-9]+/);
	});

	test("Init with wrong creature name", () => {
		let res = run_command(["init", "lakjsdhf", "1"]);
		expect(res).toHaveProperty("success", false);
		expect(res.message).toMatch(/Unknown creature/);
	});

	test("Init with wrong number", () => {
		let res = run_command(["init", "Epic McGee", "Number.MAX_VALUE+1"]);
		expect(res).toHaveProperty("success", false);
		expect(res.message).toMatch(/is not a number or Dice roll/);
	});

	test("Init with no number", () => {
		let res = run_command(["init", "Epic McGee"]);
		expect(res).toHaveProperty("success", false);
		expect(res.message).toMatch(/Needs an initiative number/);
	});
});

describe("Attack command", () => {
	test("Attack without input ", () => {
		let res = run_command(["attack"]);
		expect(res).toHaveProperty("success", false);
		expect(res.message).toMatch(/Not enough arguments/);
	});

	test("Attack with creature", () => {
		let res = run_command(["attack", "Epic McGee", "101", "6d20"]);
		expect(res).toHaveProperty("success", true);
		expect(res.message).toMatch(/It's a hit!/);
		expect(res.message).toMatch(/[1-9]+hp/);
	});

	test("Attack with creature, unsuccessful hit", () => {
		let res = run_command(["attack", "Epic McGee", "100", "1"]);
		expect(res).toHaveProperty("success", true);
		expect(res.message).toMatch(/It's not a hit./);
	});

	test("Attack with creature using dice roll to_hit", () => {
		let res = run_command(["attack", "Epic McGee", "1d20+5", "1"]);
		expect(res).toHaveProperty("success", true);
		expect(res.message).toMatch(/(It's a hit!)|(It's not a hit\.)/);
	});

	test("Attack with creature using dice roll damage", () => {
		let res = run_command(["attack", "Epic McGee", "101", "6d20+5"]);
		expect(res).toHaveProperty("success", true);
		expect(res.message).toMatch(/It's a hit!/);
		expect(res.message).toMatch(/[1-9]+hp/);
	});

	test("Attack with wrong creature", () => {
		let res = run_command(["attack", ";alskdfj;a"]);
		expect(res).toHaveProperty("success", false);
		expect(res.message).toMatch(/Unknown creature/);
	});

	test("Attack with no to_hit", () => {
		let res = run_command(["attack", "Epic McGee"]);
		expect(res).toHaveProperty("success", false);
		expect(res.message).toMatch(/is not a number nor a Dice number/);
	});

	test("Attack with incorrect to_hit", () => {
		let res = run_command(["attack", "Epic McGee", ";aklsdjf;"]);
		expect(res).toHaveProperty("success", false);
		expect(res.message).toMatch(/is not a number nor a Dice number/);
	});

	test("Attack with no damage", () => {
		let res = run_command(["attack", "Epic McGee", "1d20"]);
		expect(res).toHaveProperty("success", false);
		expect(res.message).toMatch(/is not a number nor a Dice number/);
	});

	test("Attack with incorrect damage", () => {
		let res = run_command(["attack", "Epic McGee", "1d20"]);
		expect(res).toHaveProperty("success", false);
		expect(res.message).toMatch(/is not a number nor a Dice number/);
	});
});
