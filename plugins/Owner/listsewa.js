import ms from "parse-ms";

let handler = async (m, { conn, args, isOwner }) => {
  let sewa = Object.values(db.data.chats).filter(i => i.expired !== 0);
  let ordernye = `\n––––––[MOVE GROUP SUCCESS]––––––
  *\n\n*Total order* : ${sewa.length}\n`;

  for (let i of sewa) {
    try {
      var data = await conn.groupMetadata(i.id);
    } catch {
      var data = { subject: i.name, id: "Bot telah di kick ❌" };
    }
    i.name = data.subject;

    let cekvipp = ms(i.expired - Date.now());

    // Calculate months remaining
    let cekbulan = Math.floor(cekvipp.days / 30);

    ordernye += `
*• Group* : ${data.subject}
*• ID* : ${m.isGroup ? "Private only" : isOwner ? data.id : "Owner only"}
*• Creator* : ${i.creator}
*• Expired* : ${cekbulan} Bulan ${cekvipp.days - cekbulan * 30} Hari ${cekvipp.hours} Jam ${cekvipp.minutes} Menit 
*• Link* : ${m.isGroup ? "Private only" : isOwner ? i.linkgc : "Owner only"}
•·–––––––––––––––––––––––––·•

`
  }

  m.reply(ordernye+`\n\n${copyright} - ${calender}`);

  let bio = ` Total order: ${sewa.length} group`;
  await conn.updateProfileStatus(bio).catch(_ => _);
};

handler.help = ["listsewa"];
handler.tags = ["info"];
handler.command = /^(listsewa|sewalist|listorder)$/i;
handler.owner = true;
export default handler;
