import { NextRequest, NextResponse } from "next/server";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID!; // Например: "-4873016422" (строкой)

export async function POST(request: NextRequest) {
  try {
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
