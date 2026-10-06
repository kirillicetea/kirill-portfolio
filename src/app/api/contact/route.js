import { NextResponse } from "next/server";

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

    const vkToken = process.env.VK_TOKEN;
    const vkPeerId = process.env.VK_PEER_ID;

    if (!vkToken || !vkPeerId) {
      return NextResponse.json(
        { error: "Сервер не настроен" },
        { status: 500 }
      );
    }

    const text = `🔔 Новая заявка с сайта\n\n👤 Имя: ${name}\n📞 Контакт: ${contact}\n🎯 Услуга: ${service || "не указана"}\n\n💬 Сообщение:\n${message}`;

    const params = new URLSearchParams({
      peer_id: vkPeerId,
      message: text,
      random_id: Date.now().toString(),
      access_token: vkToken,
      v: "5.199",
    });

    const url = `https://api.vk.com/method/messages.send?${params.toString()}`;

    console.log("Sending to VK...");

    const response = await fetch(url, { method: "POST" });
    const data = await response.json();

    console.log("VK response:", data);

    if (data.error) {
      throw new Error(data.error.error_msg || "VK API error");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Ошибка отправки" },
      { status: 500 }
    );
  }
}
