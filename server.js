const Discord   = require('discord.js');
const Sequelize = require('sequelize');
const fs        = require('fs');
require('dotenv').config({ path: __dirname + '/.env' });

const db = new Sequelize('messages', 'user', 'password', {
        host: 'localhost',
        dialect: 'sqlite',
        pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
        },
        storage: __dirname + '/app/db/database.sqlite',
        logging: false
});

let model = {};
const modelsDir = __dirname + '/app/models/';
fs.readdir(modelsDir, (err, files) => {
    files.forEach(file => {
        filename = file.split('.').slice(0, -1).join('.')
        model[filename] = require(modelsDir + filename)(db, Sequelize);
        model[filename].sync();
    });
});

const client = new Discord.Client();
client.login(process.env.TOKEN);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('error', console.error);

let common = {
    'client': client,
    'discord': Discord,
    'db': db,
    'models': model,
};

const registrator = require('./app/commandRegistrator')(common);
common.registrator = registrator;
//loading modules
require('./app/modules/logger/logger')(client, Discord);
require('./app/modules/screwer/screwer')(client);
require('./app/modules/profile/profile')(common);