
import { unlinkSync } from "fs";
const { Top4top } = await import(`../../lib/uploader.js?v=${Date.now()}`).catch(
  (err) => console.log(err)
);
let handler = async (m, { conn, command, __dirname }) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || "";

  if (/image|video|audio/.test(mime) && command == "top4top") {
    await m.reply(wait);
    let media = await q.download(true);
    let ous = await Top4top(media);
    let output = Object.entries(ous.files[0])
      .map(
        ([key, value]) =>
          `  ○ *${key.toUpperCase()}:* ${
            key == "size" ? formatBytes(value) : value
          }`
      )
      .join("\n");
    await m.reply(output);
    unlinkSync(media);
  } else m.reply("Reply image/video");
};

handler.help = ["top4top"];
handler.tags = ["uploader"];
handler.command = ["top4top"];
export default handler;

function formatBytes(bytes) {
  if (bytes === 0) {
    return "0 B";
  }
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / 1024 ** i).toFixed(2)} ${sizes[i]}`;
}
  