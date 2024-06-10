import { getRandomFile, makeid } from "../../lib/myfunc.js";

let handler = async (m, { q, conn, args, usedPrefix, command }) => {
  const isImage = m.type === "imageMessage";
  const isQuotedImage =
    m.type === "extendedTextMessage" && m.content.includes("imageMessage");
  const isQuotedSticker =
    m.type === "extendedTextMessage" && m.content.includes("stickerMessage");
  const quoted = m.quoted ? m.quoted : m.msg === undefined ? m : m.msg;
  if (isImage || isQuotedImage || isQuotedSticker) {
    try {
      let ahuh = args.join(" ").split("|");
      let satu = ahuh[0] !== "" ? ahuh[0] : `EXTREAM`;
      let dua = typeof ahuh[1] !== "undefined" ? ahuh[1] : ``;
      let {
        Sticker,
        createSticker,
        StickerTypes,
      } = require("wa-sticker-formatter");
      let media = await conn.downloadAndSaveMediaMessage(quoted, makeid(5));
      let jancok = new Sticker(media, {
        pack: dua, // The pack name
        author: satu, // The author name
        type: StickerTypes.FULL, // The sticker type
        categories: ["🤩", "🎉"], // The sticker category
        id: "12345", // The sticker id
        quality: 70, // The quality of the output file
        background: "#FFFFFF00", // The sticker background color (only for full stickers)
      });
      let stok = getRandomFile(".webp");
      let nono = await jancok.toFile(stok);
      let nah = fs.readFileSync(nono);
      await conn.sendMessage(m.chat, { sticker: nah }, { quoted: m });
      await fs.unlinkSync(stok);
      await fs.unlinkSync(media);
    } catch (err) {
      console.log(err);
    }
  }
};
handler.help = ["sticker"];
handler.tags = ["tools"];
handler.command = ["take"];

export default handler;
