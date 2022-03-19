const { Client, Intents } = require('discord.js');
const { Routes } = require('discord-api-types/v9');
const { REST } = require('@discordjs/rest');
const { SlashCommandBuilder } = require('@discordjs/builders');

const TOKEN = '<YOUR TOKEN>';
const GUILD_ID = '<YOUR GUILD ID>';
const CLIENT_ID = '<YOUR CLIENT ID>';

// * CLIENT'I BASITCE BOTUMUZ OLARAK DUSUNEBILIRIZ
const client = new Client({
	intents: [Intents.FLAGS.GUILDS],
});
// BOTUMUZA KOMUTLARI EKLEMEK ICIN YARDIMCI ARAC
const rest = new REST({ version: '9' }).setToken(TOKEN);

// EKLENECEK KOMUTLARI YAZIYORUZ
const commands = [
	new SlashCommandBuilder().setName('ping').setDescription('Ping to pong'),
	new SlashCommandBuilder().setName('user').setDescription('Get user info'),
	new SlashCommandBuilder().setName('server').setDescription('Get server info'),
];

// KOMUTLARI BOTUMUZA EKLIYORUZ
rest
	.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
		body: commands,
	})
	.then(() => console.log('Commands Added'))
	.catch(console.error);

// * BOTUMUZ BASLADIGINDAN EMIN OLMAK ICIN BIR KERE CALISMAK UZERE MESAJ YAZDIRIYORUZ KONSOLA
client.once('ready', () => {
	console.log(`Logged in as ${client.user.username}!`);
});

// * KULLANICI ETKILESIME GIRDIGI ZAMAN
client.on('interactionCreate', (interaction) => {
	// * KOMUT OLUP OLMADIGINI KONTROL EDIYORUZ
	if (!interaction.isCommand()) return;

	// * KOMUT ADINI HER SEFERINDE ALMAK YERINE BURADA DIREK ALIYORUZ
	const { commandName } = interaction;

	if (commandName === 'ping') {
		interaction.reply('Pong!');
	}
	else if (commandName === 'server') {
		interaction.reply(
			`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`,
		);
	}
	else if (commandName === 'user') {
		interaction.reply(
			`${interaction.user.username}#${
				interaction.user.discriminator
			} ${interaction.user.avatarURL()}`,
		);
	}
});

// ! BOTA YENI YETKILER EKLENMELI
// ! MESSAGE_CREATE OLUSTURULACAKSA, Intents.FLAGS.GUILD_MESSAGES  BUNU EKLE INTENTS'E
// MESAJ OLUSTURULDUGU ZAMAN
/*
client.on('messageCreate', async (message) => {
	// MESAJ `!` ILE BASLAMIYORSA VEYA MESAJIN SAHIBI BOTSA DEVAM ET VEYA DIKKATE ALMA
	if (!message.content.startsWith('!') || message.author.bot) return;

	console.log(message)q

	// KULLANICI ATMAK ICIN YENI KOMUT
	if (message.content.startsWith('!kick')) {
		// MESAJ MENTION'UNDAN ATILACAK KISIYI AL
		const member = message.mentions.members.first();
		// KULLANICIYI AT
		await member.kick();
	}
});
*/

// * BOTUN HAZIR VE CALISABILIR HALE GELMESI ICIN 'TOKEN'IMIZ ILE GIRIS YAPIYORUZ
// * DIGER BUTUN KODLAR BUNUN UZERINDE OLMALI
client.login(TOKEN);
