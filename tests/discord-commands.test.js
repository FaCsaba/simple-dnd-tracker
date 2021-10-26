const { run_command, commands } = require("../commands/commands");

describe("Command runner", () => {
	test("Incorrect command", () => {
		res = run_command(["lasjkdhflahd"]);
		expect(res).toHaveProperty("success", false);
	});
});

describe("Help command", () => {
	test("help command, no other commands", () => {
		res = run_command(["help"]);
		expect(res).toHaveProperty("success", true);
		expect(res).toHaveProperty("message");
		expect(res.message).toMatch(/Help menu:/);
	});

	test("none existing command", () => {
		res = run_command(["help", "nacewiucansd"]);
		expect(res).toHaveProperty("success", false);
		expect(res).toHaveProperty("message");
		expect(res.message).toMatch(
			/is not a valid command. Type .+help for commands list/
		);
	});

	Object.entries(commands).forEach((entires) => {
		const [c_name, c] = entires;
		test(`help command with the command ${c_name}`, () => {
			res = run_command(["help", `${c_name}`]);
			expect(res).toHaveProperty("success", true);
			expect(res).toHaveProperty("message");
			expect(res.message).toMatch(
				`**${c.name}**:\n${c.discription_long}\n\`\`\`${c.usage}\`\`\``
			);
		});
	});
});

describe("Init command", () => {
	test("Init", () => {
		res = run_command(["init"]);
		expect(res).toHaveProperty("success", true);
		expect(res.message).toMatch(/Epic McGee: [0-9]+/);
		expect(res.message).toMatch(/test1: [0-9]+/);
		expect(res.message).toMatch(/test 2: [0-9]+/);
	});

	test("Init with dice roll", () => {
		res = run_command(["init", "Epic McGee", "1d20+5"]);
		expect(res).toHaveProperty("success", true);
		expect(res.message).toMatch(/Epic McGee: [0-9]+/);
		expect(res.message).toMatch(/test1: [0-9]+/);
		expect(res.message).toMatch(/test 2: [0-9]+/);
	});

	test("Init with number", () => {
		res = run_command(["init", "Epic McGee", "1.234"]);
		expect(res).toHaveProperty("success", true);
		expect(res.message).toMatch(/Epic McGee: [0-9]+/);
		expect(res.message).toMatch(/test1: [0-9]+/);
		expect(res.message).toMatch(/test 2: [0-9]+/);
	});

	test("Init with wrong creature name", () => {
		res = run_command(["init", "lakjsdhf", "1"]);
		expect(res).toHaveProperty("success", false);
		expect(res.message).toMatch(/Unknown creature/);
	});

	test("Init with wrong number", () => {
		res = run_command(["init", "Epic McGee", "Number.MAX_VALUE+1"]);
		expect(res).toHaveProperty("success", false);
		expect(res.message).toMatch(/is not a number or Dice roll/);
	});

	test("Init with no number", () => {
		res = run_command(["init", "Epic McGee"]);
		expect(res).toHaveProperty("success", false);
		expect(res.message).toMatch(/Needs an initiative number/);
	});
});

describe("Attack command", () => {
	test("Attack without input ", () => {
		res = run_command(["attack"]);
		expect(res).toHaveProperty("success", false);
		expect(res.message).toMatch(/Not enough arguments/);
	});

	test("Attack with creature", () => {
		res = run_command(["attack", "Epic McGee", "101", "6d20"]);
		expect(res).toHaveProperty("success", true);
		expect(res.message).toMatch(/It's a hit!/);
		expect(res.message).toMatch(/[1-9]+hp/);
	});

	test("Attack with creature, unsuccessful hit", () => {
		res = run_command(["attack", "Epic McGee", "100", "1"]);
		expect(res).toHaveProperty("success", true);
		expect(res.message).toMatch(/It's not a hit./);
	});

	test("Attack with creature using dice roll to_hit", () => {
		res = run_command(["attack", "Epic McGee", "1d20+5", "1"]);
		expect(res).toHaveProperty("success", true);
		expect(res.message).toMatch(/(It's a hit!)|(It's not a hit\.)/);
	});

	test("Attack with creature using dice roll damage", () => {
		res = run_command(["attack", "Epic McGee", "101", "6d20+5"]);
		expect(res).toHaveProperty("success", true);
		expect(res.message).toMatch(/It's a hit!/);
		expect(res.message).toMatch(/[1-9]+hp/);
	});

	test("Attack with wrong creature", () => {
		res = run_command(["attack", ";alskdfj;a"]);
		expect(res).toHaveProperty("success", false);
		expect(res.message).toMatch(/Unknown creature/);
	});

	test("Attack with no to_hit", () => {
		res = run_command(["attack", "Epic McGee"]);
		expect(res).toHaveProperty("success", false);
		expect(res.message).toMatch(/is not a number nor a Dice number/);
	});

	test("Attack with incorrect to_hit", () => {
		res = run_command(["attack", "Epic McGee", ";aklsdjf;"]);
		expect(res).toHaveProperty("success", false);
		expect(res.message).toMatch(/is not a number nor a Dice number/);
	});

	test("Attack with no damage", () => {
		res = run_command(["attack", "Epic McGee", "1d20"]);
		expect(res).toHaveProperty("success", false);
		expect(res.message).toMatch(/is not a number nor a Dice number/);
	});

	test("Attack with incorrect damage", () => {
		res = run_command(["attack", "Epic McGee", "1d20"]);
		expect(res).toHaveProperty("success", false);
		expect(res.message).toMatch(/is not a number nor a Dice number/);
	});
});
