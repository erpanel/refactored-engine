import FormData from "form-data";
import Jimp from "jimp";

async function processing(urlPath, method) {
  return new Promise(async (resolve, reject) => {
    let Methods = ["enhance", "recolor", "dehaze"];
    Methods.includes(method) ? (method = method) : (method = Methods[0]);
    let buffer,
      Form = new FormData(),
      scheme = "https" + "://" + "inferenceengine" + ".vyro" + ".ai/" + method;
    Form.append("model_version", 1, {
      "Content-Transfer-Encoding": "binary",
      contentType: "multipart/form-data; charset=uttf-8",
    });
    Form.append("image", Buffer.from(urlPath), {
      filename: "enhance_image_body.jpg",
      contentType: "image/jpeg",
    });
    Form.submit(
      {
        url: scheme,
        host: "inferenceengine" + ".vyro" + ".ai",
        path: "/" + method,
        protocol: "https:",
        headers: {
          "User-Agent": "okhttp/4.9.3",
          Connection: "Keep-Alive",
          "Accept-Encoding": "gzip",
        },
      },
      function (err, res) {
        if (err) reject();
        let data = [];
        res
          .on("data", function (chunk, resp) {
            data.push(chunk);
          })
          .on("end", () => {
            resolve(Buffer.concat(data));
          });
        res.on("error", (e) => {
          reject();
        });
      }
    );
  });
}
let handler = async (m, { conn, usedPrefix, command }) => {
  switch (command) {
    case "remini":
      {
        conn.enhancer = conn.enhancer ? conn.enhancer : {};
        if (m.sender in conn.enhancer)
          return m.reply("Masih Ada Proses Yang Belum Selesai Kak, Silahkan Tunggu Sampai Selesai Yah >//<")
        let q = m.quoted ? m.quoted : m;
        let mime = (q.msg || q).mimetype || q.mediaType || "";
        if (!mime) return  m.reply(`Fotonya Mana Kak?`)
        if (!/image\/(jpe?g|png)/.test(mime))
          return m.reply(`Mime ${mime} tidak support`)
        else conn.enhancer[m.sender] = true;
        m.reply("Proses Kak...");
        let img = await q.download?.();
        let error;
        try {
          const This = await processing(img, "enhance");
          conn.sendFile(m.chat, This, "", "Sudah Jadi Kak >//<", m);
        } catch (er) {
          error = true;
        } finally {
          if (error) {
            m.reply("Proses Gagal :(");
          }
          delete conn.enhancer[m.sender];
        }
      }
      break;
    case "color":
      {
        conn.recolor = conn.recolor ? conn.recolor : {};
        if (m.sender in conn.recolor)
          return m.reply("Masih Ada Proses Yang Belum Selesai Kak, Silahkan Tunggu Sampai Selesai Yah >//<")
        let q = m.quoted ? m.quoted : m;
        let mime = (q.msg || q).mimetype || q.mediaType || "";
        if (!mime) return m.reply(`Fotonya Mana Kak?`)
        if (!/image\/(jpe?g|png)/.test(mime))
          return  m.reply(`Mime ${mime} tidak support`)
        else conn.recolor[m.sender] = true;
        m.reply("Proses Kak...");
        let img = await q.download?.();
        let error;
        try {
          const This = await processing(img, "enhance");
          conn.sendFile(m.chat, This, "", "Sudah Jadi Kak >//<", m);
        } catch (er) {
          error = true;
        } finally {
          if (error) {
            m.reply("Proses Gagal :(");
          }
          delete conn.recolor[m.chat];
        }
      }
      break;
    case "hdr":
      {
        conn.hdr = conn.hdr ? conn.hdr : {};
        if (m.sender in conn.hdr)
          return m.reply("Masih Ada Proses Yang Belum Selesai Kak, Silahkan Tunggu Sampai Selesai Yah >//<")
        let q = m.quoted ? m.quoted : m;
        let mime = (q.msg || q).mimetype || q.mediaType || "";
        if (!mime) return m.reply(`Fotonya Mana Kak?`)
        if (!/image\/(jpe?g|png)/.test(mime))
          return m.reply(`Mime ${mime} tidak support`)
        else conn.hdr[m.sender] = true;
        m.reply("Proses Kak...");
        let img = await q.download?.();
        let error;
        try {
          const This = await processing(img, "enhance");
          conn.sendFile(m.chat, This, "", "Sudah Jadi Kak >//<", m);
        } catch (er) {
          error = true;
        } finally {
          if (error) {
            m.reply("Proses Gagal :(");
          }
          delete conn.hdr[m.sender];
        }
      }
      break;
    case "hd":
      {
        conn.hd = conn.hd ? conm.hd : {};
        if (m.sender in conn.hd)
          return m.reply("Masih Ada Proses Yang Belum Selesai Kak, Silahkan Tunggu Sampai Selesai Yah >//<")
        let q = m.quoted ? m.quoted : m;
        let mime = (q.msg || q).mimetype || q.mediaType || "";
        if (!mime) return m.reply(`Fotonya Mana Kak?`)
        if (!/image\/(jpe?g|png)/.test(mime))
          return m.reply(`Mime ${mime} tidak support`)
        else conn.hd[m.sender] = true;
        m.reply("Proses Kak...");
        let img = await q.download?.();
        let error;
        try {
          const This = await processing(img, "enhance");
          conn.sendFile(m.chat, This, "", "Sudah Jadi Kak >//<", m);
        } catch (er) {
          error = true;
        } finally {
          if (error) {
            m.reply("Proses Gagal :(");
          }
          delete conn.hd[m.sender];
         }
        }
        break;
  }
};
handler.help = ["remini2", "color", "hdr", "hd"];
handler.tags = ["ai"];
handler.premium = false;
handler.limit = true;
handler.command = ["remini", "color", "hdr", "hd"];
export default handler;
