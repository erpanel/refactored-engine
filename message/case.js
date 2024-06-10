"use strict";
import toMs from 'ms'
import chalk from 'chalk'
import fs from 'fs-extra'
import moment from "moment-timezone"
import util from "util"
import { exec, spawn } from "child_process"
import axios from "axios"
import speed from "performance-now"
import ms from "parse-ms"
import fetch from 'node-fetch'
import cheerio from  'cheerio'
import { join, dirname } from 'path'
import path  from 'path'
import * as logs from './logs.js'
import { fileURLToPath, URL } from 'url'
const __dirname = dirname(fileURLToPath(import.meta.url))



//----------------- LIB FILE ------------------\\
import {hitungUmur, getRandomFile,generateProfilePicture, getCase,addCase,delCase,runtime,FileSize,h2k, makeid,kyun,randomNomor,jsonformat, isUrl, fetchJson,pickRandom,getBuffer} from "../lib/myfunc.js"
import _data from "../lib/totalcmd.js"
import _error from "../lib/totalerror.js"
import _blockcmd from "../lib/blockcmd.js"
import _spam from '../lib/antispam.js'
import _ban from "../lib/banned.js"
import _time from "../lib/grouptime.js"


//=================================================//
export async function handler(conn, m, chatUpdate, store){
var multi = db.data.settings['settingbot'].multi
var prefa = db.data.settings['settingbot'].prefix
var autoReport = db.data.settings['settingbot'].autoReport
var publik = db.data.settings['settingbot'].publik
var autoSticker = db.data.settings['settingbot'].autoSticker
var autoLevel = db.data.settings['settingbot'].autoLevel
var replyType = db.data.settings['settingbot'].replyType


//log(m)

try {

//Database
const AntiSpam = db.data.antispam
const DataId = db.data.data
const ban = db.data.banned
const listcmdblock = db.data.blockcmd
const listerror = db.data.listerror
const hitnya = db.data.hittoday
const dash = db.data.dashboard
const anonChat = db.data.anonymous
const allcommand = db.data.allcommand
const setTime = db.data.others['setTime']
const spammer = []
 

var Ownerin = `${nomerOwner}@s.whatsapp.net`
var ownerNumber = [`${nomerOwner}@s.whatsapp.net` ,`${nomerOwner2}@s.whatsapp.net`,`0@s.whatsapp.net`,`${conn.user.jid}`]
const Tnow = (new Date()/1000).toFixed(0)
const seli = Tnow - m.messageTimestamp.low
if (seli > Intervalmsg) return console.log((`Pesan ${Intervalmsg} detik yang lalu diabaikan agar tidak nyepam`))

const { type,args, reply,sender,ucapanWaktu,from,botNumber,senderNumber,groupName,groupId,groupMembers,groupDesc,groupOwner,pushname,itsMe,isGroup,mentionByTag,mentionByReply,users,budy,content,body } = m
const prem = db.data.users[sender].premiumTime !== 0 


if (multi){
var prefix = /^[°zZ#,.''()√%!¢£¥€π¤ΠΦ&<`™©®Δ^βα¦|/\\©^]/.test(body) ? body.match(/^[°zZ#,.''()√%¢£¥€π¤ΠΦ&<!`™©®Δ^βα¦|/\\©^]/gi) : '.'
var thePrefix = "Multi Prefix"
} else {
var prefix = prefa
var thePrefix = "One Prefix"
}
const isCmd = body.startsWith(prefix)
const isCommand = isCmd? body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase() :""
const q = args.join(' ')
const timeWib = moment().tz('Asia/Jakarta').format('HH:mm:ss')
const time = moment().tz('Asia/Jakarta').format('HH:mm')
const isOwner = ownerNumber.includes(sender) || _data.checkDataId ("owner", sender, DataId)
const command = (prem || isOwner)? body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase() : isCommand
const theOwner = sender == Ownerin
const timestampp = speed();
const latensi = speed() - timestampp
const quoted = m.quoted ? m.quoted : m.msg === undefined? m: m.msg
const mime = (quoted.msg || quoted).mimetype || ''
const more = String.fromCharCode(8206)
const readmore = more.repeat(4001)
const numberQuery = q.replace(new RegExp("[()+-/ +/]", "gi"), "") + `@s.whatsapp.net`
const Input = mentionByTag[0]? mentionByTag[0] : mentionByReply ? mentionByReply : q? numberQuery : false
const replyCommand = isCmd? isCmd : allcommand.includes(toFirstCase(command))
const user = global.db.data.users[m.sender]
const chat = global.db.data.chats[m.chat]
const settings = global.db.data.settings['settingbot']
const botRun = global.db.data.others['runtime']
const botTime = botRun? (new Date - botRun.runtime) :  "Tidak terdeteksi"
const runTime = clockString(botTime)
global.runTime = runTime
//if(isOwner && body.startsWith('.')) {return}
//Log(m.msg)


//Import message.js
await (await import('./message.js')).default(prefix,setReply, m, conn)
//Import allfake.js
await (await import('./allfake.js')).default(m)


//Type data
const isImage = (type === 'imageMessage')
const isVideo = (type === 'videoMessage')
const isSticker = (type == 'stickerMessage')
const isAudio = (type == 'audioMessage')
const isText = (type == 'conversation')
const isReaction = (type == 'reactionMessage')
const isMedia = (type === 'imageMessage' || type === 'videoMessage')
const isViewOnce = (type == 'viewOnceMessage')
const isAllMedia = (type === 'imageMessage' || type === 'videoMessage' || type === 'stickerMessage' || type === 'audioMessage' || type === 'contactMessage' || type === 'locationMessage')
const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
const isQuotedTeks = type === 'extendedTextMessage' && content.includes('quotedMessage')
const isQuotedTag = type === 'extendedTextMessage' && content.includes('mentionedJid')
const isQuotedReply = type === 'extendedTextMessage' && content.includes('Message')
const isQuotedText = type === 'extendedTextMessage' && content.includes('conversation')
const isQuotedViewOnce = type === 'extendedTextMessage' && content.includes('viewOnceMessage')

//Security / Keamanan
const isBotGroupAdmins = isGroup ? m.isBotAdmin : false
const isGroupOwner = isGroup ? m.isRAdmin : false
const isGroupAdmins = isGroup ? m.isAdmin : false
const isAntiLink = isGroup ? db.data.chats[from].antilink : false
const isAntidelete = isGroup ? db.data.chats[from].antidelete : false
const isKickarea = isGroup ? db.data.chats[from].antiasing : false
const isBanchat = isGroup ? db.data.chats[from].banchat : false
const isAntiVirtex = isGroup ? db.data.chats[from].antivirtex : false
const isAntihidetag = isGroup ? db.data.chats[from].antihidetag : false
const isAntiViewOnce = isGroup ? db.data.chats[from].viewonce : false
const isBanned = sender? _ban.check(senderNumber, ban) : false
const isPremium = isOwner ? true :  db.data.users[sender].premiumTime !== 0 
const gcount = isPremium ? gcounti.prem : gcounti.user
const updateGempa = isGroup ? db.data.chats[from].updateGempa : false
const updateWBI = isGroup ? db.data.chats[from].updateWBI : false

//User
const userLevel = user? db.data.users[m.sender].level : false
const userExp = user? db.data.users[m.sender].exp : false
const userId = user? db.data.users[m.sender].id : false
const amountExp = Math.floor(Math.random() * 10) + 50
const requiredExp = userLevel == 0? 500 : 1000 * userLevel
const userPersen = userExp/requiredExp*100
const userVerified = user? db.data.users[m.sender].date : false


if((time > "00:00" && time < "05:00") && !isGroup & !isPremium) {return}
/*
if(!isGroup && !isPremium && isCmd) {

  return
}
*/
//AUTO Read Message 
conn.readMessages([m.key])

//Presence Online
if (isCmd){
db.data.users[m.sender].exp += amountExp
conn.sendPresenceUpdate('composing', from)
} else {
conn.sendPresenceUpdate('available', from)
}



//Public & Self And Banchat
if (!publik && !itsMe && !isOwner && !theOwner) {return}
if (isGroup && !isPremium && !isGroupAdmins && isBanchat && !itsMe && !isOwner) {return}

//Console log
if(!isCmd && !isAllMedia && !isReaction && budy.length < 8000 && type !== 'protocolMessage') logs.message(conn,m,budy,AntiSpam)
if(isCmd || isPremium && allcommand.includes(toFirstCase(command))) logs.commands(m,command,q,isCmd)







//SetReply
async function setReply(teks,member = []){
let photo = pickRandom(fotoRandom)
let contextInfo = {
forwardingScore: 50,
isForwarded: true,
  mentionedJid:member,
forwardedNewsletterMessageInfo: {
newsletterJid: "120363185991076586@newsletter",
serverMessageId: 100,
newsletterName: "MEDUSA"
},
externalAdReply:{
showAdAttribution: false,
title: `${transformText(baileysVersion)}`,
body:`Runtime ${transformText(runTime)} `,
sourceUrl:"https://wa.me/6282353035070",
mediaType: 1,
renderLargerThumbnail : false,
thumbnailUrl: photo,  
}
}







if(replyType === "web"){
conn.sendMessage(from, { contextInfo,mentions: member, text:` ${member.length > 0 ? teks: transformText(teks)}` }, { quoted: m })
} else if(replyType === "mess"){
conn.sendMessage(from, {text: teks}, { quoted: m });
} else {
conn.sendMessage(from, {text: "Error SetReply Tidak Di Temukan"})
}
}




const math = (teks) => {
return Math.floor(teks)
}











//ANTI LINK
if (isGroup && isAntiLink){
if (budy.includes(`https:`)) {
if (isGroupAdmins) return setReply('Alah sia admin grup mah bebas yekan :v')
if(ownerNumber.includes(sender)) return setReply('Alah sia owner bot mah bebas yekan :v')
//let linkgc = await conn.groupInviteCode(from)
//if (budy.includes(`${linkgc}`)) return reply ('Wuanjir kirain link grup lain, huh hampir aja kena kick 😆')
if (budy.includes('zin admin') || budy.includes('zinmin') )return setReply('Izin Admin diterima')
setReply(` *「 LINK DETECTED 」*\nKamu mengirimkan link, maaf kamu di kick dari grup :(`)
setTimeout(() => {
if(isBotGroupAdmins) conn.sendMessage(from, { delete: m.key })
conn.groupParticipantsUpdate(from, [sender], 'remove').catch((e) => { setReply(`BOT HARUS JADI ADMIN`) })
}, 2000)
}
}

//ANTI ASING
if (isGroup && isBotGroupAdmins &&isKickarea && !itsMe) {
let member = await groupMembers.map(u => u.id)
for ( let i = 0; i <member.length; i++){
if (member[i].slice(0,2) !== "62" ){
let usersId = await groupMembers.find(u => u.id == member[i])
if (!usersId.groupAdmins ){
await conn.groupParticipantsUpdate(from, [member[i]], 'remove')
await sleep(1000)
}
}
}
}

//ANTI VIRUS
if (isGroup && isAntiVirtex && budy.length > 20000) {
if (isGroupAdmins) return setReply('*VIRTEX DETECTED*')
const antivirus  = require('./antivirus.js')
console.log(color('[KICK]', 'red'), color('Received a virus text!', 'yellow'))
await conn.sendMessage(from, {text:antivirus(pushname,groupName)})
if (!isBotGroupAdmins) {return }
if(isOwner) {return}
await conn.groupParticipantsUpdate(from, [sender], 'remove')
await conn.sendMessage(`${nomerOwner}@s.whatsapp.net`,{text: `Hai Owner! wa.me/${sender.split("@")[0]} Terdeteksi Telah Mengirim Virtex ${isGroup?`di Group ${groupName}`:''}`})
}


//ANTI DELETE
if(type == 'protocolMessage' && isAntidelete){
let mess = chatUpdate.messages[0].message.protocolMessage
let chats = Object.entries(await conn.chats).find(([user, data]) => data.messages && data.messages[mess.key.id])
if(chats[1] == undefined) return
if(chats[1] !== undefined){
let msg = JSON.parse(JSON.stringify(chats[1].messages[mess.key.id]))
await conn.copyNForward(mess.key.remoteJid, msg).catch(e => console.log(e, msg))
}
}





//===================================================================//




const addSpammer = function(jid, _db){
let position = false
Object.keys(_db).forEach((i) => {
if (_db[i].id === jid) {
position = i
}
})
if (position !== false) {
_db[position].spam += 1
} else {
let bulin = ({ id: jid, spam: 1 })
_db.push(bulin)
}
}

const FinisHim = async function(jid, _db){
let position = false
Object.keys(_db).forEach((i) => {
if (_db[i].id === jid) {
position = i
}
})
if (position !== false) {
if(_db[position].spam > 7){
if(db.data.users[sender].banned.status || !isOwner){return}
let obj = {
id: senderNumber,
status: true,
date: calender,
reason: "Spam Bot"
}
//db.data.users[woke].banned = obj
//console.log(`${jid} Terdeteksi spam lebih dari ${_db[position].spam} kali`)
//setReply("Kamu telah di banned karena telah melakukan spam")
}
} else {
console.log(`Spam ke ${_db[position].spam}`)
}
}


//ANTI SPAM BERAKHIR
if(_spam.Expired(senderNumber, "Case", AntiSpam)){
let position = false
for(let i of spammer){
if(i.id == senderNumber){
position = i
}
}

if (position !== false) {
spammer.splice(position, 1)
console.log(chalk.bgGreen(color("[  Remove ]", "black")),"Sukses remove spammer")
}
}


//Anti sticker gay
let antiSticker = db.data.others["antiSticker"]
if(!antiSticker) db.data.others["antiSticker"]  = []
let iniSticker = (type == 'stickerMessage') ? m.message.stickerMessage.fileSha256.toString('base64') : ""
if(isGroup && isBotGroupAdmins  && antiSticker.includes(iniSticker)) conn.sendMessage(from, { delete: m.key})


_spam.Expired(senderNumber, "NotCase", AntiSpam)
if(isBanned && !isOwner){return} //user terbanned
if(isCmd && _spam.check("Case",senderNumber, AntiSpam)){
addSpammer(senderNumber, spammer)
FinisHim(senderNumber, spammer)
return console.log(chalk.bgYellowBright(chalk.black("[  SPAM  ]")),"antispam Case aktif")
}

//ANTI SPAM PRIVATE CHAT
if(antiSpam && isCmd && _spam.isFiltered(from) && !isGroup && !itsMe && !isOwner){
_spam.add("Case",senderNumber, "15 s", AntiSpam)
addSpammer(senderNumber, spammer)
return setReply("Beri bot waktu jeda 5 detik")
}

//ANTI SPAM GROUP CHAT
if (antiSpam && isCmd && _spam.isFiltered(from) && isGroup && !itsMe && !isOwner) {
_spam.add("Case",senderNumber, "15s", AntiSpam)
addSpammer(senderNumber, spammer)
return setReply("Beri bot waktu jeda 5 detik")
}
if (isCmd && !isOwner) _spam.addFilter(from)



//--------System Expired-------\\
_time.running(setTime)








//AUTO DEL VIRTEX
if(m.virtex) {
if(isGroup && isBotGroupAdmins) conn.sendMessage(from, { delete: m.key})
if(!isGroup) conn.chatModify({ clear: { messages: [{ id: m.id, fromMe: sender == botNumber? true : false, timestamp: m.messageTimestamp }] } }, sender, [])
console.log(chalk.bgRedBright(chalk.black("[ VIRTEXT ]")),`Length: ${budy.length} from ${senderNumber} ${isGroup? `Group ${groupName}`: ""}`)
}


//AUTO BLOCK NOMER ASING +212
let nomerAsing = senderNumber.startsWith('212')
if (nomerAsing) {
console.log(`Nomer asing dari ${senderNumber}`)
await m.reply("you are not allowed to using this bot")
//if(!isGroup) await conn.sendMessage(from, {text: "stupid"},{quoted: lep})
let Name = await conn.getName(sender)
let alasan = 'Nomer asing' 

_ban.add(Name,calender,senderNumber,alasan, ban)
return conn.updateBlockStatus(sender, "block")
}

//Bot tidak bisa di akses di pc kecuali premium
let lowFitur = db.data.lowfeature
if(!isGroup && !isPremium && isCmd && !lowFitur.includes(command)) {
if (_spam.check("NotCase",senderNumber, AntiSpam)) return
_spam.add("NotCase",senderNumber, "10s", AntiSpam)
let { dada } = (await import("../message/sewabot.js"))
let asu = dada(prefix, pushname, ucapanWaktu)

let teks = `Maaf kamu bukan user premium
silahkan upgrade ke premium agar bisa menggunakan
bot secara private chat atau bisa sewa bot untuk group

${asu}`

await conn.sendMessage(from,{text:teks},{quoted:m}) 
   return
//await sleep(2000)
//return conn.chatModify({delete: true,lastMessages: [{ key: m.key, messageTimestamp: m.messageTimestamp }]},from)
}

//Auto level users
if(isCmd && user && userExp >= requiredExp){
const { userXp, userLeveling, } = (await import("../lib/user.js"))
let link = 'https://telegra.ph/file/9528a0b81d1b46bdb5507.jpg'
let level = userLevel+1
let uang = 1000*level

db.data.users[m.sender].exp = userExp - requiredExp
db.data.users[m.sender].level += 1
db.data.users[m.sender].money += 1000*level
db.data.users[m.sender].grade = userLeveling(`${db.data.users[sender].level + 1}`)

let contextInfo = {
externalAdReply : {
showAdAttribution: false,
mediaType: 1,
title: 'Extream',
thumbnailUrl: link,
renderLargerThumbnail: true,
mediaUrl: 'https://chat.whatsapp.com/',
sourceId: copyright,
sourceUrl: 'https://chat.whatsapp.com/'
}
}

let mentions = [sender]
let text =`◪ *Nama:* ${user? user.name : pushname}
├◆ *Pangkat:* ${userLeveling(`${db.data.users[sender].level + 1}`)}
├◆ *Saldo:* + Rp ${uang.toLocaleString()}
╰◆ *Level:*  ${userLevel} ➠ ${userLevel + 1}
`
//conn.sendMessage(from,{contextInfo, text,mentions})
  setReply(text)
}




//ANONYMOUS CHAT
const roomChat = Object.values(anonChat).find(room => [room.a, room.b].includes(m.sender) && room.state == 'CHATTING')
const roomA = Object.values(anonChat).find(room => room.a == m.sender)
const roomB = Object.values(anonChat).find(room => room.b == m.sender )
const room = Object.values(anonChat).find(room => room.state == 'WAITING' && room.b == "")

if (roomChat && !isCmd && !isGroup && roomChat.b !=="") {
//let nono = m.quoted.fakeObj? m.quoted.fakeObj : m
let other = [roomChat.a, roomChat.b].find(user => user !== m.sender)
m.copyNForward(other, true)
}

if (room && Date.now() >= room.expired){
await conn.sendMessage(room.a, {text:"Partner tidak di temukan\nKamu telah keluar dari room anonymous"})
anonChat.splice(anonChat.indexOf(room, 1))
}

//AUTO BLOCK CMD
for (let i = 0; i < listcmdblock.length ; i++) {
if (command === listcmdblock[i].cmd ){
if(autoblockcmd) {
return setReply(mess.block.Bsystem)
} else{
return setReply(mess.block.Bowner)
}
}
}

//FITUR USER PREMIUM
if(!_data.checkDataName("premium", "", DataId)) {
await _data.createDataId("premium", DataId)
}
let userPremium =  DataId.filter(item => item.name == "premium")
for(let i of userPremium[0].id){
if(command == i && !isPremium) return setReply(`Kamu bukan user premium`)
}

//FITUR KHUSUS OWNER
if(!_data.checkDataName("commands", "", DataId)) {
await _data.createDataId("commands", DataId)
}
let ownerCommands =  DataId.filter(item => item.name == "commands" )
for(let i of ownerCommands[0].id){
if(command == i && !isOwner) return setReply(mess.only.ownerB)
}

//FITUR USER LIMIT
if(!_data.checkDataName("limit", "", DataId)) {
await _data.createDataId("limit", DataId)
}
let userLimit =  DataId.filter(item => item.name == "limit" )
for(let i of userLimit[0].id){
if(!isOwner && command == i ){
if(!isPremium && db.data.users[sender].limit < 1) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
if(!isPremium ) {
db.data.users[sender].limit -= 1
conn.sendMessage(from,{text:`Limit kamu tersisa ${user.limit}`}, {quoted: m})
}

}
}



//AUTO REACT
let regex =[ "bilek","banh","cum","kntl","anjing","mmk","bang","wibu","pantek","pepek","hentai"]
for (let i of regex){
if (!_spam.check("NotCase",senderNumber, AntiSpam) && isGroup && budy.toLowerCase().includes(i)){
_spam.add("NotCase",senderNumber, "10s", AntiSpam)
let emot = await pickRandom(["🗿", "👍", "🙄", "😝", "😏", "💩", "👻", "🔥", "🤣","🤬", "😎", "😂", "😘", "😑", "😱", "❤️", "🔥", "😳","😍","🤩","🥳","🤔","🤗","🤤","👎","👊","🙈","🤡"])
conn.sendMessage(from, { react: { text: emot, key: m.key } })
}
}



//Auto Sticker Online
if(db.data.sticker[budy]){
if (_spam.check("NotCase",senderNumber, AntiSpam)) return
_spam.add("NotCase",senderNumber, "5s", AntiSpam)
//conn.sendMessage(from,{sticker:{url:db.data.sticker[budy].link}})
}

//Auto VN Online
if(db.data.audio[budy] || db.data.audio[budy.toLowerCase()]   ) {
if (_spam.check("NotCase",senderNumber, AntiSpam)) return
let nono =  {key: {fromMe: false,participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: sender } : {})},message: { "extendedTextMessage": {"text": `${pushname} \n「 audio 」 ${db.data.audio[budy.toLowerCase()].name}`,"title": `Hmm`,'jpegThumbnail': fs.readFileSync('./media/thumb.jpeg')}}}
const iniQuoted = mentionByReply? m.quoted.fakeObj : nono
conn.sendMessage(from, {audio: {url: db.data.audio[budy.toLowerCase()].link},ptt: true, waveform:  [
0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  9,
35, 51, 67, 73, 73, 25, 18, 58, 75, 72, 26,  0,
27, 56, 58, 43, 12, 23, 35, 49, 62, 67, 63, 18,
2, 16, 39, 45, 43, 31, 21, 36, 57, 71, 70, 67,
23, 49, 36,  6, 17, 39, 50, 52, 45, 27, 26, 50,
51, 49, 49, 49
], mimetype: 'audio/mpeg'}, {quoted: iniQuoted })
_spam.add("NotCase",senderNumber, "5s", AntiSpam)
}










//GAME tebak kata Function
conn.tebakkata = conn.tebakkata ? conn.tebakkata : {}
if(isGroup && from in conn.tebakkata){
const threshold = 0.72
let id = m.chat
let json = JSON.parse(JSON.stringify(conn.tebakkata[id][1]))
if (budy.toLowerCase() == json.jawaban.toLowerCase().trim()) {
global.db.data.users[m.sender].exp += conn.tebakkata[id][2]
let teks = `*GAME TEBAK KATA BERAKHIR*

Selamat jawaban kamu benar
Hadiah : Rp ${conn.tebakkata[id][2]}
Jawaban : ${json.jawaban}

Ingin bermain lagi? kirim ${prefix}tebakkata
atau tekan button di bawah ini`

let but = [{ buttonId: `${prefix}limit`, buttonText: { displayText: "Limit" }, type: 1 },{ buttonId: `${prefix}tebakkata`, buttonText: { displayText: "Mainlagi" }, type: 1 } ]

setReply(teks)
clearTimeout(conn.tebakkata[id][3])
delete conn.tebakkata[id]
} else if(similarity(budy.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold) {
setReply(`*Dikit Lagi!*`)
} else if(json.jawaban.length >= budy.length && !isCmd && !budy.includes("yerah") && !isSticker ) {
setReply(`*Salah!*`)
} else if(!isCmd && budy.includes("yerah")){
let text =`
Yahahaha malah nyerah

jawabanya itu adalah ${json.jawaban}
`
setReply(text)
clearTimeout(conn.tebakkata[id][3])
delete conn.tebakkata[id]
}

}



//NEW ANTI SPAM
conn.spam = conn.spam ? conn.spam : {}
if (chat && chat.antispam) {
if (m.sender in conn.spam) {
conn.spam[m.sender].count++
if (m.messageTimestamp.toNumber() - conn.spam[m.sender].lastspam > 10) {
if (conn.spam[m.sender].count > 10) {
let name = pushname || await conn.getName(sender)
_ban.add(name,calender,senderNumber,"Spam", ban)

let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let caption = `Kamu telah di banned *@${who.split("@")[0]}* karena melakukan spam
silakan hubungi admin untuk membuka banned`
setReply(caption,conn.parseMention(caption))
}
conn.spam[m.sender].count = 0
conn.spam[m.sender].lastspam = m.messageTimestamp.toNumber()
}
} else conn.spam[m.sender] = {
jid: m.sender,
count: 0,
lastspam: 0
}
}













let listRespon = global.db.data.respon[body]
if(listRespon) m.reply(listRespon.respon)


//Respon listStore 
let store = m.isGroup? global.db.data.chats[from].store : false
if(store){
let listStore = global.db.data.chats[from].store[body.toLowerCase()]
if(listStore){
  if (_spam.check("NotCase",m.senderNumber, AntiSpam)) return
  _spam.add("NotCase",m.senderNumber, "10s", AntiSpam)
  m.reply(listStore.text)
}
}

//Auto Hit
_data.expiredCmd(hitnya, dash)
const thisHit = `${_data.getHit("run", hitnya)}`
global.thisHit = thisHit
const myUser = Object.keys(db.data.users)
if(isCmd){
db.data.users[sender].hit += 1
_data.cmdAdd("run", "1d", hitnya)
_data.Succes(toFirstCase(command), dash, allcommand)
}


try{
switch(command){










































//------------------------ BATAS DARI AREA CASE -----------------------------\\
default:

//--------PLUGINS-------\\
let usedPrefix
let _user = global.db.data && global.db.data.users && global.db.data.users[m.sender]
const ___dirname = path.join(__dirname, '../plugins')
for (let name in global.plugins) {
let plugin = global.plugins[name]
if (!plugin)
continue
if (plugin.disabled)
continue
const __filename = join(___dirname, name)
if (typeof plugin.all === 'function') {
try {
await plugin.all.call(conn, m, {
chatUpdate,
__dirname: ___dirname,
__filename
})
} catch (e) {
console.error(e)
}
}


const str2Regex = str => str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
let _prefix = plugin.customPrefix ? plugin.customPrefix: prefix
let match = (_prefix instanceof RegExp ? // RegExp Mode?
[[_prefix.exec(m.text), _prefix]]:
Array.isArray(_prefix) ? // Array?
_prefix.map(p => {
let re = p instanceof RegExp ? // RegExp in Array?
p:
new RegExp(str2Regex(p))
return [re.exec(m.text), re]
}):
typeof _prefix === 'string' ? // String?
[[new RegExp(str2Regex(_prefix)).exec(m.text), new RegExp(str2Regex(_prefix))]]:
[[[], new RegExp]]
).find(p => p[1])


if (typeof plugin.before === 'function') {
if (await plugin.before.call(conn, m, {
q,
match,
conn,
participants: m.groupMembers,
groupMetadata: m.groupMetadata,
user: m.user,
bot: m.bot,
isROwner: isOwner,
isOwner,
isRAdmin: m.isRAdmin ,
isAdmin: m.isAdmin,
isBotAdmin: m.isBotAdmin,
isPremium,
isprems: isPremium,
chatUpdate,
__dirname: ___dirname,
__filename
}))
continue
}

if (typeof plugin !== 'function')
continue

let fail = plugin.fail || global.dfail 
usedPrefix = (match[0] || '')[0]||prefix



if (command || usedPrefix ) {

let noPrefix = m.text.replace(usedPrefix, '')
let _args = noPrefix.trim().split` `.slice(1)
let text = q 
var isAccept = plugin.command instanceof RegExp ? // RegExp Mode?
plugin.command.test(command):
Array.isArray(plugin.command) ? // Array?
plugin.command.some(cmd => cmd instanceof RegExp ? // RegExp in Array?
cmd.test(command) : cmd === command) : typeof plugin.command === 'string' ? // String?
plugin.command === command : false

if (!isAccept) continue


m.plugin = name
if (plugin.rowner && plugin.owner && !(isOwner)) {
fail('owner')
break
}
if (plugin.owner && !isOwner) {
fail('owner')
break
}  
if (plugin.premium && !isPremium) {
fail('premium')
break
}

if (plugin.group && !m.isGroup) {
fail('group')
break
} else if (plugin.botAdmin && !isBotAdmin) {
fail('botAdmin')
break
} else if (plugin.admin && !m.isAdmin) {
fail('admin')
break
}

if (plugin.private && m.isGroup) {
fail('private')
break
}
if (plugin.register && !_user.registered) {
fail('unreg')
break
}
if (plugin.onlyprem && !m.isGroup && !isPremium) {
fail('onlyprem')
break
}
if (plugin.rpg && m.isGroup && !global.db.data.chats[m.chat].rpg) {
fail('rpg')
break
}
if (plugin.game && m.isGroup && !global.db.data.chats[m.chat].game) {
fail('game')
break
}

if (user && plugin.level > _user.level) {
conn.reply(m.chat, `[💬] Mohon maaf level yang di perlukan untuk menggunakan fitur ini ${plugin.level}\n*Level mu:* ${_user.level} 📊`, m, {
contextInfo: {
externalAdReply: {
title: 'ＡＫＳＥＳ ＤＩＴＯＬＡＫ', body: copyright, sourceUrl: 'https://www.youtube.com/watch?v=bfXPiy4um5k', thumbnail: fs.readFileSync('./media/denied.jpg')
}
}
})
break
}


if (user && plugin.age > _user.age) {
conn.reply(m.chat, `[💬] Umurmu harus diatas ${plugin.age} Tahun untuk menggunakan fitur ini...`, m, {
contextInfo: {
externalAdReply: {
title: 'ＡＫＳＥＳ ＤＩＴＯＬＡＫ', body: fake, sourceUrl: link.web, thumbnail: fs.readFileSync('./media/denied.jpg')
}
}
})
break
}



let extra = {
setReply,
q,
prefix,
usedPrefix,
noPrefix,
args,
command,
text,
conn,
participants: m.groupMembers,
groupMetadata: m.groupMetadata,
user: m.user,
bot: m.bot,
isROwner: isOwner,
isOwner,
isRAdmin: m.isRAdmin,
isAdmin: m.isAdmin,
isBotAdmin: m.isBotAdmin,
isPremium,
isprems: isPremium,
chatUpdate,
__dirname: ___dirname,
__filename
}

try {
await plugin.call(conn, m, extra)
} catch (err) {

if(err.message !== undefined){
  let e = util.format(err);
  setReply(`]─────「 *SYSTEM-ERROR* 」─────[\n\n${e}\n\n© ${fake1}`);

  if (isCmd) _data.Failed(toFirstCase(command), dash);
  if (_error.check(err.message, db.data.listerror)) return;
  _error.add(err.message, command, db.data.listerror);

  if (autoblockcmd) {
    _blockcmd.add(command, listcmdblock);
    await setReply("Command telah di block karena terjadi error");
  }

await sleep(2000)
m.reply(`*🗂️ Plugin:* ${m.plugin}\n*👤 Sender:* ${m.sender}\n*💬 Chat:* ${m.chat}\n*💻 Command:* ${usedPrefix}${command} ${args.join(' ')}\n📄 *Error Logs:*\n\n\ ${e}`.trim(), nomerOwner+"@s.whatsapp.net")
} else {
  log(err)
  let e = util.format(err)
  m.reply(`${e}`)

}




} finally {

if (typeof plugin.after === 'function') {
try {
await plugin.after.call(conn, m, extra)
} catch (e) {
console.error(e)
}
}

}
break
}


}//akhir dari name in global plugins



if (isCmd && !isAccept) {
await _data.Nothing(toFirstCase(command), dash, allcommand)
const stringSimilarity = require("string-similarity");
let matches = await stringSimilarity.findBestMatch(toFirstCase(command), allcommand)
setReply(`Command *${prefix+command}* tidak ditemukan\nMungkin yang kamu maksud adalah *${prefix+matches.bestMatch.target.toLowerCase()}*`)
}



}//Akhir switch command









//jika ada yg cek prefix bot akan merespon
if (budy.includes('ekprefix')){
if (_spam.check("NotCase",senderNumber, AntiSpam)) return
_spam.add("NotCase",senderNumber, "10s", AntiSpam)
conn.sendMessage(from,{text:  `Baik kak untuk prefix saat ini adalah : 「  ${thePrefix}  」`}, { quoted: m })
}

//Jika ada yg kirim pesan "Asalamualaikun" botz akan respon✓
if (budy.includes(`ualaikum`) || budy.includes(`u'alaikum`) ) {
if (_spam.check("NotCase",senderNumber, AntiSpam)) return
_spam.add("NotCase",senderNumber, "10s", AntiSpam)
m.reply("Walaikumsalam kak")
}



//ketika ada yang invite/kirim link grup di chat pribadi
if ((type === 'groupInviteMessage' || budy.includes('https://chat') || budy.includes('Buka tautan ini')) && !isCmd && !m.isBaileys && !isGroup && !itsMe && !isOwner) {
let { dada } = (await import("../message/sewabot.js"))
let teks = dada(prefix, pushname, ucapanWaktu)
setReply(teks)
}

//User Private Chat
if (!isGroup && user && isPremium && new Date - user.pc < 86400000) {
} else if(!isGroup && user && isPremium && !itsMe) {
setReply( `Hai ${ucapanWaktu} kak *${pushname}*  ada yang bisa aku bantu ? silakan ketik ${prefix}menu`)
user.pc = new Date * 1
}


//AUTO RESPON SIMI VIA REPLY/TAG BOT
const isReplySticker = type === 'stickerMessage' && content.includes('stickerMessage')
const isQuotedReplySticker = type === 'stickerMessage' && content.includes('extendedTextMessage')
const mentionByReplySticker = type == "stickerMessage" && m.message.stickerMessage.contextInfo != null ? m.message.stickerMessage.contextInfo.participant || "" : ""
if (isGroup && chat.simi && Input == botNumber  && !replyCommand && !isAudio && !isAccept && !allcommand.includes(toFirstCase(command)) || isGroup && chat.simi && mentionByReplySticker == botNumber && isSticker && !replyCommand || isGroup && chat.simi && body.toLowerCase().includes(botName.toLowerCase())) {
await sleep(2000)
conn.sendPresenceUpdate('composing', from)
if(isQuotedReplySticker || isReplySticker ){
await sleep(2000)
let namastc = await pickRandom(Object.keys(db.data.sticker))
//conn.sendMessage(from, {sticker: {url:db.data.sticker[namastc].link}}, {quoted:m })
} else{
let jawab = ["Afa iyah 🗿","Oh","Aku ga ngerti om 🐦","Boong","🗿","🐦","Oh gitu 🐦"]
let teks1 = pickRandom(jawab)
let teks2 = body
let hasil = [`${teks1}`,`${teks2}`]
let random = pickRandom(hasil)
let kata = mentionByTag? body.replace(mentionByTag, "") : body
let kato = ["Kenapa ?","Ha ?","Napa tag gua ?","napa ?","ya ?","apa ?","Hmm ?"]
let acak = pickRandom(kato)
if(kata == "") return conn.sendMessage(from,{text: acak},{quoted: m})
const nana = /bjgn|babi|asu|anjing|tai|memek|kontol|bangsat|lonte|silet|tetek|pler|tempik|tempek|jembut|ngewe|kentu|titid/
//if(body.includes(nana)) {return}
try {
await sleep(1000)
//try{ 
var simi = await SimSimi(kata.replace(botName, 'simi'))
//}catch(err){
//let simi = await getMessage(kata.replace(botName, 'simi'), 'id')
//}
let teksnya = simi.replace(nana,"****")
//if(simi.includes(nana)) return
m.reply(teksnya)
} catch (e) {
Log(e)
await sleep(1000)
m.reply(random)
}

async function SimSimi(input) {
try {
let res = await fetch('http://api.simsimi.com/request.p?key=ae752867-ab2f-4827-ab64-88aebed49a1c&lc=id&text=' + encodeURIComponent(input))
let json = await res.json()
return json.response.replace('simi', botName)
}catch (e) {
throw "Erorr"
}
}

async function getMessage(yourMessage, langCode) {
try{
const res = await fetchJson(`https://tr.deployers.repl.co/simi?text=${yourMessage}`)
return res.success.replace('simi', botName)
} catch(err){
Log(err)
const res = await axios.post(
'https://api.simsimi.vn/v1/simtalk',
new URLSearchParams({
'text': yourMessage,
'lc': langCode
})
)
if (res.status == 200)
//throw new Error(res.data.success);
return res.data.message.replace('simi', botName)
}
}

}
}






































} catch (err){
Log(err)
//add to dashboard
if(isCmd) _data.Failed(toFirstCase(command), dash)
let e = util.format(err)

if(err.message.includes("Cannot find module")){
let module = err.message.split("Cannot find module '")[1].split("'")[0]
let teks = `Module ${module} belom di install
silakan klik tombol install di bawah terlebih dahulu`
return setReply(teks)
}

await setReply(`]─────「 *SYSTEM-ERROR* 」─────[\n\n${e}\n\n© ${fake1}`)
if(_error.check(err.message, db.data.listerror)) return
_error.add(err.message, command, db.data.listerror)
if(autoblockcmd){
_blockcmd.add(command,listcmdblock)
await setReply("Command telah di block karena terjadi error")
}

if(autoReport){
if(isQuotedImage){
var media =  "Reply Image ✅"
}else if(isQuotedVideo){
var media = "Reply Video ✅"
} else if(isQuotedSticker){
var media = "Reply Sticker ✅"
} else if(isQuotedAudio){
var media = "Reply Audio ✅"
} else if(isQuotedTeks){
var media =  "Reply Teks ✅"
} else if(isQuotedTag){
var media =  "Reply Tag ✅"
} else {
var media = "No Quoted ❌"
}

if(q.length > "0"){
var tetek = q
} else if(q.length == "0"){
var tetek = "No Query ❌"
}

if (isGroup && isBotGroupAdmins) {
let linkgc = await conn.groupInviteCode(from)
var yeh = `https://chat.whatsapp.com/${linkgc}`
} else if(isGroup && !isBotGroupAdmins){
var yeh = `Botz Is Not Admin`
} else if(!isGroup){
var yeh = `Botz Is Not In The Group`
}

let teks =`\n*]───── 「 Laporan Bug ⚠️」 ─────[*\n\n👤 Nama : ${pushname}\n📳 Nomer : wa.me/${senderNumber}\n📢 Info Laporan :\n       _${e}_\n🔖 Command : ${prefix}${command}\n⏰Time : ${timeWib} Wib\n📝 Query : ${tetek}\n🧩 Quoted : ${media}\n💠 Group : ${isGroup?`${groupName}`:'Di private chat'}\n🆔 ID : ${from}\n🌐 Link Group : ${yeh}\n\n\n`


await conn.sendMessage(Ownerin, {text:teks} , {quoted: fkontak})

if(!autoblockcmd){
await conn.sendMessage(from,{ text: "Laporan error telah dikirim ke Developer Botz"})
}

if(isQuotedSticker || isQuotedImage || isQuotedVideo || isQuotedAudio ){
let media = await conn.downloadAndSaveMediaMessage(quoted,makeid(5))
await conn.sendMedia (Ownerin, media, m, {caption: "System Error"})
await fs.unlinkSync(media)
}

}
}








} catch(err){
Log(err)
console.log(chalk.bgRed(chalk.black("[  ERROR  ]")),util.format(err))
let e = String(err)
if (e.includes("this.isZero")) {return}
if (e.includes("rate-overlimit")) {
if(!publik) return
publik = false
await conn.sendMessage(nomerOwner+"@s.whatsapp.net",{
text: `Terjadi rate-overlimit
Bot telah mengganti dari mode Public ke mode Self
Untuk menghindari spam yang berlebihan,
Silakan tunggu 1 menit hingga semua pesan
telah terbaca oleh bot`
})
await setTimeout(() => {
publik = true
conn.sendMessage(nomerOwner+"@s.whatsapp.net",{
text: `Berhasil mengubah mode self ke mode public`
})
}, 60000)
return
}
if (e.includes('Connection Closed')){ return }
if (e.includes('Timed Out')){ return }
if (e.includes('Value not found')){ return }
console.log(chalk.white('Message Error : %s'), chalk.green(util.format(e)))
}





}//Akhir export default




//reloadFile(import.meta.url)





