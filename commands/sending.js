const { MessageEmbed } = require("discord.js");

module.exports.send_error = function (err_msg) {
	return { success: false, message: err_msg };
};

module.exports.send_message = function (message_to_send) {
	return { success: true, message: message_to_send };
};
