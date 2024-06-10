import { createRequire } from "module";
import { fileURLToPath } from "url";
import fs from 'fs-extra'
import chalk from "chalk";
const require = createRequire(import.meta.url);
const version = require("baileys/package.json").version;
const stringSimilarity = require("string-similarity");

//======== OWNER SETTINGS =======\\
global.nomerOwner = "6285766450735";
global.nomerOwner2 = "6285766450735";
global.ownerName = "?";
global.gender = 'boy'
global.agama = 'agama? ga tau'
global.tanggalLahir = '11/05/2005' // contoh '25/11/1993'
global.hobi = 'game'
global.sifat ='nolep'
global.tempatTinggal = 'Sangatta-Kaltim'
global.waifu = 'Megawati'


//======= BOT SETTINGS ======\\
global.botName = "Medusa"
global.session = "session" 
global.runWith = "Panel"
global.language = "id"
global.Qoted = "ftoko"
global.baileysMd = true
global.antiSpam = true
global.fake = botName
global.Console = false
global.print = true
global.copyright = `© ${botName}`
global.fake1 = "Winn"
global.packName = "Winn"
global.authorName = `Open sewa bot 
7 hari  = Rp 3k 
15 hari = Rp 5k
1 bulan = Rp 10k
2 bulan = Rp 20k
4 bulan = Rp 40k
6 bulan = Rp 50k
`
global.autoblockcmd = false;
global.gamewaktu = 60;
global.limitCount = 20;
global.Intervalmsg = 1000; //detik
global.fileStackApi = "AlDgaKtdiT1iL6CwlXMpWz"; //daftar di filestack
global.apiflash = "39fc26a0f40048eb838b8c35e0789947"; //
global.mongodb =''
global.gcounti = {
  prem: 60,
  user: 20,
};




global.fotoRandom = [
  "https://telegra.ph/file/77762a5f1a77a55effcde.jpg",
  "https://telegra.ph/file/77762a5f1a77a55effcde.jpg",
  "https://telegra.ph/file/77762a5f1a77a55effcde.jpg",
  "https://telegra.ph/file/77762a5f1a77a55effcde.jpg",
  "https://telegra.ph/file/77762a5f1a77a55effcde.jpg",
  "https://telegra.ph/file/77762a5f1a77a55effcde.jpg",
  "https://telegra.ph/file/77762a5f1a77a55effcde.jpg",
  "https://telegra.ph/file/77762a5f1a77a55effcde.jpg",
  "https://telegra.ph/file/77762a5f1a77a55effcde.jpg",
  "https://telegra.ph/file/77762a5f1a77a55effcde.jpg",
];


global.apiMiftah = 'free'



global.multiplier = 38

/*============== EMOJI ==============*/
global.rpg = {
  emoticon(string) {
    string = string.toLowerCase();
    let emot = {
      level: "📊",
      limit: "🎫",
      health: "❤️",
      stamina: "⚡",
      exp: "✨",
      atm: "💳",
      money: "💰",
      bank: "🏦",
      potion: "🥤",
      diamond: "💎",
      rawdiamond: "💠",
      common: "📦",
      uncommon: "🛍️",
      mythic: "🎁",
      legendary: "🗃️",
      superior: "💼",
      pet: "🔖",
      trash: "🗑",
      armor: "🥼",
      sword: "⚔️",
      pickaxe: "⛏️",
      axe: "🪓",
      fishingrod: "🎣",
      kondom: "🎴",
      coal: "⬛",
      wood: "🪵",
      rock: "🪨",
      string: "🕸️",
      horse: "🐴",
      cat: "🐱",
      dog: "🐶",
      fox: "🦊",
      robo: "🤖",
      dragon: "🐉",
      petfood: "🍖",
      iron: "⛓️",
      rawiron: "◽",
      gold: "🪙",
      rawgold: "🔸",
      emerald: "❇️",
      upgrader: "🧰",
      bibitanggur: "🌱",
      bibitjeruk: "🌿",
      bibitapel: "☘️",
      bibitmangga: "🍀",
      bibitpisang: "🌴",
      anggur: "🍇",
      jeruk: "🍊",
      apel: "🍎",
      mangga: "🥭",
      pisang: "🍌",
      botol: "🍾",
      kardus: "📦",
      kaleng: "🏮",
      plastik: "📜",
      gelas: "🧋",
      chip: "♋",
      umpan: "🪱",
      skata: "🧩",
      defense: "🛡️",
      strength: "💪🏻",
      speed: "🏃",
      tbox: "🗄️",
    };
    let results = Object.keys(emot)
      .map((v) => [v, new RegExp(v, "gi")])
      .filter((v) => v[1].test(string));
    if (!results.length) return "";
    else return emot[results[0][0]];
  },
};






global.require = require;
global.reloadFile = (file) => reloadFile(file);
global.baileysVersion = `Baileys ${version}`;
global.similarity = (one,two) => similarity(one,two);
global.transformText2 = transformText2
global.transformText3 = transformText3



async function similarity(one,two) {
const treshold = stringSimilarity.compareTwoStrings(one, two)
return treshold.toFixed(2)
}


async function reloadFile(file) {
file = file.url || file;
let fileP = fileURLToPath(file);
fs.watchFile(fileP, () => {
fs.unwatchFile(fileP);
console.log(
chalk.bgGreen(chalk.black("[ UPDATE ]")),
chalk.white(`${fileP}`)
);
import(`${file}?update=${Date.now()}`);
});
}

reloadFile(import.meta.url);


function transformText2(text) {
  const charMap = {
    'A': 'ᴀ', 'B': 'ʙ', 'C': 'ᴄ', 'D': 'ᴅ', 'E': 'ᴇ', 'F': 'ғ', 'G': 'ɢ', 'H': 'ʜ', 'I': 'ɪ',
    'J': 'ᴊ', 'K': 'ᴋ', 'L': 'ʟ', 'M': 'ᴍ', 'N': 'ɴ', 'O': 'ᴏ', 'P': 'ᴘ', 'Q': 'ǫ', 'R': 'ʀ',
    'S': 's', 'T': 'ᴛ', 'U': 'ᴜ', 'V': 'ᴠ', 'W': 'ᴡ', 'X': 'x', 'Y': 'ʏ', 'Z': 'ᴢ',
    '0': '𝟶', '1': '𝟷', '2': '𝟸', '3': '𝟹', '4': '𝟺', '5': '𝟻', '6': '𝟼', '7': '𝟽', '8': '𝟾', '9': '𝟿'
  };

  return text.split('').map(char => {
    return charMap[char.toUpperCase()] || char;
  }).join(' ');
}


function transformText3(text) {
  const charMap = {
    'A': 'ᴀ', 'B': 'ʙ', 'C': 'ᴄ', 'D': 'ᴅ', 'E': 'ᴇ', 'F': 'ғ', 'G': 'ɢ', 'H': 'ʜ', 'I': 'ɪ',
    'J': 'ᴊ', 'K': 'ᴋ', 'L': 'ʟ', 'M': 'ᴍ', 'N': 'ɴ', 'O': 'ᴏ', 'P': 'ᴘ', 'Q': 'ǫ', 'R': 'ʀ',
    'S': 's', 'T': 'ᴛ', 'U': 'ᴜ', 'V': 'ᴠ', 'W': 'ᴡ', 'X': 'x', 'Y': 'ʏ', 'Z': 'ᴢ',
    '0': '𝟶', '1': '𝟷', '2': '𝟸', '3': '𝟹', '4': '𝟺', '5': '𝟻', '6': '𝟼', '7': '𝟽', '8': '𝟾', '9': '𝟿'
  };

  return text.toUpperCase().split('').map(char => {
    return charMap[char] || char;
  }).join(' ');
}

