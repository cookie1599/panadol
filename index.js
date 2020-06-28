const { Client, MessageEmbed } = require("discord.js");
const client = new Client();
const PREFIX = "sasa.";
const { TOKEN } = process.env;
const { get } = require("superagent");

client.on("ready", () => {
  console.log(`${client.user.tag} nggeus online aing teh anying.`);
  client.user.setActivity("Made by: Sasa tepung micin", { type: "PLAYING" });
});

client.on("message", async message => {
  if (
    !message.guild ||
    message.author.bot ||
    !message.content.startsWith(PREFIX)
  )
    return;
  const args = message.content
    .slice(PREFIX.length)
    .trim()
    .split(/ +/g);
  const cmd = args[0].toLowerCase();
  args.shift()
  switch (cmd) {
    case "ping":
      message.channel.send(`🏓 | Pooooong!!! \`${client.ws.ping}\`ms`);
      break;

    case "hazmi":
      message.channel.send("jelek");
      break;
    case "skinker":
      message.channel.send("air wudhu");
      break;
    
    case "owo":
      message.channel.send("owok owok owok");
      break;

    case "fetir":
      message.channel.send("ganteng kalo dilihat dari ujung samudra hindia");
      break;
      
    case "dwi":
      message.channel.send("bagos");
      break;
    
    case "sasa":
      message.channel.send("kepo ya akwaokwokw");
      break;
    
      
    case "corona":
      if (!args.length)
        return message.channel.send("Please enter a valid city.");
      const BASE_URL = "https://indonesia-covid-19-api.now.sh/api/";
      const { body: allProvinsi } = await get(`${BASE_URL}/provinsi`);
      const { body: indonesia } = await get(BASE_URL);
      if (!allProvinsi || !indonesia)
        return message.channel.send(
          "The API is currently down. Please try again later."
        );
      if (
        !allProvinsi.data
          .map(p => p.provinsi.toLowerCase())
          .includes(args.join(" ").toLowerCase()) &&
        args[0].toLowerCase() !== "indonesia"
      )
        return message.channel.send(
          `Provinsi dengan nama \`${args.join(" ")}\` tidak tersedia.`
        );
      if (args[0].toLowerCase() === "indonesia") {
        return message.channel.send(
          new MessageEmbed()
            .setAuthor("Indonesia Corona Information")
            .setColor("RED")
            .addField("Confirmed Case", `${indonesia.jumlahKasus} Cases`)
            .addField("Recovered", `${indonesia.sembuh} People`)
            .addField("Death", `${indonesia.meninggal} People`)
            .setFooter(
              `Data from ${BASE_URL}`,
              message.author.displayAvatarURL({
                format: "png",
                size: 4096,
                dynamic: true
              })
            )
        );
      }
      const selectedProvinsi = allProvinsi.data.find(
        p => p.provinsi.toLowerCase() === args.join(" ").toLowerCase()
      );
      if (selectedProvinsi) {
        return message.channel.send(
          new MessageEmbed()
            .setAuthor(`${selectedProvinsi.provinsi} Corona Information`)
            .setColor("RED")
            .addField("Confirmed Case", `${selectedProvinsi.kasusPosi} Cases`)
            .addField("Recovered", `${selectedProvinsi.kasusSemb} People`)
            .addField("Death", `${selectedProvinsi.kasusMeni} People`)
            .setFooter(
              `Data from ${BASE_URL}`,
              message.author.displayAvatarURL({
                format: "png",
                size: 4096,
                dynamic: true
              })
            )
        );
      }
      break;
      
  }

  // if (message.content === "ssasa") {
  //  message.channel.send("skinker sasa");
  // }
});

client.login(TOKEN).catch(e => process.exit(1));
