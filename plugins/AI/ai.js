import fetch from "node-fetch"
 import axios from 'axios'

let handler = async (m, {q,conn,args,usedPrefix,command}) => {
    if(!q) return m.reply("Mau ngomong apa?")

    
var messages = [{
    role: 'user',
    content: q
}]
var system = `Your Name Zeiyy`;
try {
var api = (await axios.post('https://skizo.tech/api/openai?apikey=officialdittaz', {
messages,
system: system
})).data;

conn.sendMessage(m.chat,{text:api.result},{quoted:m})
} catch (Error) {
Log(Error.toString())
};           
       
       
 

    
}
handler.help = ["chatgpt"]
handler.tags = ["internet", "ai", "gpt"];
handler.command = ['ai']

export default handler

