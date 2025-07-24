# TrustHub — Техническое задание

---

## О проекте

**TrustHub** — современный веб-каталог проверенных ресурсов для обучения, скачивания программ и саморазвития.  
Проект ориентирован на удобство, безопасность и поддержку интерактивного AI-чата.

> 🎨 **Дизайн интерфейса создан с использованием [v0.dev](https://v0.dev) — сервиса для быстрой генерации UI.**

---

## Технологии

- Next.js 13+ (App Router, React 18, TypeScript)  
- Redux Toolkit + React Redux  
- Firebase (Firestore, Functions)  
- axios  
- next/font (шрифты)  
- CSS (или выбранный препроцессор/фреймворк)  
- ESLint, Prettier

---

## Структура проекта

src/
├── app/
│ ├── layout.tsx # Главный layout с провайдерами и metadata
│ ├── page.tsx # Главная страница
│ ├── category/
│ │ └── page.tsx # Каталог ресурсов с фильтрацией
│ ├── resource/
│ │ └── [id]/
│ │ └── page.tsx # Детальная страница ресурса
│ ├── contact/
│ │ └── page.tsx # Форма обратной связи (Telegram)
│ ├── about/
│ │ └── page.tsx # О проекте
│ ├── chat/
│ │ └── page.tsx # Чат с AI
│
├── components/
│ ├── home/
│ ├── category/
│ ├── resource/
│ ├── contact/
│ ├── chat/
│ └── providers/ # Клиентские провайдеры (ReduxProvider и др.)
│
├── entities/
│ ├── api/ # API-запросы (axios, firebase)
│ └── slices/ # Redux Toolkit слайсы
│
├── config/
│ ├── axios/
│ │ └── axiosRequest.ts # Конфигурация axios с настройками из env
│ └── utils/
│ └── apiConfig.ts # Загрузка переменных окружения
│
├── firebase/
│ ├── firebase.ts # Инициализация Firebase
│ ├── resources.ts # Firestore-запросы
│ └── contactForm.ts # Отправка сообщений в Telegram через Firebase Functions
│
├── store/
│ └── store.ts # Конфигурация Redux Toolkit store
│
├── styles/
│ └── globals.css # Глобальные стили
│
├── .env.development # Переменные окружения для разработки
├── .env.production # Переменные окружения для продакшена
├── next.config.js # Конфигурация Next.js



---

## Страницы приложения

| URL              | Описание                                       |
|------------------|------------------------------------------------|
| `/`              | Главная страница с категориями                  |
| `/category`      | Каталог с фильтрацией ресурсов по категориям   |
| `/resource/[id]` | Детальная страница ресурса                       |
| `/contact`       | Форма обратной связи (отправка сообщений в Telegram) |
| `/about`         | Информация о проекте TrustHub                    |
| `/chat`          | Чат с AI                                        |

---

## Функционал

- Фильтрация и поиск ресурсов на странице `/category`  
- Отправка сообщений с контактной формы в Telegram через Firebase Functions  
- Интерактивный чат с AI  
- Управление состоянием через Redux Toolkit  
- Хранение данных ресурсов в Firebase Firestore  
- Поддержка dev/prod окружений через `.env` файлы  
- Централизованный axios клиент для API-запросов  

---



