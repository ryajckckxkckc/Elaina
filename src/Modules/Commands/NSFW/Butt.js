const Command = require('../../../Structures/Command.js');
const { MessageEmbed } = require('discord.js');
const { Colors } = require('../../../Structures/Configuration.js');
const axios = require('axios');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: [],
			description: 'Post random "Butt" images. This command contains NSFW!',
			category: 'NSFW',
			nsfw: true,
			cooldown: 10000
		});
	}

	async run(message) {
		const headers = { 'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.106 Safari/537.36' };
		const data = await axios.get(`http://api.obutts.ru/butts/0/1/random`, { headers }).then(res => res.data);

		const embed = new MessageEmbed()
			.setColor(Colors.DEFAULT)
			.setDescription(`[Click here if the image failed to load.](http://media.obutts.ru/${data[0].preview})`)
			.setImage(`http://media.obutts.ru/${data[0].preview}`)
			.setFooter(`Responded in ${this.client.utils.responseTime(message)}`, message.author.avatarURL({ dynamic: true }));

		return message.reply({ embeds: [embed] });
	}

};
