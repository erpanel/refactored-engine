import {makeid} from "../../lib/myfunc.js"


let handler = async (m, {q,conn,isOwner,setReply,args,usedPrefix,command}) => {

 
if (!isOwner && !m.itsMe) return setReply(mess.only.ownerB)
if (!q) return setReply('Teksnya?')
let getGroups = await conn.groupFetchAllParticipating()
let groupss = Object.entries(getGroups).slice(0).map(entry => entry[1])
let anus = groupss.map(v => v.id)

const isImage = (m.type === 'imageMessage')
const isQuotedImage = m.type === 'extendedTextMessage' && m.content.includes('imageMessage')
const isVideo = (m.type === 'videoMessage')
const isQuotedVideo = m.type === 'extendedTextMessage' && m.content.includes('videoMessage')
const isQuotedAudio = m.type === 'extendedTextMessage' && m.content.includes('audioMessage')
const quoted = m.quoted ? m.quoted : m.msg === undefined? m: m.msg

if(isQuotedImage || isImage || isQuotedAudio || isVideo || isQuotedVideo) {
var alala = await conn.downloadAndSaveMediaMessage(quoted,makeid(5))
}
setReply(`Mengirim Broadcast Ke ${anus.length} Chat, Waktu Selesai ${anus.length * 0.5 } detik`)

for (let i of anus) {
let text = `
📢 *Broadcast Group*


${q.replace('-tag','')}


${copyright} - ${calender}
`

await sleep(1000)
  let mem = [];
let contextInfo = {
forwardingScore: 50,
isForwarded: true,
mentionedJid: mem,
externalAdReply:{
showAdAttribution: false,
title: `${baileysVersion}`,
body:`Runtime ${runTime} `,
previewType:"PHOTO",
thumbnailUrl: 'https://telegra.ph/file/0aa9d587a19e37a0b0122.jpg'
}
}


let data = await conn.groupMetadata(i) 
let member = data.participants
 if(q.endsWith('-tag')) member.map( u => mem.push(u.id) )

if(isQuotedImage || isImage){
conn.sendMessage(i,{contextInfo, mentions: mem, image:fs.readFileSync(alala),caption:text})
} else if(isQuotedVideo || isVideo){
conn.sendMessage(i,{contextInfo, mentions: mem, video:fs.readFileSync(alala),caption:text})
} else if(isQuotedAudio){
conn.sendMessage(i,{contextInfo, mentions: mem, Audio:fs.readFileSync(alala)})
} else conn.sendMessage(i,{contextInfo,text, mentions: mem })
}
setReply(`Sukses Mengirim Broadcast Ke ${anus.length} Group`)
 
       
    
}
handler.help = ["d"]
handler.tags = ["owner"];
handler.command = ['bcgc']
export default handler



