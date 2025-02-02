import { getRandomFile, makeid } from "../../lib/myfunc.js";
import ffmpeg from "fluent-ffmpeg";
import fs from "fs-extra";

let handler = async (m, { conn, setReply }) => {
    const isQuotedAudio = m.type === "extendedTextMessage" && m.content.includes("audioMessage");
    const quoted = m.quoted ? m.quoted : m.msg === undefined ? m : m.msg;

    if (!isQuotedAudio) {
        return setReply("Reply audionya");
    }

    setReply("Tunggu sebentar...");

    try {
        let medoi = await conn.downloadAndSaveMediaMessage(quoted, makeid(5));
        let ran = getRandomFile(".mp3");

        ffmpeg(medoi)
            .audioFilter("atempo=1.06,asetrate=44100*1.25")
            .save(ran)
            .on("end", async () => {
                fs.unlinkSync(medoi);
                let buffer = fs.readFileSync(ran);
                await conn.sendMessage(m.chat, { mimetype: "audio/mp4", ptt: true, audio: buffer }, { quoted: m });
                fs.unlinkSync(ran);
            })
            .on("error", async (err) => {
                fs.unlinkSync(medoi);
                fs.unlinkSync(ran);
                setReply(`Error: ${err.message || "Terjadi kesalahan saat mengonversi audio."}`);
            });
    } catch (err) {
        setReply(`Error: ${err.message || "Terjadi kesalahan saat mengunduh atau mengonversi audio."}`);
    }
};

handler.help = ["converter"];
handler.tags = ["internet"];
handler.command = ["nightcore"];

export default handler;
