const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
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

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "Neue Webseiten-Anfrage – Casa Marcuno GmbH",
      text:
        "Ein Besucher der Casa Marcuno Webseite hat Interesse am Kauf der Webseite bekundet.\n\n" +
        "Bitte nehmen Sie zeitnah Kontakt auf.\n\n" +
        "– Automatisch gesendet über casa-marcuno.vercel.app",
      html:
        "<h2>Neue Anfrage eingegangen</h2>" +
        "<p>Ein Besucher der <strong>Casa Marcuno</strong> Webseite hat Interesse am Kauf der Webseite bekundet.</p>" +
        "<p>Bitte nehmen Sie zeitnah Kontakt auf.</p>" +
        "<br><hr>" +
        "<p style='color:#999;font-size:12px;'>Automatisch gesendet über casa-marcuno.vercel.app</p>",
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    return res.status(500).json({ error: "Email konnte nicht gesendet werden." });
  }
};
