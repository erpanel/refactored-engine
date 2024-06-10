let handler = (m) => m;
import {  makeid} from "../../lib/myfunc.js"

handler.before = async function (m, { conn,isPremium }) {
    const isImage = m.type === "imageMessage";
    const isVideo = m.type === "videoMessage";
    const quoted = m.quoted ? m.quoted : m.msg === undefined ? m : m.msg;

if ((isImage || isVideo) && isPremium) {
    if (quoted.seconds > 11) return 
    const media = await conn.downloadMed(quoted, makeid(5));
    conn.toSticker(m.chat, media, m);
}
};
export default handler;
