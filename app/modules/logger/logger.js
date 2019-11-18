module.exports = (client, Discord) => {

	client.on('guildMemberAdd', member => {
		let embed = new Discord.RichEmbed()
			.setColor('#00ff00')
			.setAuthor('Пользователь присоединился', member.user.avatarURL)
			.setTitle(`\`${member.user.tag}\``)
			.setDescription(member)
			.setTimestamp()
			.setFooter('User ID: ' + member.id);
		client.channels.get(process.env.LOG_CHANNEL).send(embed);
	});

	client.on('guildMemberRemove', member => {
		let embed = new Discord.RichEmbed()
			.setColor('#ff0000')
			.setAuthor('Пользователь вышел', member.user.avatarURL)
			.setTitle(`\`${member.user.tag}\``)
			.setDescription(member)
			.setTimestamp()
			.setFooter('User ID: ' + member.id);
		client.channels.get(process.env.LOG_CHANNEL).send(embed);
	});

	client.on('messageDelete', async (message) => {
		let logs = await message.guild.fetchAuditLogs({type: 72});
		let entry = logs.entries.first();
		let embed = new Discord.RichEmbed()
			.setColor('#ff4400')
			.setAuthor('Сообщение удалено', entry.executor.avatarURL)
			.setTitle(`пользователем ${entry.executor.tag}`)
			.setDescription(`в канале ${message.channel}`)
			.addField('Автор сообщения', message.author)
			.addField('Текст сообщения', message.content)
			.setTimestamp()
			.setFooter('Executor ID: ' + entry.executor.id);
		client.channels.get(process.env.LOG_CHANNEL).send(embed);
	});

	client.on('messageUpdate', (oldMessage, newMessage) => {
		if (typeof(oldMessage.content) != 'undefined' && oldMessage.content != ''){
			let embed = new Discord.RichEmbed()
				.setColor('#ffcc00')
				.setAuthor('Сообщение отредактировано', newMessage.author.avatarURL)
				.setTitle(`пользователем ${newMessage.author.tag}`)
				.setDescription(`в канале ${newMessage.channel}`)
				.addField('Старый текст:', oldMessage.content)
				.addField('Новый текст:', newMessage.content)
				.setTimestamp()
				.setFooter('User ID: ' + newMessage.author.id + ', Message ID: ' + newMessage.id);
			client.channels.get(process.env.LOG_CHANNEL).send(embed);
		}
	});
	
}