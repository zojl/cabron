module.exports = (common) => {
	commands = {};
	commandHelps = [];

	common.client.on('message', (msg) => {
		const prefix = process.env.PREFIX;
		if (
			typeof(msg.content != 'undefined') &&
			msg.content != '' &&
			msg.content.substring(0, prefix.length) == prefix
		) {
			const firstWord = msg.content.split(' ', 1)[0];
			const command = firstWord.substring(prefix.length);
			console.log(command);
			if (typeof(commands[command]) != 'undefined') {
				commands[command](msg, common);
			}
		}
	});

	return {
		register: function(names, callback, help = null){
			if (help !== null) {
				helpObject = help;
				if (typeof(names) == 'string')
					helpObject.command = names;
				if (Array.isArray(names)){
					helpObject.command = names[0];
					helpObject.aliases = names.slice(1);
				}
				commandHelps.push(helpObject);
			}

			if (typeof(names) == 'string'){
				return commands[names] = callback;
			}
			if (Array.isArray(names)){
				names.forEach((name) => {
					commands[name] = callback;
				})
			}
		}
	}
}