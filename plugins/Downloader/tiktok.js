import fetch from "node-fetch"

let handler = async (m, {q,conn,args,usedPrefix,command}) => {
if(!q) return m.reply("Masukan link tiktok")
if(!q.startsWith('http'))  return m.reply("Masukan link tiktok")
m.reply(wait)
let tik = await fetch(`https://skizo.tech/api/tiktok?url=${q}&apikey=officialdittaz`)

let tech = await tik.json();
    
let url = tech.data.play
Log(tech.data)
if (!url) return "can't download video now, try again later";
//let resp = await fetch(url.url);
//if (/text|json/.test(resp.headers.get('content-type'))) throw await resp.text();
//let twtw = await resp.buffer();
conn.sendMessage(m.chat,{video:{url},caption:tech.data.title},{quoted:m})
//conn.sendFile(m.chat, url, '', `*${tech.data.title}*`, m)    


}
handler.help = ["downloader"]
handler.tags = ["internet"];
handler.command = ['tt','tiktok']

export default handler