import { Client, Intents } from 'discord.js';
import 'dotenv/config';

const leagueBot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILD_INTEGRATIONS] });

leagueBot.once('ready', () => {
	leagueBot.user.setActivity('with ur mom', { type: 'PLAYING' });
	console.log('ready');

	// const guild = leagueBot.guilds.cache.get(process.env.GUILD_ID);
	// let commands;

	// if (guild) {
	// 	commands = guild.commands;
	// } else {
	// 	commands = leagueBot.application?.commands;
	// }

	// commands?.create({
	// 	name: 'splock',
	// 	description: 'Replay with pong.',
	// });
});

leagueBot.on('interactionCreate', async (interaction) => {
	console.log(interaction);
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'blo') {
		await interaction.reply('Pong!');
	} else if (commandName === 'server') {
		await interaction.reply('Server info.');
	} else if (commandName === 'user') {
		await interaction.reply('User info.');
	}
});

leagueBot.login(process.env.DISCORD_TOKEN);
