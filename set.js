const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTU1kNjZJY0xXWi9NQzgvTUNtelhWSzRBME5RcVJqSXpJc2NoV0Q4MEIwdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicm95LzdKajdWa1BHcHYvNHhiMEd1VEU5OFMrT1I0Ny9xWDNjZEp2a1RqWT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDTHA0TGhTdUNWVVpMM2tyNVowallSUlNXZnpNWC91VEt2cHlpU1psVkdrPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJKOTd4OWsyTitSS0VjRG84ME0zWXFhU2kxcmNRM2JNaFZ1L3NxYXhKUXdNPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IndNN1JmbktvOGp6UE5RbTBocUJzT3ZSb0tPbFJ0MXg2cjBtNFE1Z3RURnc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJDNThoRTlmMzVWQWVHQ2hGb2x1UG9KNGhxSnU2MU1BRGFsVi85eEQ4VW89In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic0tKclhvcmRmbU5zMW1tYXZUZE54OGZudUE4Y0FXUVBGMjRQaTJCUXJtdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZEliUTVCRjRGTTZQaDEzb2cxN3BXZGJ5MHplaWtEL2FIcDIxZzA5d21uRT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImR2eitPYnRUN0krYmJKQy9VTjZyam5uUXp1ZTFGM2JjMzYyQ1dkVW9ac0NyWnZ6S1UzVDF3T2JzZW0rOWtVODkzRCtGeE1JSGZFSVNkOXYyTGtYZUN3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjM5LCJhZHZTZWNyZXRLZXkiOiJTVEhpUGVVZWF2d3pvRWhpb3hNaWcrckgyTkVXQmVpT0pFSGpFTmtQRnZRPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJNcXFUWmktRFNhNjAtNTdnZHMwSTlnIiwicGhvbmVJZCI6IjA1ZDg0NjEwLTQ1OGQtNDg3OC1hMDNkLTllOWVlZDFlODM4OSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIxcER6MW9uUlg2eFZRMERjRlFRWFg3cFIrQzQ9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYU9oWVZFcVJ2RGNxOE15NUZuYmI5dW11cWtVPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkpCVlYxUk5KIiwibWUiOnsiaWQiOiIyNTQxMTE5MTg2NTc6NjNAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiVG9ubnkifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ05mOW5ja0hFTlMydWI0R0dBd2dBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Ikh2SHZrK2N1ckZxZjhaUWtLZ3BQaWxyREpoOGZXczVaQTJRZFdOTEdQRjA9IiwiYWNjb3VudFNpZ25hdHVyZSI6Imc1d202aHFXL0lsWE9zaUFrc2Y0VmZRR1pCS01uZHM3clRkZmpMdmVhY0pEbEpKWHc3cDhraVZ4d2tiR3RHdUdudlIwbnhLREw3OE1scE9CdGpjMEJBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJFbk52M1phL0tnaVlRYTh3dWx5dXVWcGZ6T2NCMFVCZVdKZDc3bElUampyV3hKRXUvRVZNcFpNcVU1ekhzZTFCYm9FME11WGlhZkRhdDEzVFRpUlBDZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NDExMTkxODY1Nzo2M0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJSN3g3NVBuTHF4YW4vR1VKQ29LVDRwYXd5WWZIMXJPV1FOa0hWalN4anhkIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQxNTc3MDU4LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUx0MSJ9',
    PREFIXE: process.env.PREFIX || ",",
    OWNER_NAME: process.env.OWNER_NAME || "CASEYRHODES ⚜️",
    CAPTION : process.env.CAPTION || "CASEYRHODES-XMD",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "Caseyrhodes",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_REACT : process.env.AUTO_REACT || 'yes',
    ANTICALL: process.env.ANTICALL || 'non',
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VakUEfb4o7qVdkwPk83E",
    WEBSITE :process.env.GURL || "https://whatsapp.com/channel/0029VakUEfb4o7qVdkwPk83E",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'CASEYRHODES XMD',
    URL : process.env.BOT_MENU_LINKS || 'https://i.ibb.co/21YS7vBf/lordali.jpg',
    URL: process.env.URL || "https://files.catbox.moe/yedfbr.jpg",
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    ANTIDELETEDM: process.env.ANTIDELETEDM|| "non",
    AUTO_REPLY: process.env.AUTO_REPLY || "non",
    ADMGROUP: process.env.ADMGROUP || "non",
    CHAT_BOT : process.env.CHAT_BOT|| "non",
    AUTO_BIO: process.env.AUTO_BIO || "yes",
    TIMEZONE: process.env.TIMEZONE || "Africa/Nairobi",
    AUTO_SAVE_CONTACTS: process.env.AUTO_SAVE_CONTACTS || "non",
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'non',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    AUTOREAD_MESSAGES: process.env.AUTOREAD_MESSAGES || "non",
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    AUTO_REACT_STATUS: process.env.AUTO_REACT_STATUS || "non",
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
