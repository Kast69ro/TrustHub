import { NextRequest, NextResponse } from "next/server";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID!;

const lastSendMap = new Map<string, number>();
const TIMEOUT_MS = 60 * 5000; 

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      "unknown";

    const now = Date.now();
    const lastSent = lastSendMap.get(ip) || 0;

    if (now - lastSent < TIMEOUT_MS) {
      return NextResponse.json(
        { error: "Пожалуйста, подождите перед повторной отправкой." },
        { status: 429 }
      );
    }

    lastSendMap.set(ip, now);

    const data = await request.json();

    const message = `
Новое сообщение с сайта:
Имя: ${data.name}
Email: ${data.email}
Тема: ${data.subject}
Сообщение:
${data.message}
    `;

    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: "HTML",
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Ошибка при отправке сообщения в Telegram");
    }

    return NextResponse.json({ message: "Сообщение отправлено" });
  } catch (error) {
    console.error("Ошибка API:", error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
