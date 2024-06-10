import { getRandomFile, makeid } from "../../lib/myfunc.js";

let handler = async (m, { q, conn, setReply, usedPrefix, command }) => {
  const quoted = m.quoted ? m.quoted : m.msg === undefined ? m : m.msg;
  const { createExif, modStick } = await import("../../lib/myfunc.js");
  if (!q) return setReply("masukan teks contoh take lala|lulu");
  if (!q.includes("|")) return setReply("masukan teks contoh take lala|lulu");
  const media = await conn.downloadMed(quoted, makeid(5));
  let author = q.split("|")[0];
  let packname = q.split("|")[1];
  createExif(packname, author);
  modStick(m.chat, media, m);
};
handler.help = ["sticker"];
handler.tags = ["tools"];
handler.command = ["wm"];

export default handler;
