import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, contact, service, message } = body;

    if (!name || !contact || !message) {
      return NextResponse.json(
        { error: "Заполните все обязательные поля" },
        { status: 400 }
      );
    }

    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASSWORD;

    if (!emailUser || !emailPass) {
      return NextResponse.json(
        { error: "Сервер не настроен" },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
  host: "smtp.yandex.ru",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: emailUser,
    pass: emailPass,
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

    const htmlContent = `
      <h2>🔔 Новая заявка с сайта</h2>
      <p><strong>👤 Имя:</strong> ${name}</p>
      <p><strong>📞 Контакт:</strong> ${contact}</p>
      <p><strong>🎯 Услуга:</strong> ${service || "не указана"}</p>
      <p><strong>💬 Сообщение:</strong></p>
      <p>${message}</p>
    `;

    await transporter.sendMail({
      from: `"Сайт kirillmironchuk.ru" <${emailUser}>`,
      to: emailUser,
      subject: `Новая заявка от ${name}`,
      html: htmlContent,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Ошибка отправки" },
      { status: 500 }
    );
  }
}
