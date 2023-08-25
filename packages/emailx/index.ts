import nodemailer from "nodemailer";
import { config } from "up-dir-env";

interface Emailx {
  title: string;
  email: string;
  text: string;
  html: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _transport: any;
let user: string;
const getTransport = () => {
  if (!_transport) {
    config();
    const host = process.env["email_host"]!;
    const port = process.env["email_port"]!;
    user = process.env["email_user"]!;
    const pass = process.env["email_pass"]!;
    if (!host || !port || !user || !pass) {
      throw new Error(`emailx not have host:${host}, port:${port}, user:${user}, pass`);
    }
    _transport = nodemailer.createTransport({
      host: host,
      port: Number(port),
      // secure: true,
      auth: {
        user: user,
        pass: pass,
      },
    });
  }
  return _transport;
};

export const emailx = async (p: Emailx): Promise<string> => {
  const transporter = getTransport();
  const info = await transporter.sendMail({
    from: `${p.title} <${user}>`,
    to: p.email,
    subject: p.title,
    text: p.text,
    html: p.html,
  });

  return info.messageId;
};
