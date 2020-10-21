const Discord = require('discord.js');
const Sequelize = require('sequelize');
const config = require('./config.json');

const OKBot = new Discord.Client();
const prefix = config.prefix;
var counter = 0;

const sequelize = new Sequelize('database', 'pc', 'pratdabrat', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const Tags = sequelize.define('tags', {
	userID: {
		type: Sequelize.TEXT,
		unique: true,
	},
	count: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
		allowNull: false,
	},
});

OKBot.once('ready', () => {
	console.log('OK online');
	Tags.sync();
});

OKBot.on('message', message => {

	if(message.content.toLowerCase().includes('ok') == true && !message.author.bot) {
		message.react('🆗');
		counter ++;
		/*const tag = await Tags.create({
			userID: message.author.username,
		});
		tag.increment('count');*/
	}

	if(counter == 20){
		counter = 0;
		message.channel.send('paani pi lo frens 🚰');
	}

	if(!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	if(command === 'ok'){
		message.channel.send('🆗');
	}
	if(command === ''){
		message.channel.send('Ok');
	}
	else if(command === 'help'){
		message.channel.send("add helpful comments here");
	}
	/*else if(command === 'overlord'){
		const m = Tags.max('count').then(max =>{});
		const tag = await Tags.findOne({
			where: {
				count: m
			}
		});
		message.channel.send(`${tag.username} is the Overlord with ${tag.count} OKs`);
	}*/
});

OKBot.login(process.env.BOT_TOKEN);
