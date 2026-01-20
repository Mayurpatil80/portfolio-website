import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: 'mp6979884@gmail.com', 
        pass: 'rxfodthcsoyobpiv' 
      }
    });

    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER,
      subject: `New Portfolio Message from ${name}`,
      text: `From: ${name} (${email})\n\nMessage:\n${message}`
    });

    res.status(200).json({ message: "Success" });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}
