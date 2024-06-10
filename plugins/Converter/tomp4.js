import { getRandomFile, makeid } from "../../lib/myfunc.js";
import fs from "fs-extra";
import { exec } from "child_process"; // Keep exec for imagemagick conversion
import ffmpeg from 'fluent-ffmpeg';

let handler = async (m, { conn, setReply }) => {
  const isQuotedSticker =
    m.type === "extendedTextMessage" && m.content.includes("stickerMessage");
  const quoted = m.quoted ? m.quoted : m.msg === undefined ? m : m.msg;

  if (isQuotedSticker) {
    setReply(mess.wait);
    let file = await conn.downloadAndSaveMediaMessage(quoted, makeid(5));
    let outGif = `./${getRandomFile(".gif")}`;
    let outMp4 = `./${getRandomFile(".mp4")}`;

    // Convert webp to gif using imagemagick
    exec(`convert ${file} ${outGif}`, (err) => {
      if (err) {
        console.log(err);
        return setReply(`${err}`);
      }

      // Convert gif to mp4 using fluent-ffmpeg
      ffmpeg(outGif)
        .videoCodec('libx264')
        .outputOptions([
          '-vf', 'crop=trunc(iw/2)*2:trunc(ih/2)*2',
          '-b:v', '0',
          '-crf', '25',
          '-pix_fmt', 'yuv420p'
        ])
        .saveToFile(outMp4)
        .on('error', (err) => {
          console.error(err);
          return setReply(`${err}`);
        })
        .on('end', async () => {
          await conn.sendMessage(
            m.chat,
            { video: fs.readFileSync(outMp4), caption: "Nih" },
            { quoted: m }
          );
          fs.unlinkSync(outGif);
          fs.unlinkSync(outMp4);
          fs.unlinkSync(file);
        });
    });
  }
};

handler.help = ["converter"];
handler.tags = ["internet"];
handler.command = ["tomp4"];
export default handler;
