const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const leagueBot = new Client({ intents: [GatewayIntentBits.Guilds] });

leagueBot.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	leagueBot.commands.set(command.data.name, command);
}

leagueBot.once('ready', () => {
	leagueBot.user.setActivity('with ur mom', { type: 'PLAYING' });
	console.log('ready');
});

leagueBot.on('interactionCreate', async (interaction) => {
	if (!interaction.isChatInputCommand()) return;

	const command = leagueBot.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

leagueBot.login(process.env.DISCORD_TOKEN);
