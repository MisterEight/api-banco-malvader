import nodemailer from 'nodemailer';
import dotenv from 'dotenv'

dotenv.config()


export async function enviarOtpEmail(destinatario: string, codigoOtp: string) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const html = `
  <div style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
      <div style="background-color: #002776; padding: 20px; color: white; text-align: center;">
        <h2 style="margin: 0;">Banco Malvader</h2>
        <p style="margin: 0;">Segurança em primeiro lugar</p>
      </div>
      <div style="padding: 30px; text-align: center;">
        <h3 style="color: #002776;">Seu código de verificação (OTP)</h3>
        <p style="font-size: 16px;">Use o código abaixo para confirmar sua identidade:</p>
        <p style="font-size: 32px; font-weight: bold; color: #002776; margin: 20px 0;">${codigoOtp}</p>
        <p style="font-size: 14px; color: #555;">Este código expira em 5 minutos. Não compartilhe com ninguém.</p>
      </div>
      <div style="background-color: #e6e6e6; padding: 15px; text-align: center; font-size: 12px; color: #888;">
        © 2025 Banco Malvader. Todos os direitos reservados.
      </div>
    </div>
  </div>`;

  await transporter.sendMail({
    from: `"Banco Malvader" <${process.env.EMAIL_USER}>`,
    to: destinatario,
    subject: 'Seu código de verificação (OTP)',
    text: `Seu código de verificação é: ${codigoOtp}\nEste código expira em 5 minutos. Não compartilhe com ninguém.`,
    html,
  });

  console.log(`✅ Código OTP enviado com sucesso para ${destinatario}`);
}
