import fs from "fs-extra";
import { exec, spawn } from "child_process";

let handler = async (m, { text, q, conn, setReply }) => {
  if (!q) return setReply("Nama foldernya apa ?");
  let mimetype = "application/zip";
  let name = `${q}.zip`;
  let jpegThumbnail = fs.readFileSync("./media/thumbnaildokumen.jpg");
  let folder = await fs.existsSync("./" + q);
  if (!folder) return setReply("Folder tidak di temukan");
  setReply(mess.wait);
  exec(`zip -r ${name} ${q}`, async (error, stdout, stderr) => {
    if (error) {
      console.error(`error: ${error.message}`);
      setReply(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    if (stdout) {
      await sleep(2000);
      let file = await fs.readFileSync(name);
      await conn.sendMessage(
        m.chat,
        { document: file, fileName: name, mimetype, jpegThumbnail },
        { quoted: m }
      );
      await fs.unlinkSync(name);
    }
  });
};
handler.help = ["getfolder"];
handler.tags = ["internet"];
handler.command = /^(getfolder|gfo)$/i;
handler.owner = true;
export default handler;
