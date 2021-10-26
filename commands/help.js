const { send_message, send_error } = require("./sending");

module.exports.help = function (help_object, kwargs) {
	if (kwargs[0]) {
		if (!help_object.parent[kwargs[0]]) {
			return send_error(
				msg,
				`${kwargs[0]} is not a valid command. Type ${prefix}help for commands list`
			);
		}
		return send_message(
			`**${help_object.parent[kwargs[0]].name}**:\n${
				help_object.parent[kwargs[0]].discription_long
			}\n${help_object.parent[kwargs[0]].usage}`
		);
	}

	return_message = "**Help menu:**\n";
	Object.entries(help_object.parent).forEach((entry) => {
		const [_, value] = entry;
		return_message = return_message.concat(
			`${value.usage}: ${value.discription}\n`
		);
	});
	return send_message(return_message);
};
