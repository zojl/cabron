module.exports = (client) => {
	const huificate = require('./huificate');
	client.on('message', msg => {
		if(msg.author.bot) return;
		if(!msg.channel.nsfw) return;
		if (Math.floor(Math.random()*10) == 0 || msg.isMentioned(client.user)) {
			response = huificate(msg.content);
			if (response)
				msg.channel.send(response);
		}
	});
}