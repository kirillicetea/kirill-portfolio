import { NextResponse } from "next/server";

export async function POST(request) {
  console.log("=== API CONTACT CALLED ===");
  
  try {
    const body = await request.json();
    console.log("Body received:", body);
    
    const { name, contact, service, message } = body;

    if (!name || !contact || !message) {
      console.log("Validation failed: missing fields");
      return NextResponse.json(
        { error: "Заполните все обязательные поля" },
        { status: 400 }
      );
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    console.log("Token exists:", !!token);
    console.log("Token length:", token?.length);
    console.log("ChatId:", chatId);

    if (!token || !chatId) {
      console.log("Server not configured");
      return NextResponse.json(
        { error: "Сервер не настроен" },
        { status: 500 }
      );
    }

    const text = `
🔔 <b>Новая заявка с сайта!</b>

👤 <b>Имя:</b> ${name}
📞 <b>Контакт:</b> ${contact}
🎯 <b>Услуга:</b> ${service || "не указана"}

💬 <b>Сообщение:</b>
${message}
    `.trim();

    const url = `https://tg.i-c-a.su/bot${token}/sendMessage`;
    console.log("Sending to Telegram...");

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
      }),
    });

    const responseData = await response.json();
    console.log("Telegram response:", responseData);

    if (!response.ok) {
      console.log("Telegram returned error:", responseData);
      throw new Error("Telegram API error");
    }

    console.log("=== SUCCESS ===");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("=== CONTACT FORM ERROR ===");
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    return NextResponse.json(
      { error: "Ошибка отправки" },
      { status: 500 }
    );
  }
}
