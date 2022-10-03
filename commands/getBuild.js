const { SlashCommandBuilder } = require('discord.js');
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
		const fetched_data = await fetch_demo(champion_name);
		await interaction.reply({ content: fetched_data[0], ephemeral: true });
	},
};

async function fetch_demo(champion_name) {
	try {
		const { data } = await axios.get('https://u.gg/lol/champions/' + champion_name + '/build');
		const $ = cheerio.load(data);
		const elements = [];

		elements.push($('.perk-style-title').first().text());

		return elements;
	} catch (error) {
		console.error(error);
	}
}

