import fetch from "node-fetch"
import axios from 'axios'

let handler = async (m, {q,conn,args,usedPrefix,command}) => {
if(!q) return m.reply("Masukan link youtube")
m.reply(wait)
let api_fb = await fetch(`https://skizo.tech/api/facebook?url=${q}&apikey=officialdittaz`)
let tech = await api_fb.json();
let url = tech.medias[1]
if (!url) return "can't download video now, try again later";
let resp = await fetch(url.url);
if (/text|json/.test(resp.headers.get('content-type'))) throw await resp.text();
let twtw = await resp.buffer();

conn.sendFile(m.chat, twtw, '', `*${tech.title}*`, m)    


}
handler.help = ["chatgpt"]
handler.tags = ["internet", "ai", "gpt"];
handler.command = ['tw','twitter']

export default handler