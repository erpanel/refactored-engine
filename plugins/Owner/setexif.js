import { Exif } from "../../lib/exif.js";
let handler = async (m, { conn, q, setReply, isOwner }) => {
  if (!isOwner) return setReply(mess.only.ownerB);
  if (!q) return setReply(mess.query);
  const exif = new Exif();

  const exifff = `${args.join(" ")}`;
  const namaPack = exifff.split("|")[0];
  const authorPack = exifff.split("|")[1];
  exif.create(authorPack, namaPack);
  await setReply("Succes");
};
handler.help = ["user"];
handler.tags = ["owner"];
handler.command = ["setexif"];

export default handler;
