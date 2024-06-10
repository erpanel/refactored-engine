
import { fetchJson } from "../../lib/myfunc.js";
import { miftah } from '../../lib/restApi.js'
let handler = async (m, { command, q, conn, prefix, setReply }) => {
  if (!q || !q.startsWith('https') )
    return setReply(
      `Linknya?\nContoh: ${
        prefix + command
      } https://www.instagram.com/p/CKXZ1Z1JZK/`
    );
  setReply(mess.wait);

  const data = new miftah()
  let res = await data.instagram(q)
  log(res)
  conn.sendMessage(m.chat, { video: { url: res.data[0].url } }, { quoted: m });
};
handler.help = ["instagram"];
handler.tags = ["downloader"];
handler.command = /^(ig(dl)?|instagram(dl)?)$/i;

export default handler;
