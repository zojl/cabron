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
		if (!message.guild) return;
		const logs = await message.guild.fetchAuditLogs({
			limit: 1,
			type: 'MESSAGE_DELETE',
		});
		const entry = logs.entries.first();
		const isCorrectEntry = typeof(entry) != 'undefined' && entry.target.id === message.author.id;
		const avatar = isCorrectEntry ? entry.executor.avatarURL : message.author.avatarURL;
		const userTag = isCorrectEntry ? entry.executor.tag : 'неизвестно или автором';
		const executorId = isCorrectEntry ? entry.executor.id : '-----';
		const embed = new Discord.RichEmbed()
			.setColor('#ff4400')
			.setAuthor('Сообщение удалено', avatar)
			.setTitle(`пользователем ${userTag}`)
			.setDescription(`в канале ${message.channel}`)
			.addField('Автор сообщения', message.author)
			.addField('Текст сообщения', message.content)
			.setTimestamp()
			.setFooter('Executor ID: ' + executorId);
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
