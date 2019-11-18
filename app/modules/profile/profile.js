module.exports = (common) => {
	common.client.on('message', msg => {
	});

	common.client.on('guildMemberAdd', member => {
		member.guild.channels.get(process.env.HELLO_CHANNEL).send(`Привет, ${member}! Присаживайся поудобнее, прочитай канал <#${process.env.RULES_CHANNEL}> и расскажи о себе пару слов.`);
	})

	common.registrator.register('ктоя', function(msg){
		return common.client.channels.get(msg.channel.id).send(`Действительно, кто ты, ${msg.author}?`);
	});
}