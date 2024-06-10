import neofetch from 'neofetch';

let handler = async (m, { conn, setReply }) => {
  neofetch().then(output => {
    setReply(output);
  }).catch(error => {
    console.error(`error: ${error.message}`);
    setReply(`error: ${error.message}`);
  });
};

handler.help = ["others"];
handler.tags = ["spesifikasi"];
handler.command = /^(neo|neofetch)$/i;
handler.limit = true;

export default handler;
