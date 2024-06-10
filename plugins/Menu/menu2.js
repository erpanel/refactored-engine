import moment from "moment-timezone";
import fs from 'fs-extra'

let handler = async (m, { conn,isOwner}) => {
const timeWib = moment().tz("Asia/Jakarta").format("HH:mm:ss");
moment.tz.setDefault("Asia/Jakarta").locale("id");
//Total fitur by Official Dittaz
const totalFitur = () => {
var mytext = fs.readFileSync("./message/case.js").toString();
var numUpper = (mytext.match(/case '/g) || []).length;
return numUpper;
};

const more = String.fromCharCode(8206);
const readmore = more.repeat(4001);

let dt = moment(Date.now()).tz("Asia/Jakarta").locale("id").format("a");
const ucapanWaktu = "Selamat " + dt.charAt(0).toUpperCase() + dt.slice(1);

let dot = new Date(new Date() + 3600000);
const dateIslamic = Intl.DateTimeFormat("id" + "-TN-u-ca-islamic", {
day: "numeric",
month: "long",
year: "numeric",
}).format(dot);

let yes = "*「 _Error_ 」* ❌";
let no = "";

const feat = (q) => {
let status = false;
Object.keys(db.data.listerror).forEach((i) => {
if (db.data.listerror[i].cmd === q) {
status = true;
}
});
return status;
};

const app = `│  ◦`;
const apz = `▧──···`;
const Last = `└──···☉`;

let publik = true;

const data = global.db.data.others["newinfo"];
const info = data ? data.info : "";
const block = await conn.fetchBlocklist();
const timeInfo = data
? clockString(new Date() - data.lastinfo)
: "tidak ada";

const menu = `
┌  • *ɪ ɴ ғ ᴏ - ʙ ᴏ ᴛ ᴢ*
│  ◦︎ ʀᴜɴɪɴɢ ᴏɴ :  ${runWith}
│  ◦︎ ᴍᴏᴅᴇ : ${publik ? "Public" : "Self"}
│  ◦︎ ʜɪᴛ ᴛᴏᴅᴀʏ : ${
thisHit == undefined
? "0"
: thisHit.toLocaleString() == undefined
? "0"
: thisHit.toLocaleString()
}
│  ◦︎ ᴛᴏᴛᴀʟ ғᴇᴀᴛᴜʀᴇ : ${totalFitur()}
│  ◦ ᴛᴏᴛᴀʟ ᴇʀʀᴏʀ: ${db.data.listerror.length}
│  ◦ ᴛᴏᴛᴀʟ ᴜsᴇʀ : ${Object.keys(db.data.users).length}
│  ◦ ᴜsᴇʀ ʙᴀɴɴᴇᴅ : ${db.data.banned.length}
│  ◦ ᴜsᴇʀ ʙʟᴏᴄᴋᴇᴅ : ${block.length}
│  ◦ ᴜsᴇʀ ᴘʀᴇᴍɪᴜᴍ : ${
Object.values(db.data.users).filter((u) => u.premiumTime !== 0).length
}
│  ◦︎ ᴄᴍᴅ ʙʟᴏᴄᴋᴇᴅ : ${db.data.blockcmd.length}
└──···
┌  • *ɪ ɴ ғ ᴏ - ᴛ ɪ ᴍ ᴇ*
│  ◦ ${week}, ${calender}
│  ◦ ${timeWib} WIB
│  ◦ ${dateIslamic}
└──···
┌  • *ɪ ɴ ғ ᴏ - ᴜ ᴘ ᴅ ᴀ ᴛ ᴇ*
│  ◦  ${info}
│  ◦  di update ${timeInfo} yang lalu
└──···
]––––––『 *ᴄᴏᴍᴍᴀɴᴅs* 』––––––[
▾
`

const fitur =
`
${apz}「 _*Download*_ 」
${app} ig  ${feat("ig") ? yes : no}
${app} play  ${feat("play") ? yes : no}
${app} tiktok ${feat("tiktok") ? yes : no}
${app} ytmp4 ${feat("ytmp4") ? yes : no}
${app} ytmp3 ${feat("ytmp3") ? yes : no}
${app} sfile ${feat("sfile") ? yes : no}
${app} mediafire 👑 ${feat("mediafire") ? yes : no}
${app} githubdl ${feat("githubdl") ? yes : no}
${app} gitclone  ${feat("gitclone") ? yes : no}
${app} mega  ${feat("mega") ? yes : no}
${app} terabox
${app} kraken 👑
${app} fb
${app} apk
${app} ytdl
${app} twitter
${Last}
${apz}「 _*Searching*_ 」
${app} whatmusic 👑 ${feat("whatmusic") ? yes : no}
${app} whatanime 👑 ${feat("whatanime") ? yes : no}
${app} pinterest
${app} quotes ${feat("quotes") ? yes : no}
${app} infogempa
${app} jarak
${app} lirik
${app} npm
${app} techbigs
${app} freepik
${app} pixiv
${Last}
${apz}「 _*Group*_ 」
${app} kick ${feat("kick") ? yes : no}
${app} add ${feat("add") ? yes : no}
${app} antilinkgc ${feat("antilinkgc") ? yes : no}
${app} antidelete ${feat("antidelete") ? yes : no}
${app} antiasing ${feat("antidelete") ? yes : no}
${app} promote ${feat("promote") ? yes : no}
${app} demote ${feat("demote") ? yes : no}
${app} closetime ${feat("closetime") ? yes : no}
${app} opentime ${feat("opentime") ? yes : no}
${app} revoke ${feat("revoke") ? yes : no}
${app} hidetag ${feat("hidetag") ? yes : no}
${app} setppgc ${feat("setppgc") ? yes : no}
${app} infogc ${feat("infogx") ? yes : no}
${app} setnamegc ${feat("setnamegc") ? yes : no}
${app} setdesc ${feat("setdesc") ? yes : no}
${app} gc ${feat("gc") ? yes : no}
${app} listonline ${feat("lostoneline") ? yes : no}
${app} linkgc ${feat("linkgc") ? yes : no}
${app} kickme ${feat("kickme") ? yes : no}
${app} banchat ${feat("banchat") ? yes : no}
${app} unbanchat ${feat("unbanchat") ? yes : no}
${app} ban ${feat("ban") ? yes : no}
${app} unban ${feat("unban") ? yes : no}
${app} listban ${feat("listban") ? yes : no}
${app} addkick ${feat("addkick") ? yes : no}
${app} delkick ${feat("delkick") ? yes : no}
${app} afk ${feat("afk") ? yes : no}
${app} ceksewa ${feat("ceksewa") ? yes : no}
${app} getpp  ${feat("getpp") ? yes : no}
${app} cekprem
${app} ceklimit
${app} claim
${app} shop
${app} buy
${app} sider
${app} setopen
${app} setclose
${app} listtime
${app} deltime
${app} sewa
${app} addlist
${app} dellist
${app} list
${app} rpg
${app} setwelcome
${app} setbye
${Last}
${apz}「 _*Auto Update*_ 」
${app} updategempa
${app} updatewbi
${Last}
${apz}「 _*AI Chat Bot*_ 」
${app} ai 👑
${app} bard 👑
${app}
${app}
${Last}
${apz}「 _*AI Design*_ 」
${app}
${app}
${app}
${app}
${Last}
${apz}「 _*Uploader*_ 」
${app} fileio
${app} fileugu
${app} fileditch
${app} telegraph
${app} pomf2
${Last}
${apz}「 _*Anonymous*_ 」
${app} anonymous
${app} start
${app} startchat
${app} keluar
${app} next
${app} sendkontak
${app} invite
${app} joinchat
${app} menfess
${Last}
${apz}「 _*Tools*_ 」
${app} resize
${app} cut30
${app} inspect
${app} wm 👑 ${feat("take") ? yes : no}
${app} tr  ${feat("tr") ? yes : no}
${app} ss 👑 ${feat("ss") ? yes : no}
${app} runtime  ${feat("runtime") ? yes : no}
${app} speed  ${feat("speed") ? yes : no}
${app} rules ${feat("rules") ? yes : no}
${app} speedtest ${feat("speedtest") ? yes : no}
${app} volume ${feat("volume") ? yes : no}
${app} transfer ${feat("transfer") ? yes : no}
${app} givesaldo  ${feat("givesaldo") ? yes : no}
${app} chatowner ${feat("chatowner") ? yes : no}
${app} readmore  ${feat("readmore") ? yes : no}
${app} tts  ${feat("tts") ? yes : no}
${app} hdr  ${feat("hdr") ? yes : no}
${Last}
${apz}「 _*Converter*_ 」
${app} toimg ${feat("toimg") ? yes : no}
${app} tomp3 ${feat("tomp3") ? yes : no}
${app} tomp4 ${feat("tomp4") ? yes : no}
${app} toptt ${feat("toptt") ? yes : no}
${app} togif ${feat("togif") ? yes : no}
${app} hode ${feat("hode") ? yes : no}
${app} ghost ${feat("ghost") ? yes : no}
${app} nightcore ${feat("nightcore") ? yes : no}
${app} tupai ${feat("tupai") ? yes : no}
${app} imut ${feat("imut") ? yes : no}
${app} emojimix ${feat("emojimix") ? yes : no}
${app} toanime 👑
${app}
${app}
${Last}
${apz}「 _*Sticker*_ 」
${app} smeme ${feat("smeme") ? yes : no}
${app} sticker ${feat("s") ? yes : no}
${app} attp
${app} ttp
${Last}
${apz}「 _*Game*_ 」
${app}
${app}
${app} family100
${app} tebakkata
${app} tebaklagu
${app} werewolf
${app} tebakbom
${app} war
${app} siapakahaku
${app} sambungkata
${app}
${app}
${Last}
${apz}「 _*RPG Game*_ 」
${app} adventure
${app} mining
${app} dungeon
${app} mancing
${app} merampok
${app} kerja
${app} mulung
${app} nebang
${app} membunuh
${app} merampok
${app} maling
${app} latih
${app} kolam
${app} koboy
${app} karung
${app} kandang
${app} hunt
${app} bonus
${app} casino
${app} berdagang
${app} berkebon
${app} cook
${app} taxy
${app} sumbangan
${app} smith
${app} smelt
${app} slectskill
${app} nyampah
${app} rob
${app} order
${app} repair
${app} redeem
${app} polisi
${app} gacha
${app} nguli
${app} misi
${app} minum
${app} merchant
${app} kolam
${app} go
${app} berkebun
${app}
${app}
${app}
${app} bank
${app} inventory
${app} craft
${app} heal
${app} upgrade
${app} buy
${app} sell
${app} jual
${app} transfer
${app} petstore
${app} daily
${app} weekly
${app} monthly
${app}
${app}
${app}
${app}
${app}
${app}
${Last}
${apz}「 _*Random*_ 」
${app} cecan ${feat("cecan") ? yes : no}
${app} cogan ${feat("cogan") ? yes : no}
${app} anime ${feat("anime") ? yes : no}
${app} loli ${feat("loli") ? yes : no}
${app} milf ${feat("milf") ? yes : no}
${app} husbu ${feat("hubu") ? yes : no}
${app} cosplay ${feat("cosplay") ? yes : no}
${app} wallml ${feat("wallml") ? yes : no}
${app} patrick ${feat("patrick") ? yes : no}
${app} gura ${feat("gura") ? yes : no}
${app} doge ${feat("doge") ? yes : no}
${app} waifu
${app} darkjoke
${app} meme
${app}
${app}
${app}
${Last}
${apz}「 _*Storage*_ 」
${app} addvn
${app} addstik
${app} delvn
${app} delstik
${app} liststik
${app} listvn
${app} getallstik
${app} clearallerror
${app}
${app}
${app}
${Last}
${apz}「 _*Database*_ 」
${app} addcmdowner
${app} addcmdlimit
${app} addcmdprem
${app} addowner
${app} addprem
${app} addsewa
${app} blockcmd
${app} unblockcmd
${app} delowner
${app} delprem
${app} delcmdowner
${app} delcmdlimit
${app} delcmdprem
${app} listcmdowner
${app} listblockcmd
${app} listprem
${app} listsewa
${app} listowner
${app} listcmdlimit
${app} listerror
${app}
${app}
${Last}
${apz}「 _*Settings Bot*_ 」
${app} setnamebot
${app} setppbot
${app} setbio
${app}
${app}
${app}
${app}
${app}
${Last}
${apz}「 _*Owner Tools*_ 」
${app} getcase ${feat("getcase") ? yes : no}
${app} getfile
${app} getfolder
${app} save
${app}
${app} addcase ${feat("addcase") ? yes : no}
${app} addplugin
${app}
${app} delcase
${app} delplugin
${app}
${Last}
${apz}「 _*Owner*_ 」
${app}
${app} public
${app} self
${app} > evalcode
${app} $ executor
${app} join ${feat("join") ? yes : no}
${app} bcgc ${feat("bcgc") ? yes : no}
${app} block ${feat("block") ? yes : no}
${app} unblock ${feat("unblock") ? yes : no}
${app}
${app}
${app}
${app} restart
${app} delsampah
${app} delchat
${app} listblock
${app} newupdate
${app} sendbug
${app}
${app} buggc
${app} shutdown
${app} out
${app} listpc ${feat("listpc") ? yes : no}
${app} listgc ${feat("listgc") ? yes : no}
${app} clearalluser
${app} moveongc ${feat("moveongc") ? yes : no}
${app}
${app}
${app} backup
${app} bardimg
${app} autodeltmp
${app} listsw
${app}
${app} cutmp3
${app} top4top
${app}
${app}
${Last}


${apz}「 _*Thanks To*_ 」
• Baileys
• Irfan Hariyanto
• Dittaz
• Nina Kawai
• Zeeone Ofc
• Yudha Perdana
• Yogi PW
• Decode Denpa
• Fernazer
• X - Dev Team
• XChillDs & Yuzu
• Dika Ardnt


` + "𝘗𝘰𝘸𝘦𝘳𝘦𝘥 𝘉𝘺 𝘕𝘰𝘥𝘦𝘫𝘴";


let links = [
"https://telegra.ph/file/eff394b2e2807ef916d1b.jpg",
];

const contextInfo = {
forwardingScore: 50,
isForwarded: true,
mentionedJid: [m.sender],
forwardedNewsletterMessageInfo: {
newsletterJid: "120363185991076586@newsletter",
serverMessageId: 100,
newsletterName: "MEDUSA",
},
businessMessageForwardInfo: {
businessOwnerJid: m.botNumber,
},
externalAdReply: {
title: copyright,
body: baileysVersion,
mediaType: 1,
renderLargerThumbnail: true,
thumbnailUrl: links.getRandom(),
sourceUrl: "https://wa.me/6282353035070",
mediaUrl: "https://wa.me/6282353035070",
},
};

conn.sendMessage(
m.chat,
{ contextInfo, mentions: [m.sender], text: menu + readmore + fitur },
{ quoted: m }
);
};
handler.help = ["menu"]
handler.tags = ["menu"];
handler.command = ['menu2','allmenu']
export default handler;


