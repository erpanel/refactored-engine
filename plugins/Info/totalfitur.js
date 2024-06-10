import fetch from "node-fetch";
let handler = async (m, { conn, args, command }) => {
  const fs = require('fs');
  const path = require('path');
  
  // Path ke folder plugins
  const pluginsFolderPath = './plugins';
  
  // Daftar folder yang ingin dikecualikan dari perhitungan
  const excludedFolders = ['Bot-function', 'Game-answer', 'Game-hint']; // Ganti dengan nama folder yang ingin dikecualikan
  
  // Fungsi untuk menghitung jumlah file.js dalam sebuah folder
  function countJSFiles(folderPath) {
      try {
          const files = fs.readdirSync(folderPath); // Baca isi folder secara sinkron
          let jsFileCount = 0;
  
          files.forEach(file => {
              const filePath = path.join(folderPath, file);
              const stat = fs.statSync(filePath); // Dapatkan informasi status file
  
              if (stat.isDirectory()) {
                  if (!excludedFolders.includes(file)) {
                      jsFileCount += countJSFiles(filePath); // Rekursif untuk folder dalam folder
                  }
              } else {
                  if (path.extname(file) === '.js') {
                      jsFileCount++; // Tambahkan 1 untuk setiap file.js
                  }
              }
          });
  
          return jsFileCount;
      } catch (error) {
          console.error('Error:', error);
          return 0; // Jika terjadi error, kembalikan nilai 0
      }
  }
  
  // Hitung jumlah file.js dalam semua folder di dalam folder plugins
  const totalJSFiles = countJSFiles(pluginsFolderPath);

  






  let img = "https://telegra.ph/file/77762a5f1a77a55effcde.jpg";

  conn.reply(m.chat, `_Bot Ini Memiliki Total ${totalJSFiles} Fitur..._`, m, {
    contextInfo: {
      externalAdReply: {
        showAdAttribution: true,
        mediaType: 1,
        title: copyright,
        mediaUrl: img,
        thumbnailUrl: img,
        sourceId: " ",
        sourceUrl: "",
      },
    },
  });
};
handler.help = ["totalfitur"];
handler.tags = ["info"];
handler.command = ["totalfitur"];
handler.customPrefix = /(?:.)/;
export default handler;
