const Discord = require("discord.js");
//TlhaMert Youtube Kanalı : https://youtube.com/c/TlhaMert
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const chalk = require("chalk");
const moment = require("moment");
var Jimp = require("jimp"); //TlhaMert Youtube Kanalı : https://youtube.com/c/TlhaMert
const { Client, Util } = require("discord.js");
const weather = require("weather-js");
const fs = require("fs");
const db = require("quick.db");
const http = require("http");
const express = require("express");
require("./util/eventLoader.js")(client); //TlhaMert Youtube Kanalı : https://youtube.com/c/TlhaMert
const path = require("path");
const request = require("request");
const snekfetch = require("snekfetch");
const queue = new Map();
const YouTube = require("simple-youtube-api");
const ytdl = require("ytdl-core");

const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping tamamdır.");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  //TlhaMert Youtube Kanalı : https://youtube.com/c/TlhaMert
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

//// HOŞGELDİN MESAJI ////

client.on("guildMemberAdd", async member => {
  require("moment-duration-format");
  moment.locale("tr");
  let user = client.users.get(member.id);
  let tarih = moment(member.user.createdAt.getTime()).format("LLL");
  let gün = moment
    .duration(new Date().getTime() - member.user.createdAt.getTime())
    .format("D");
  let resim = new Discord.Attachment(
    "https://cdn.discordapp.com/attachments/755708975252766743/758095908452696084/tenor.gif"
  );

  let kişi = member.guild.memberCount;
  let kayıtcırol = "756547812870848522"; //Yetkili rolünüz ID'sini girin.
  let kanal = client.channels.get("764564482931949639"); //Kanalınızın ID'sini girin.
  const kurulus = new Date().getTime() - user.createdAt.getTime();
  const gün1 = moment.duration(kurulus).format("D");
  var devtr;

  if (kurulus < 1296000000)
    devtr = "Hesabınız : Şüpheli <a:kitap:752157972670447667> ";
  if (kurulus > 1296000000)
    devtr = "Hesabınız : Güvenli <a:tilks:752158148609179658> ";
  let emoji2 = client.emojis.find(emoji => emoji.name === "yldz");

  kanal.send(
    `<a:tac:753929077391360020>  **Merhaba** <@${member.user.id}>  ** Sunucumuza hoş geldin**\n\n<a:tac:753929077391360020>  **Seninle birlikte** ${kişi} **kişiyiz.**\n\n**<a:tac:753929077391360020>   Hesabın kurulduğu tarih;  __${tarih}__' **\n\n**<a:tac:753929077391360020>  <@&756547812870848522> Rolündeki Yetkililer Seninle ilgilenecektir.** `,
    resim
  );
});

//// OTO-ROL ////
client.on("guildMemberAdd", async member => {
  member.addRole("756548990115381310");
  const rochelle = member.guild.channels.find(
    channel => channel.id === "764730078033739806"
  );
  const rochelle1 = new Discord.RichEmbed()
    .setColor("RED")
    .addField(
      ` Hoş Geldin Dostum`,
      ` ${member} Adlı Üye Sunucumuza Katıldı, <@&756548990115381310> Rolünü Verdim ! `
    );
  rochelle.send(rochelle1);
});
//// HESAP 7 GÜNDEN ÖNCEYSE ŞÜPHELİ VEYA CEZALI ROLÜ VER////
client.on("guildMemberAdd", member => {
  var moment = require("moment");
  require("moment-duration-format");
  moment.locale("tr");
  var { Permissions } = require("discord.js");
  var x = moment(member.user.createdAt)
    .add(7, "days")
    .fromNow();
  var user = member.user;
  x = x.replace("birkaç saniye önce", " ");
  if (!x.includes("önce") || x.includes("sonra") || x == " ") {
    var rol = member.guild.roles.get("756548523549524099"); ///Cezalı Rol ID

    var kayıtsız = member.guild.roles.get("756548990115381310"); ///Kayıtsız rolü ID'si
    var eks = member.guild.roles.get("756548990115381310"); ///Kayıtsız rolü ID'si
    var eksi = member.guild.roles.get("756548990115381310"); ///Kayıtsız rolü ID'si  717777340708552807 717743735705960448
    member.addRole(rol);
    member.removeRole(kayıtsız);
    member.removeRole(eks);
    member.removeRole(eksi);

    member.user.send(
      "<a:unlem:754015531849482400>  Hesabınız 7 günden önce açıldığı için __cezalıya__ atıldınız, yetkililere bildirerek açtırabilirsiniz."
    ); //TlhaMert Youtube Kanalı : https://youtube.com/c/TlhaMert

    const rochelle = new Discord.RichEmbed()
      .setColor("GOLD")
      .setDescription(
        `${user} Adlı Şahısın Hesabı 7 Günden Önce Açıldığı İçin Koruma Nedeniyle Cezalı Rolünü Verdik.`
      );
    client.channels.get("756946747112030310").send(rochelle);
    setTimeout(() => {
      member.removeRole(kayıtsız.id);
      member.removeRole(eks.id);
      member.removeRole(eksi.id);
    }, 1000);
  } else {
  }
});
//// SES-GİREN-ÇIKAN-LOG ////
client.on("voiceStateUpdate", async (thrones, sanal) => {
  let voiceLog = thrones.guild.channels.find(c => c.name === "voice-log");
  if (thrones.voiceChannel === sanal.voiceChannel) return;
  //if()
  if (thrones.voiceChannel && !sanal.voiceChannel)
    return voiceLog
      .send({
        embed: {
          description:
            "<@" +
            thrones.id +
            "> adlı kullanıcı **" +
            thrones.voiceChannel +
            "** kanalından çıkış yapdı.",
          color: Math.floor(Math.random() * (0xffffff + 1)),
          timestamp: new Date()
        }
      })
      .catch(console.error);

  if (!thrones.voiceChannel && sanal.voiceChannel)
    return voiceLog
      .send({
        embed: {
          description:
            "<@" +
            sanal.id +
            "> adlı kullanıcı **" +
            sanal.voiceChannel +
            "** kanalına giriş yapdı.",
          color: Math.floor(Math.random() * (0xffffff + 1)),
          timestamp: new Date()
        }
      })
      .catch(console.error);

  if (thrones.voiceChannel !== sanal.voiceChannel)
    return voiceLog
      .send({
        embed: {
          description:
            "<@" +
            thrones.id +
            "> adlı kullanıcı **" +
            thrones.voiceChannel +
            "** kanalından **" +
            sanal.voiceChannel +
            "** kanalına giriş yapdı.",
          color: Math.floor(Math.random() * (0xffffff + 1)),
          timestamp: new Date()
        }
      })
      .catch(console.error);
});

//////////// SA - AS - MERHABA - TAG- LİNK KOMUTLARI OTO CEVAP
client.on("message", async msg => {
  if (msg.content.toLowerCase() === "sa") {
    msg.reply(
      "Aleyküm Selam Hoşgeldin!Public sunucumuza<a:tilks:752158148609179658> "
    );
  }
});

client.on("message", async msg => {
  if (msg.content.toLowerCase() === "merhaba") {
    msg.reply("Merhaba Nasılsın!  ");
  }
});
//Zcode
client.on("message", async msg => {
  if (msg.content.toLowerCase() === "Sea") {
    msg.reply(
      "Aleyküm Selam Hoşgeldin!Public sunucumuza<a:tilks:752158148609179658> "
    ); //TlhaMert Youtube Kanalı : https://youtube.com/c/TlhaMert
  }
});
//Zcode
client.on("message", async msg => {
  if (msg.content.toLowerCase() === "sea") {
    msg.reply(
      "Aleyküm Selam Hoşgeldin!Public sunucumuza<a:tilks:752158148609179658> "
    );
  }
});

client.on("message", async msg => {
  if (msg.content.toLowerCase() === "Sa") {
    msg.reply(
      "Aleyküm Selam Hoşgeldin!Public sunucumuza<a:tilks:752158148609179658> "
    );
  }
});

client.on("message", msg => {
  if (msg.content.toLowerCase() === "!tag") {
    msg.channel.sendMessage("୪");
    msg.react("698880257305870456");
  }
});

client.on("message", msg => {
  if (msg.content.toLowerCase() === "tag") {
    msg.channel.sendMessage("**୪**");
    msg.react("698880257305870456");
  }
});

client.on("message", msg => {
  if (msg.content.toLowerCase() === "!link") {
    msg.channel
      .sendMessage("https://discord.gg/rDjztcU")
      .then(msg => msg.delete(6000));
    msg.react("698880257305870456");
  }
});
client.on("message", msg => {
  if (msg.content.toLowerCase() === "link") {
    msg.channel
      .sendMessage("https://discord.gg/rDjztcU")
      .then(msg => msg.delete(6000));
    msg.react("698880257305870456");
  }
});

client.on("guildMemberAdd", async member => {
  let jail = db.fetch(`devtr.jail_${member.guild.id}_${member.id}`);
  if (!jail) return;
  member.roles.forEach(xfalcon => {
    member.removeRole(xfalcon);
    member.addRole(jail); //TlhaMert Youtube Kanalı : https://youtube.com/c/TlhaMert
  });
});

client.on("ready", async () => {
  await client.channels.get("763037473310900245").join();
});
//////// OTO-NİCK-DEGİŞTİRME //////
client.on("guildMemberAdd", member => {
  let rakamlar = Array(9)
    .fill(0)
    .map((_, index) => index + 1);

  let nickkontrol = member.user.username.split("୪ İsim | Yaş");

  if (!tumHarfler("a", "z").some(harf => nickkontrol.includes(harf))) {
    member.setNickname(`୪  İsim | Yaş `); //Botun değiştirmesini istediğiniz ismi girin.
  } else {
    return; //DevTR
  }

  function tumHarfler(charA, charZ) {
    let a = [],
      i = charA.charCodeAt(0),
      j = charZ.charCodeAt(0);
    for (; i <= j; ++i) {
      //TlhaMert Youtube Kanalı : https://youtube.com/c/TlhaMert
      a.push(String.fromCharCode(i));
    }
    return a;
  }
});

client.on("message", message => {
  //var i = db.fetch(`prefix_${message.guild.id}`)

  let afk_kullanici = message.mentions.users.first() || message.author;
  if (message.content.startsWith(ayarlar.prefix + "afk")) return;
  if (message.author.bot === true) return;

  if (message.content.includes(`<@${afk_kullanici.id}>`))
    if (db.has(`afks_${afk_kullanici.id}`)) {
      const afksuan = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setDescription(
          `**${
            client.users.get(afk_kullanici.id).tag
          }** adlı kullanıcı şuanda AFK! \n**Sebep:** \n${db.fetch(
            `afks_${afk_kullanici.id}`
          )}`
        );
      message.channel.send(afksuan);
    }

  if (db.has(`afks_${message.author.id}`)) {
    let user = message.member;

    const basarili = new Discord.RichEmbed().setColor("GREEN");
    user.setNickname(message.author.username);

    message.channel.send(basarili);
    db.delete(`afks_${message.author.id}`);
  }
});

client.on("message", async message => {
  const msg = message;
  if (message.content.startsWith(ayarlar.prefix + "afk")) return;
  let afk = message.mentions.users.first();

  const kisi = db.fetch(`afkid_${message.author.id}_${message.guild.id}`);

  const isim = db.fetch(`afkAd_${message.author.id}_${message.guild.id}`);
  if (afk) {
    const sebep = db.fetch(`afkSebep_${afk.id}_${message.guild.id}`);
    const kisi3 = db.fetch(`afkid_${afk.id}_${message.guild.id}`);
    if (message.content.includes(kisi3)) {
      const embed = new Discord.RichEmbed()
        .setColor("#0080FF")
        .setAuthor("୪ Melania", "")
        .setDescription(`Etiketlediğiniz Kişi Afk \n Sebep : ${sebep}`)
        .setTimestamp()
        .setFooter(`${message.author.username} Tarafından İstendi`);
      message.channel.send(embed);
    }
  }
  if (message.author.id === kisi) {
    const embed = new Discord.RichEmbed()
      .setColor("#0080FF")
      .setAuthor("୪ Melania", "")
      .setDescription(`Afk'lıktan Çıktınız`)
      .setTimestamp()
      .setFooter(`${message.author.username} Tarafından İstendi`);
    message.channel.send(embed);
    db.delete(`afkSebep_${message.author.id}_${message.guild.id}`);
    db.delete(`afkid_${message.author.id}_${message.guild.id}`);
    db.delete(`afkAd_${message.author.id}_${message.guild.id}`);
    message.member.setNickname(isim);
  }
});

client.login(ayarlar.token);
client.on("userUpdate", async (old, rm) => {
  let tag = "୪";
  let rolid = "756548990115381310";
  let kanal = "764564482931949639";
  let sunucuid = "752116463770271885";

  if (old.username !== rm.username) {
    if (
      !rm.username.includes(tag) &&
      client.guilds
        .get(sunucuid)
        .members.get(rm.id)
        .roles.has(rolid)
    ) {
      client.guilds
        .get(sunucuid)
        .members.get(rm.id)
        .removeRole(rolid);
      client.channels
        .get(kanal)
        .send(
          `**${rm}, "${tag}" tagını çıkardığı için <@&756546656660619426> rolü alındı!**`
        );
    }

    if (
      rm.username.includes(tag) &&
      !client.guilds
        .get(sunucuid)
        .members.get(rm.id)
        .roles.has(rolid)
    ) {
      client.channels
        .get(kanal)
        .send(
          `**${rm}, "${tag}" tagını aldığı için <@&756546656660619426> rolü verildi!**`
        );
      client.guilds
        .get(sunucuid)
        .members.get(rm.id)
        .addRole(rolid);
    }
  }
});
