const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, phone, email } = req.body || {};

  if (!name || !email) {
    return res.status(400).json({ error: "Name und E-Mail sind erforderlich." });
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const phoneLine = phone ? phone : "Nicht angegeben";

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `Neue Webseiten-Anfrage von ${name} – Casa Marcuno`,
      text:
        `Neue Anfrage über die Casa Marcuno Webseite:\n\n` +
        `Name: ${name}\n` +
        `E-Mail: ${email}\n` +
        `Telefon: ${phoneLine}\n\n` +
        `Der Interessent möchte die Webseite erwerben.\n\n` +
        `– Automatisch gesendet über casa-marcuno.vercel.app`,
      html:
        `<h2>Neue Webseiten-Anfrage</h2>` +
        `<table style="border-collapse:collapse;font-family:sans-serif;">` +
        `<tr><td style="padding:8px 16px 8px 0;font-weight:bold;color:#333;">Name:</td><td style="padding:8px 0;color:#555;">${name}</td></tr>` +
        `<tr><td style="padding:8px 16px 8px 0;font-weight:bold;color:#333;">E-Mail:</td><td style="padding:8px 0;color:#555;"><a href="mailto:${email}">${email}</a></td></tr>` +
        `<tr><td style="padding:8px 16px 8px 0;font-weight:bold;color:#333;">Telefon:</td><td style="padding:8px 0;color:#555;">${phoneLine}</td></tr>` +
        `</table>` +
        `<br><p style="color:#555;">Der Interessent möchte die Webseite <strong>Casa Marcuno</strong> erwerben.</p>` +
        `<hr style="border:none;border-top:1px solid #eee;margin:20px 0;">` +
        `<p style="color:#999;font-size:12px;">Automatisch gesendet über casa-marcuno.vercel.app</p>`,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    return res.status(500).json({ error: "Email konnte nicht gesendet werden." });
  }
};
