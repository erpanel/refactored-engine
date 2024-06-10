"use strict";
import "./settings.js";
const {
makeInMemoryStore,
useMultiFileAuthState,
makeCacheableSignalKeyStore,
MessageRetryMap,
fetchLatestBaileysVersion,
PHONENUMBER_MCC,
} = (await import("baileys")).default;
import fs, { readdirSync, existsSync, readFileSync, watch,statSync  } from "fs";
import logg from "pino";
import { Socket, smsg, protoType } from "./lib/simple.js";
import CFonts from "cfonts";
import path, { join, dirname,basename  } from "path";
import { memberUpdate, groupsUpdate } from "./message/group.js";
import { antiCall } from "./message/anticall.js";
import { connectionUpdate } from "./message/connection.js";
import { Function } from "./message/function.js";
import NodeCache from "node-cache";
import { createRequire } from "module";
import { fileURLToPath, pathToFileURL } from "url";
import { platform } from "process";
import syntaxerror from "syntax-error";
import { format } from "util";
import chokidar from 'chokidar';
import chalk from 'chalk'


const __dirname = dirname(fileURLToPath(import.meta.url));
global.__filename = function filename(
pathURL = import.meta.url,
rmPrefix = platform !== "win32"
) {
return rmPrefix
? /file:\/\/\//.test(pathURL)
? fileURLToPath(pathURL)
: pathURL
: pathToFileURL(pathURL).toString();
};
/*
global.__dirname = function dirname(pathURL) {
return path.dirname(global.__filename(pathURL, true))
};
*/
global.__require = function require(dir = import.meta.url) {
return createRequire(dir);
};


protoType();

const readline = require("readline")
const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const question = (text) => new Promise((resolve) => rl.question(text, resolve))


const pairingCode = false // process.argv.includes("--pairing-code");
const useMobile = process.argv.includes("--mobile");
const msgRetryCounterCache = new NodeCache();
const msgRetryCounterMap = (MessageRetryMap) => {};

CFonts.say("fearless", {
font: "chrome",
align: "left",
gradient: ["red", "magenta"],
});

//Connect to WhatsApp
const connectToWhatsApp = async () => {
await (await import("./message/database.js")).default();

//const { state } = useSingleFileAuthState('./session.json')
const { state, saveCreds } = await useMultiFileAuthState(session);
const store = makeInMemoryStore({
logger: logg().child({ level: "fatal", stream: "store" }),
});

  

  
const { version, isLatest } = await fetchLatestBaileysVersion();

//Funtion agar pesan bot tidak pending
const getMessage = async (key) => {
if (store) {
const msg = await store.loadMessage(key.remoteJid, key.id, undefined);
return msg?.message || undefined;
}
// only if store is present
return proto.Message.fromObject({});
};

//Untuk menyimpan session
const auth = {
creds: state.creds,
/** caching makes the store faster to send/recv messages */
keys: makeCacheableSignalKeyStore(
state.keys,
logg().child({ level: "fatal", stream: "store" })
),
};

//Funtion agar bisa pake button di bailey terbaru  
const patchMessageBeforeSending = (message) => {
const requiresPatch = !!(
message.buttonsMessage ||
message.listMessage || 
message.templateMessage
);
if (requiresPatch) {
message = {
viewOnceMessage: {
message: {
messageContextInfo: {   
deviceListMetadataVersion: 2,  
deviceListMetadata: {},
},
...message,
},
},
};
}
return message
}


//Koneksi nih silakan di isi
const connectionOptions = {
version,
printQRInTerminal: true,
mobile: useMobile,
patchMessageBeforeSending,
logger: logg({ level: "fatal" }),
auth,
browser: ["Chrome (Linux)", "", ""], // for this issues https://github.com/WhiskeySockets/Baileys/issues/328
getMessage,
MessageRetryMap,
keepAliveIntervalMs: 20000,
defaultQueryTimeoutMs: undefined, // for this issues https://github.com/WhiskeySockets/Baileys/issues/276
connectTimeoutMs: 30000,
emitOwnEvents: true,
fireInitQueries: true,
generateHighQualityLinkPreview: true,
syncFullHistory: true,
markOnlineOnConnect: true,
msgRetryCounterCache
};

global.conn = Socket(connectionOptions);
store.bind(conn.ev);








  
conn.ev.process(async (events) => {
//Cnnection Update
if (events["connection.update"]) {
if (db.data == null) await loadDatabase();
const update = events["connection.update"];
await connectionUpdate(connectToWhatsApp, conn, update);
}

// credentials updated -- save them
if (events["creds.update"]) {
await saveCreds();
}

// received a new message
if (events["messages.upsert"]) {

const chatUpdate = events["messages.upsert"];
if (global.db.data)  global.db.write();
if (!chatUpdate.messages) return;
let m = chatUpdate.messages[0]
  //chatUpdate.messages[chatUpdate.messages.length - 1] // ||
if (!m.message) return;
if (m.key.id.startsWith("BAE5") && m.key.id.length === 16) return;
const {register} = await import(`./message/register.js?v=${Date.now()}`).catch((err) => console.log(err))
m = await smsg(conn, m);
//let {handler} = await import('./message/case.js');
const {handler} = await import(`./message/case.js?v=${Date.now()}`).catch((err) => console.log(err))
await register(m)
handler(conn, m, chatUpdate, store);

}

//Anti Call
if (events.call) {
const node = events.call;
antiCall(db, node, conn);
}

//Member Update
if (events["group-participants.update"]) {
const anu = events["group-participants.update"];
if (global.db.data == null) await loadDatabase();
memberUpdate(conn, anu);
}

//------------------------------------[BATAS]--------------------------------\\
});

global.reloadHandler = async function (restatConn) {
};


    
    
    const pluginFolder = path.join(__dirname, "./plugins");
    const pluginFilter = (filename) => /\.js$/.test(filename);
    global.plugins = {};

    async function filesInit(folderPath) {
      const files = readdirSync(folderPath);

      for (let file of files) {
        const filePath = join(folderPath, file);
        const fileStat = statSync(filePath);

        if (fileStat.isDirectory()) {
          // Jika file adalah sebuah direktori, panggil kembali fungsi filesInit dengan folder baru sebagai parameter
          await filesInit(filePath);
        } else if (pluginFilter(file)) {
          // Jika file adalah file JavaScript, lakukan inisialisasi
          try {
            const module = await import("file://" + filePath);
            global.plugins[file] = module.default || module;
          } catch (e) {
            conn.logger.error(e);
            delete global.plugins[file];
          }
        }
      }
    }

    filesInit(pluginFolder);
    




global.reload = async (_ev, filename) => {
  //console.log(filename)
  if (pluginFilter(filename)) {
    let dir = global.__filename(join( filename), true); //pluginFolder,
    if (filename in global.plugins) {
      if (existsSync(dir))
      console.log(
        chalk.bgGreen(chalk.black("[ UPDATE ]")),
        chalk.white(`${filename}`)
        ) // conn.logger.info(`re - require plugin '${filename}'`);
      else {
        conn.logger.warn(`deleted plugin '${filename}'`);
        return delete global.plugins[filename];
      }
    } else console.log(
      chalk.bgGreen(chalk.black("[ UPDATE ]")),
      chalk.white(`${filename}`)
      )//;conn.logger.info(`requiring new plugin '${filename}'`);
    //console.log(dir)
    let err = syntaxerror(readFileSync(dir), filename, {
      sourceType: "module",
      allowAwaitOutsideFunction: true,
    });
    if (err)
      conn.logger.error(
        `syntax error while loading '${filename}'\n${format(err)}`
      );
    else
      try {
        const module = await import(
          `${global.__filename(dir)}?update=${Date.now()}`
        );
        global.plugins[filename] = module.default || module;
      } catch (e) {
        conn.logger.error(`error require plugin '${filename}\n${format(e)}'`);
      } finally {
        global.plugins = Object.fromEntries(
          Object.entries(global.plugins).sort(([a], [b]) => a.localeCompare(b))
        );
      }
  }
};

// Buat instance Chokidar watcher
const watcher = chokidar.watch(pluginFolder, {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true,
    depth: 99, // Tentukan kedalaman rekursi
    awaitWriteFinish: {
        stabilityThreshold: 2000,
        pollInterval: 100,
    },
});

// Tambahkan event listener untuk memantau perubahan
watcher.on('all', (event, path) => {

    // Panggil fungsi reload jika file yang berubah adalah file JavaScript
    if (event === 'change' && path.endsWith('.js')) {
        const filename = path.split('/').pop(); // Dapatkan nama file dari path
        global.reload(null, filename); // Panggil fungsi reload dengan null untuk _ev dan nama file
    }
});




Object.freeze(global.reload);
watch(pluginFolder, global.reload);
//await global.reloadHandler()

Function(conn);

const toFirstCase = (str) => {
let first = str
.split(" ") // Memenggal nama menggunakan spasi
.map((nama) => nama.charAt(0).toUpperCase() + nama.slice(1)) // Ganti huruf besar kata-kata pertama
.join(" ");

return first;
};

const Log = (text) => {
console.log(text);
};

let d = new Date();
let locale = "id";
let gmt = new Date(0).getTime() - new Date("1 Januari 2021").getTime();
let week = d.toLocaleDateString(locale, { weekday: "long" });
const calender = d.toLocaleDateString("id", {
day: "numeric",
month: "long",
year: "numeric",
});

function clockString(ms) {
  let months = isNaN(ms) ? "--" : Math.floor(ms / (86400000 * 30.44));
  let d = isNaN(ms) ? "--" : Math.floor(ms / 86400000);
  let h = isNaN(ms) ? "--" : Math.floor(ms / 3600000) % 24;
  let m = isNaN(ms) ? "--" : Math.floor(ms / 60000) % 60;
  let s = isNaN(ms) ? "--" : Math.floor(ms / 1000) % 60;

 
  
  let monthsDisplay = months > 0 ? months + " bulan, " : "";
  let dDisplay = d > 0 ? d + " hari, " : "";
  let hDisplay = h > 0 ? h + " jam, " : "";
  let mDisplay = m > 0 ? m + " menit, " : "";
  let sDisplay = s > 0 ? s + " detik" : "";


 

  // Gabungkan semua waktu yang ditampilkan
 // let time = monthsDisplay + dDisplay + hDisplay + mDisplay + sDisplay;
  let time = months > 0 ? monthsDisplay + dDisplay : d > 0 ? dDisplay + hDisplay : h > 0 ? hDisplay + mDisplay  : mDisplay + sDisplay

  return time;
}




function tmp(file) {
return file + ".tmp";
}


const sleep = async (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function randomNames(){
  const indonesianNames = [
      "Agus", "Budi", "Dewi", "Eka", "Fitri", "Gita", "Hadi", "Indra", "Joko", "Kartika",
      "Lina", "Mega", "Nur", "Putra", "Rini", "Sari", "Tono", "Wahyu", "Yanti", "Zain",
      "Adi", "Bayu", "Cahya", "Dian", "Edi", "Fandi", "Ganda", "Hendra", "Ika", "Jati",
      "Kurnia", "Lusi", "Murni", "Nana", "Oky", "Prita", "Rina", "Santo", "Tika", "Umar",
      "Vera", "Wulan", "Yani", "Zul", "Abdi", "Bagus", "Cindy", "Dinda", "Eko", "Fajar",
      "Gita", "Hesti", "Iwan", "Jaya", "Krisna", "Laras", "Mira", "Nindy", "Olla", "Panda",
      "Rudy", "Sinta", "Tina", "Utami", "Vina", "Windi", "Yoga", "Zaki", "Agung", "Bambang",
      "Citra", "Dhika", "Endah", "Fina", "Galih", "Hesty", "Indah", "Jajang", "Kiki", "Laila",
      "Mita", "Nia", "Omar", "Purna", "Rahayu", "Sakti", "Tari", "Usman", "Vino", "Wulan"
  ];
      const randomName = indonesianNames[Math.floor(Math.random() * indonesianNames.length)];
 return randomName      
}



      function transformText(text) {
        const charMap = {
          'A': 'ᴀ', 'B': 'ʙ', 'C': 'ᴄ', 'D': 'ᴅ', 'E': 'ᴇ', 'F': 'ғ', 'G': 'ɢ', 'H': 'ʜ', 'I': 'ɪ',
          'J': 'ᴊ', 'K': 'ᴋ', 'L': 'ʟ', 'M': 'ᴍ', 'N': 'ɴ', 'O': 'ᴏ', 'P': 'ᴘ', 'Q': 'ǫ', 'R': 'ʀ',
          'S': 's', 'T': 'ᴛ', 'U': 'ᴜ', 'V': 'ᴠ', 'W': 'ᴡ', 'X': 'x', 'Y': 'ʏ', 'Z': 'ᴢ',
          '0': '𝟶', '1': '𝟷', '2': '𝟸', '3': '𝟹', '4': '𝟺', '5': '𝟻', '6': '𝟼', '7': '𝟽', '8': '𝟾', '9': '𝟿'
        };
      
        return text.toUpperCase().split('').map(char => {
          return charMap[char] || char;
        }).join('');
      }


global.transformText = transformText
global.randomName = randomNames
global.sleep = sleep;
global.tmp = tmp;
global.clockString = clockString;
global.week = week;
global.calender = calender;
global.Log = Log;
global.log = Log;
global.toFirstCase = toFirstCase;
return conn;
};

connectToWhatsApp();


