# 🚀 Кирилл Мирончук — Портфолио

<div align="center">

**Менеджер проектов в сфере ИИ**

[![Site](https://img.shields.io/badge/Сайт-kirillmironchuk.ru-3b82f6?style=for-the-badge&logo=googlechrome&logoColor=white)](https://kirillmironchuk.ru)
[![Telegram](https://img.shields.io/badge/Telegram-@kirill__icetea-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/kirill_icetea)
[![GitHub](https://img.shields.io/badge/GitHub-kirillicetea-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/kirillicetea)

</div>

---

## 👋 О проекте

Это мой **личный сайт-портфолио** и **платформа IT Transition Stories** — реальный продукт, который я сделал с нуля.

**Что здесь есть:**
- 💼 **Портфолио** — опыт, навыки, проекты
- 🗺 **IT Transition Stories** — платформа историй перехода в IT с визуальной картой
- 🎨 **Neo-Tokyo дизайн** — фиолетовый неон, свои layout'ы
- 🔒 **Админ-панель** — модерация историй

**Цель:** показать работодателю мой путь — **от менеджера к проектному управлению в IT**.

---

## 🗺 IT Transition Stories — главный проект

**Что это:** платформа реальных историй перехода в IT. Люди делятся опытом, читают чужие пути и **видят карту переходов** — от учителя к Python-разработчику, от бухгалтера к аналитику.

**Главная фича — визуальная карта переходов** на React Flow: узлы — профессии, стрелки — реальные пути людей.

**🔗 Живой проект:** [kirillmironchuk.ru/projects/it-stories/app](https://kirillmironchuk.ru/projects/it-stories/app)

**Кейс-стади:** [kirillmironchuk.ru/projects/it-stories](https://kirillmironchuk.ru/projects/it-stories)

**Метрики:**
- 6 историй
- 22 тега
- 6 авторов
- 6 переходов на карте

---

## 🎯 Ключевые фичи

| Фича | Где | Что это |
|---|---|---|
| **Интерактивный Kanban** | Портфолио | Демонстрация PM-навыков через drag-n-drop |
| **Карта переходов** | IT Stories | Визуальный граф на React Flow |
| **Форма подачи историй** | IT Stories | UGC — пользователи отправляют истории |
| **Админ-панель** | `/admin` | Модерация: одобрить / отклонить |
| **Neo-Tokyo дизайн** | IT Stories | Фиолетовый неон, свои компоненты |
| **Telegram-форма** | Портфолио | Заявки приходят напрямую в Telegram |

---

## 🛠 Технологический стек

### Frontend
- **Next.js 16** (App Router, Turbopack)
- **React 19**
- **Tailwind CSS 4**
- **Framer Motion** — анимации
- **React Flow** — карта переходов

### Backend
- **Supabase** — база данных + RLS
- **PostgreSQL**
- **Next.js API Routes**

### Инфраструктура
- **Timeweb Cloud** — российский хостинг
- **Домен:** `kirillmironchuk.ru`

### Библиотеки
- **react-icons** — иконки
- **@dnd-kit** — drag-n-drop для Kanban
- **Lenis** — плавный скролл

---

## 📁 Структура проекта

```
kirill-portfolio/
├── src/
│   ├── app/
│   │   ├── page.js                  # Главная (портфолио)
│   │   ├── layout.js                # Общий layout
│   │   ├── AppShell.js              # Разделение портфолио/приложения
│   │   ├── admin/
│   │   │   └── page.js              # Админ-панель
│   │   ├── projects/
│   │   │   ├── page.js              # Список проектов
│   │   │   └── it-stories/
│   │   │       ├── page.js          # Кейс-стади
│   │   │       └── app/
│   │   │           ├── layout.js
│   │   │           ├── page.js      # Карта переходов
│   │   │           ├── TransitionMap.js
│   │   │           ├── RightPanel.js
│   │   │           ├── feed/
│   │   │           ├── tags/
│   │   │           ├── authors/
│   │   │           ├── share/
│   │   │           └── [slug]/
│   │   └── lib/
│   │       └── supabase.js
└── public/
    ├── photo.jpg
    ├── it-icon/                     # Favicon приложения
    └── ...
```

---

## 🚀 Локальный запуск

```bash
# 1. Клонировать репозиторий
git clone https://github.com/kirillicetea/kirill-portfolio.git
cd kirill-portfolio

# 2. Установить зависимости
npm install

# 3. Создать .env.local (см. .env.example)
cp .env.example .env.local

# 4. Запустить dev-сервер
npm run dev
```

Открыть [http://localhost:3000](http://localhost:3000)

---

## 📊 Метрики проекта

- **11 секций** портфолио
- **5 проектов** — федеральные мероприятия ЖКХ
- **6 историй** на платформе IT Stories
- **2 layout'а** — портфолио и приложение

---

## 👨‍💻 Автор

**Кирилл Мирончук**

- 🌐 [kirillmironchuk.ru](https://kirillmironchuk.ru)
- ✈️ [@kirill_icetea](https://t.me/kirill_icetea)
- 💻 [github.com/kirillicetea](https://github.com/kirillicetea)
- 📧 [kirilltesis@yandex.ru](mailto:kirilltesis@yandex.ru)

---

## 📄 Лицензия

© 2026 Кирилл Мирончук. Все права защищены.

Проект создан как **личное портфолио**. Исходный код открыт для **ознакомления**, но **не для коммерческого использования** без разрешения автора.

---

<div align="center">

**Сделано с ❤️ на Next.js**

</div>