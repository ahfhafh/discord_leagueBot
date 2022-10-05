const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');
const cheerio = require('cheerio');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('getbuild')
		.setDescription('get build for champion')
		.addStringOption(option =>
			option.setName('input')
				.setDescription('input')
				.setRequired(true)),
	async execute(interaction) {
		const champion_name = interaction.options.getString('input');
		const fetched_data = await fetch(champion_name);
		const build_embed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle(champion_name)
			.setURL('https://u.gg/lol/champions/aram/' + champion_name + '-aram')
			.setAuthor({ name: 'From u.gg', iconURL: 'https://static.u.gg/assets/ugg/favicon/apple-touch-icon.png', url: 'https://u.gg' })
			// .setDescription('Some description here')
			.setThumbnail(fetched_data[0])
			.addFields(
				// { name: 'Regular field title', value: 'Some value here' },
				{ name: fetched_data[1], value: fetched_data[2], inline: true },
				{ name: fetched_data[3], value: fetched_data[4], inline: true },
			)
			.addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
			// .setImage('https://i.imgur.com/AfFp7pu.png')
			.setTimestamp();
		await interaction.reply({ embeds: [build_embed], ephemeral: true });
	},
};

async function fetch(champion_name) {
	try {
		const { data } = await axios.get('https://u.gg/lol/champions/aram/' + champion_name + '-aram');
		const $ = cheerio.load(data);
		const elements = [];

		elements.push($('.champion-image').first().attr('src'));
		elements.push($('.perk-style-title').first().text());
		elements.push(($('.perk-row.keystone-row > .perks > .perk-active').first().index() + 1).toString());
		elements.push($('.perk-style-title').eq(1).text());
		elements.push(($('.rune-tree_v2').eq(1).children('.perk-row > .perks > .perk-active').index() + 1).toString());

		return elements;
	} catch (error) {
		console.error(error);
	}
}
// TODO: auto complete champion name
