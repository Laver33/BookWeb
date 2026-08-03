import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const SendActivateMail = async (to, link) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: `Активация аккаунта на ${process.env.API_URL}`,
      text: `Перейдите по ссылке для активации: ${link}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <h1 style="color: #b45309; text-align: center;">Книжный Червь</h1>
          <h2 style="color: #333; text-align: center;">Активация аккаунта</h2>
          <p style="color: #555; font-size: 16px; line-height: 1.5;">
            Для активации вашего аккаунта, пожалуйста, перейдите по ссылке ниже:
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${link}" style="background-color: #b45309; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
              Активировать аккаунт
            </a>
          </div>
          <p style="color: #777; font-size: 14px; text-align: center;">
            Если вы не регистрировались на нашем сайте, проигнорируйте это письмо.
          </p>
          <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;" />
          <p style="color: #999; font-size: 12px; text-align: center;">
            Ссылка действительна в течение 24 часов.
          </p>
        </div>
      `,
    });

    console.log(`Письмо отправлено: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error("Ошибка отправки письма:", error);
    throw error;
  }
};
